<?php

namespace App\Http\Controllers;

use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use App\Mail\RestaurantRegistered;
use Illuminate\Support\Facades\Mail;

class RegisterRestaurantController extends Controller
{
    public function create()
    {
        $plans = Plan::where('is_active', true)->get();

        return Inertia::render('Register/Restaurant', [
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_name' => 'required|string|max:255',
            'cuisine_type' => 'required|string|max:100',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:100',
            'phone' => 'nullable|string|max:20',
            'owner_name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email|unique:restaurants,email',
            'password' => 'required|string|min:8|confirmed',
            'plan_id' => 'required|exists:plans,id',
        ]);

        // Crear restaurante
        $restaurant = Restaurant::create([
            'name' => $validated['restaurant_name'],
            'slug' => Str::slug($validated['restaurant_name']) . '-' . Str::random(4),
            'owner_name' => $validated['owner_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'address' => $validated['address'] ?? null,
            'city' => $validated['city'] ?? null,
            'cuisine_type' => $validated['cuisine_type'],
            'status' => 'pending',
            'plan_id' => $validated['plan_id'],
        ]);

        // Crear suscripción pendiente
        Subscription::create([
            'restaurant_id' => $restaurant->id,
            'plan_id' => $validated['plan_id'],
            'status' => 'active',
            'started_at' => now(),
            'next_billing_date' => now()->addMonth(),
        ]);

        // Crear configuración por defecto
        $restaurant->settings()->create([]);

        // Crear usuario
        User::create([
            'name' => $validated['owner_name'],
            'email' => $validated['email'],
            'password' => bcrypt($validated['password']),
            'role' => 'restaurant',
            'restaurant_id' => $restaurant->id,
        ]);

        // Enviar correo de registro
        Mail::to($restaurant->email)->send(new RestaurantRegistered($restaurant));

        return redirect()->route('register.restaurant.success');
    }

    public function success()
    {
        return Inertia::render('Register/Success');
    }
}
