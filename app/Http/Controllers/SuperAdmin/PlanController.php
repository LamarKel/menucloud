<?php

namespace App\Http\Controllers\SuperAdmin;

use App\Http\Controllers\Controller;
use App\Models\Plan;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PlanController extends Controller
{
    public function index()
    {
        $plans = Plan::withCount('restaurants')->get();

        return Inertia::render('SuperAdmin/Plans', [
            'plans' => $plans,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_products' => 'required|integer|min:1',
            'max_categories' => 'required|integer|min:1',
            'has_promotions' => 'boolean',
            'has_custom_domain' => 'boolean',
            'has_statistics' => 'boolean',
            'max_admins' => 'required|integer|min:1',
        ]);

        Plan::create($validated);

        return redirect()->back()->with('success', 'Plan creado exitosamente.');
    }

    public function update(Request $request, Plan $plan)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'max_products' => 'required|integer|min:1',
            'max_categories' => 'required|integer|min:1',
            'has_promotions' => 'boolean',
            'has_custom_domain' => 'boolean',
            'has_statistics' => 'boolean',
            'max_admins' => 'required|integer|min:1',
            'is_active' => 'boolean',
        ]);

        $plan->update($validated);

        return redirect()->back()->with('success', 'Plan actualizado exitosamente.');
    }
}
