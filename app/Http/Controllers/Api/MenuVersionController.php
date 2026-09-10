<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use App\Services\MenuSyncService;
use Illuminate\Http\JsonResponse;

/**
 * Endpoints de reconciliación para Dicbot (protegidos por VerifyDicbotToken).
 * GET /api/v1/restaurants/{tenant}/menu/version → solo el número de versión
 * GET /api/v1/restaurants/{tenant}/menu         → menú completo (solo si la versión difiere)
 */
class MenuVersionController extends Controller
{
    public function __construct(private MenuSyncService $menuSync) {}

    public function version(string $tenant): JsonResponse
    {
        $restaurant = Restaurant::where('slug', $tenant)->firstOrFail();

        return response()->json([
            'version'    => $restaurant->menu_version,
            'actualizado' => $restaurant->menu_version_updated_at?->toIso8601String(),
        ]);
    }

    public function full(string $tenant): JsonResponse
    {
        $restaurant = Restaurant::where('slug', $tenant)->firstOrFail();

        return response()->json($this->menuSync->buildPayload($restaurant));
    }
}
