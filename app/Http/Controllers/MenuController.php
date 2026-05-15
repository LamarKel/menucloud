<?php

namespace App\Http\Controllers;

use App\Models\Restaurant;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function show(string $slug)
    {
        $restaurant = Restaurant::where('slug', $slug)
            ->where('status', 'active')
            ->with([
                'settings',
                'categories' => function ($query) {
                    $query->where('is_active', true)
                        ->orderBy('sort_order');
                },
                'categories.products' => function ($query) {
                    $query->where('is_available', true)
                        ->orderBy('sort_order');
                },
                'promotions' => function ($query) {
                    $query->where('is_active', true)
                        ->where(function ($q) {
                            $q->whereNull('valid_until')
                                ->orWhere('valid_until', '>=', now());
                        });
                },
            ])
            ->firstOrFail();

        return Inertia::render('Menu/Show', [
            'restaurant' => $restaurant,
        ]);
    }
}
