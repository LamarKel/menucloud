<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Mail\RestaurantApproved;
use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RestaurantController extends Controller
{
    public function index()
    {
        $restaurants = Restaurant::with(['plan', 'subscriptions.payments'])
            ->latest()
            ->get()
            ->map(function ($restaurant) {
                return [
                    'id' => $restaurant->id,
                    'name' => $restaurant->name,
                    'slug' => $restaurant->slug,
                    'owner_name' => $restaurant->owner_name,
                    'email' => $restaurant->email,
                    'phone' => $restaurant->phone,
                    'address' => $restaurant->address,
                    'city' => $restaurant->city,
                    'cuisine_type' => $restaurant->cuisine_type,
                    'logo' => $restaurant->logo,
                    'status' => $restaurant->status,
                    'plan' => $restaurant->plan,
                    'total_revenue' => $restaurant->subscriptions
                        ->flatMap->payments
                        ->sum('amount'),
                    'created_at' => $restaurant->created_at->format('d/m/Y'),
                ];
            });

        $plans = Plan::where('is_active', true)->get();

        return Inertia::render('SuperAdmin/Restaurants', [
            'restaurants' => $restaurants,
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|unique:restaurants,email|unique:users,email',
            'phone' => 'nullable|string|max:20',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'cuisine_type' => 'nullable|string|max:100',
            'plan_id' => 'required|exists:plans,id',
        ]);

        $baseSlug = Str::slug($validated['name']);
        $slug = $baseSlug;
        $count = 1;
        while (Restaurant::where('slug', $slug)->exists()) {
            $slug = $baseSlug.'-'.$count;
            $count++;
        }
        $validated['slug'] = $slug;
        $validated['status'] = 'active';
        $validated['approved_at'] = now();

        $restaurant = Restaurant::create($validated);

        // Crear suscripción
        Subscription::create([
            'restaurant_id' => $restaurant->id,
            'plan_id' => $validated['plan_id'],
            'status' => 'active',
            'started_at' => now(),
            'next_billing_date' => now()->addMonth(),
        ]);

        // Crear configuración por defecto
        $restaurant->settings()->create([]);

        // Crear el usuario dueño. El admin no define su contraseña aquí:
        // se le envía un link para que la establezca él mismo.
        $user = User::create([
            'name' => $validated['owner_name'],
            'email' => $validated['email'],
            'password' => Hash::make(Str::random(32)),
            'role' => 'restaurant',
            'restaurant_id' => $restaurant->id,
            'email_verified_at' => now(),
        ]);

        Password::sendResetLink(['email' => $user->email]);

        return redirect()->back()->with('success', 'Restaurante creado exitosamente. Se envió un correo al dueño para que configure su contraseña.');
    }

    public function approve(Restaurant $restaurant)
    {
        $restaurant->update([
            'status' => 'active',
            'approved_at' => now(),
        ]);

        // Enviar correo de aprobación
        Mail::to($restaurant->email)->send(new RestaurantApproved($restaurant));

        return redirect()->back()->with('success', 'Restaurante aprobado y notificado por email.');
    }

    public function suspend(Restaurant $restaurant)
    {
        $restaurant->update(['status' => 'suspended']);

        return redirect()->back()->with('success', 'Restaurante suspendido.');
    }

    public function destroy(Restaurant $restaurant)
    {
        $restaurant->delete();

        return redirect()->back()->with('success', 'Restaurante eliminado.');
    }
}
