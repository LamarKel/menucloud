<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $restaurant = $request->user()->restaurant;

        $products = $restaurant->products()
            ->with('category')
            ->get();

        $categories = $restaurant->categories()
            ->where('is_active', true)
            ->get();

        return Inertia::render('Panel/Products', [
            'products' => $products,
            'categories' => $categories,
            'max_products' => $restaurant->plan->max_products ?? 30,
        ]);
    }

    public function store(Request $request)
    {
        $restaurant = $request->user()->restaurant;

        // Verificar límite del plan
        $currentCount = $restaurant->products()->count();
        $maxProducts = $restaurant->plan->max_products ?? 30;

        if ($currentCount >= $maxProducts) {
            return redirect()->back()->withErrors([
                'limit' => "Has alcanzado el límite de {$maxProducts} productos de tu plan."
            ]);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'allergens' => 'nullable|string|max:255',
            'calories' => 'nullable|integer|min:0',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $result = \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::upload(
                $request->file('image')->getRealPath(),
                ['folder' => 'menucloud/products']
            );
            $validated['image'] = $result->getSecurePath();
        }

        $validated['restaurant_id'] = $restaurant->id;

        Product::create($validated);

        return redirect()->back()->with('success', 'Producto creado exitosamente.');
    }

    public function update(Request $request, Product $product)
    {
        $this->authorize('update', $product);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|image|max:2048',
            'allergens' => 'nullable|string|max:255',
            'calories' => 'nullable|integer|min:0',
            'is_available' => 'boolean',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $result = \CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary::upload(
                $request->file('image')->getRealPath(),
                ['folder' => 'menucloud/products']
            );
            $validated['image'] = $result->getSecurePath();
        }

        $product->update($validated);

        return redirect()->back()->with('success', 'Producto actualizado.');
    }

    public function destroy(Product $product)
    {
        $this->authorize('delete', $product);

        if ($product->image) {
            Storage::disk('public')->delete($product->image);
        }

        $product->delete();

        return redirect()->back()->with('success', 'Producto eliminado.');
    }
}
