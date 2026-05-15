<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $restaurant = $request->user()->restaurant->load([
            'plan',
            'settings',
            'activeSubscription',
        ]);

        $stats = [
            'total_products' => $restaurant->products()->count(),
            'available_products' => $restaurant->products()->where('is_available', true)->count(),
            'total_categories' => $restaurant->categories()->count(),
            'total_promotions' => $restaurant->promotions()->where('is_active', true)->count(),
            'max_products' => $restaurant->plan->max_products ?? 30,
        ];

        return Inertia::render('Panel/Dashboard', [
            'restaurant' => $restaurant,
            'stats' => $stats,
        ]);
    }
}
