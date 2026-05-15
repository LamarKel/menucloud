<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index(Request $request)
    {
        $promotions = $request->user()->restaurant
            ->promotions()
            ->latest()
            ->get();

        return Inertia::render('Panel/Promotions', [
            'promotions' => $promotions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percent,fixed,bogo,combo',
            'discount_value' => 'nullable|numeric|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'boolean',
        ]);

        $validated['restaurant_id'] = $request->user()->restaurant_id;

        Promotion::create($validated);

        return redirect()->back()->with('success', 'Promoción creada exitosamente.');
    }

    public function update(Request $request, Promotion $promotion)
    {
        $this->authorize('update', $promotion);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|in:percent,fixed,bogo,combo',
            'discount_value' => 'nullable|numeric|min:0',
            'valid_from' => 'nullable|date',
            'valid_until' => 'nullable|date|after_or_equal:valid_from',
            'is_active' => 'boolean',
        ]);

        $promotion->update($validated);

        return redirect()->back()->with('success', 'Promoción actualizada.');
    }

    public function destroy(Promotion $promotion)
    {
        $this->authorize('delete', $promotion);

        $promotion->delete();

        return redirect()->back()->with('success', 'Promoción eliminada.');
    }
}
