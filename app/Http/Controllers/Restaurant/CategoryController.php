<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $categories = $request->user()->restaurant
            ->categories()
            ->withCount('products')
            ->get();

        return Inertia::render('Panel/Categories', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:10',
            'sort_order' => 'integer|min:0',
        ]);

        $validated['restaurant_id'] = $request->user()->restaurant_id;

        Category::create($validated);

        return redirect()->back()->with('success', 'Categoría creada exitosamente.');
    }

    public function update(Request $request, Category $category)
    {
        $this->authorize('update', $category);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:10',
            'sort_order' => 'integer|min:0',
            'is_active' => 'boolean',
        ]);

        $category->update($validated);

        return redirect()->back()->with('success', 'Categoría actualizada.');
    }

    public function destroy(Category $category)
    {
        $this->authorize('delete', $category);

        $category->delete();

        return redirect()->back()->with('success', 'Categoría eliminada.');
    }
}
