<?php

namespace App\Http\Controllers\Restaurant;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Semáforo de sincronización: el navegador nunca ve el token de Dicbot,
 * este controlador hace de proxy server-side hacia GET /api/menu-version/:tenant.
 */
class MenuSyncStatusController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $restaurant = $request->user()->restaurant;
        $pidebotUrl = config('services.pidebot.url');
        $token = config('services.pidebot.dicbot_token');

        $base = [
            'localVersion' => $restaurant->menu_version,
            'localUpdatedAt' => $restaurant->menu_version_updated_at?->toIso8601String(),
        ];

        if (!$pidebotUrl || !$token) {
            return response()->json([...$base, 'synced' => null, 'remoteVersion' => null]);
        }

        try {
            $response = Http::withToken($token)
                ->timeout(4)
                ->get("{$pidebotUrl}/api/menu-version/{$restaurant->slug}");

            if (!$response->successful()) {
                return response()->json([...$base, 'synced' => null, 'remoteVersion' => null]);
            }

            $remoteVersion = $response->json('version');
            return response()->json([
                ...$base,
                'remoteVersion' => $remoteVersion,
                'synced' => $remoteVersion === $restaurant->menu_version,
                'remoteUpdatedAt' => $response->json('actualizado'),
            ]);
        } catch (\Throwable $e) {
            Log::warning("MenuSyncStatus: no se pudo consultar Dicbot para {$restaurant->slug}: {$e->getMessage()}");
            return response()->json([...$base, 'synced' => null, 'remoteVersion' => null]);
        }
    }
}
