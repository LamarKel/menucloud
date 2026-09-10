<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\JsonResponse;

class MenuApiController extends Controller
{
    /**
     * Devuelve el menú de un restaurante en el formato que consume PideBot.
     *
     * GET /api/menu/{slug}
     *
     * Respuesta:
     * {
     *   "negocio": "Tía Sara",
     *   "moneda":  "RD$",
     *   "categorias": [
     *     {
     *       "id": "picadera",
     *       "nombre": "🍗 Picadera",
     *       "productos": [
     *         { "id": 1, "nombre": "Pica pollo mediano", "precio": 350 }
     *       ]
     *     }
     *   ]
     * }
     */
    public function show(string $slug): JsonResponse
    {
        $restaurant = Restaurant::where('slug', $slug)
            ->where('status', 'active')
            ->with([
                'settings',
                'categories' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
                'categories.products' => fn($q) => $q->where('is_available', true)->orderBy('sort_order'),
            ])
            ->firstOrFail();

        $moneda = $restaurant->settings?->currency ?? 'RD$';

        $categorias = $restaurant->categories->map(fn($cat) => [
            'id'        => (string) $cat->id,
            'nombre'    => $cat->name,
            'productos' => $cat->products->map(fn($p) => [
                'id'     => $p->id,
                'nombre' => $p->name,
                'precio' => (float) $p->price,
            ])->values(),
        ])->values();

        return response()->json([
            'negocio'    => $restaurant->name,
            'slug'       => $restaurant->slug,
            'moneda'     => $moneda,
            'categorias' => $categorias,
        ]);
    }
}
