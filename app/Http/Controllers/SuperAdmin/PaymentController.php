<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    public function index()
    {
        $payments = Payment::with([
            'subscription.restaurant',
            'subscription.plan',
            'confirmedBy',
        ])->latest()->paginate(20);

        $restaurants = Restaurant::where('status', 'active')
            ->with(['activeSubscription.plan'])
            ->get();

        $totalRevenue = Payment::sum('amount');
        $monthRevenue = Payment::whereMonth('paid_at', now()->month)
            ->whereYear('paid_at', now()->year)
            ->sum('amount');

        return Inertia::render('SuperAdmin/Payments', [
            'payments' => $payments,
            'restaurants' => $restaurants,
            'totalRevenue' => $totalRevenue,
            'monthRevenue' => $monthRevenue,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'restaurant_id' => 'required|exists:restaurants,id',
            'amount' => 'required|numeric|min:0',
            'method' => 'required|in:transfer,cash',
            'reference' => 'nullable|string|max:255',
            'paid_at' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $restaurant = Restaurant::findOrFail($validated['restaurant_id']);
        $subscription = $restaurant->activeSubscription;

        if (!$subscription) {
            return redirect()->back()->withErrors(['error' => 'Este restaurante no tiene suscripción activa.']);
        }

        Payment::create([
            'subscription_id' => $subscription->id,
            'amount' => $validated['amount'],
            'method' => $validated['method'],
            'reference' => $validated['reference'] ?? null,
            'paid_at' => $validated['paid_at'],
            'confirmed_by' => Auth::id(),
            'notes' => $validated['notes'] ?? null,
        ]);

        // Actualizar próxima fecha de cobro
        $subscription->update([
            'next_billing_date' => now()->addMonth(),
            'status' => 'active',
        ]);

        return redirect()->back()->with('success', 'Pago registrado exitosamente.');
    }

    public function destroy(Payment $payment)
    {
        $payment->delete();
        return redirect()->back()->with('success', 'Pago eliminado.');
    }
}
