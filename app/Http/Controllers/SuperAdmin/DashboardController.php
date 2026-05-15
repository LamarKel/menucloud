<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Models\Plan;
use App\Models\Payment;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_restaurants' => Restaurant::count(),
            'active_restaurants' => Restaurant::where('status', 'active')->count(),
            'pending_restaurants' => Restaurant::where('status', 'pending')->count(),
            'suspended_restaurants' => Restaurant::where('status', 'suspended')->count(),
            'total_revenue' => Payment::sum('amount'),
            'monthly_revenue' => Payment::whereMonth('paid_at', now()->month)
                ->whereYear('paid_at', now()->year)
                ->sum('amount'),
        ];

        $recent_restaurants = Restaurant::with('plan')
            ->latest()
            ->take(5)
            ->get();

        $pending_restaurants = Restaurant::with('plan')
            ->where('status', 'pending')
            ->latest()
            ->get();

        return Inertia::render('SuperAdmin/Dashboard', [
            'stats' => $stats,
            'recent_restaurants' => $recent_restaurants,
            'pending_restaurants' => $pending_restaurants,
        ]);
    }
}
