<?php

namespace App\Services;

use App\Models\Restaurant;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

/**
 * Empuja el menú completo de un restaurante a Dicbot cada vez que el dueño
 * guarda un cambio (Product/Category). MenuCloud es la fuente de verdad;
 * si el push falla, Dicbot lo recupera solo vía reconciliación — nunca
 * bloqueamos el guardado del dueño por esto.
 */
class MenuSyncService
{
    /**
     * Menú completo, incluye agotados (disponible:false) — este es el body
     * que se firma y empuja, y también el que se sirve para reconciliación.
     */
    public function buildPayload(Restaurant $restaurant): array
    {
        $restaurant->loadMissing([
            'settings',
            'categories' => fn($q) => $q->where('is_active', true)->orderBy('sort_order'),
            'categories.products' => fn($q) => $q->orderBy('sort_order'),
        ]);

        $categorias = $restaurant->categories->map(fn($cat) => [
            'id'        => (string) $cat->id,
            'nombre'    => $cat->name,
            'productos' => $cat->products->map(fn($p) => [
                'id'         => $p->id,
                'nombre'     => $p->name,
                'precio'     => (float) $p->price,
                'disponible' => (bool) $p->is_available,
            ])->values(),
        ])->values();

        return [
            'negocio'    => $restaurant->name,
            'slug'       => $restaurant->slug,
            'moneda'     => $restaurant->settings?->currency ?? 'RD$',
            'categorias' => $categorias,
        ];
    }

    public function push(Restaurant $restaurant): void
    {
        $pidebotUrl = config('services.pidebot.url');
        $secret = config('services.pidebot.secret');
        if (!$pidebotUrl || !$secret) {
            Log::warning("MenuSync: falta PIDEBOT_URL o MENUCLOUD_SECRET, no se empuja el menú de {$restaurant->slug}");
            return;
        }

        $version = $restaurant->bumpMenuVersion();
        $payload = $this->buildPayload($restaurant);
        $body = json_encode($payload);
        $firma = hash_hmac('sha256', $body, $secret);

        try {
            $response = Http::withBody($body, 'application/json')
                ->withHeaders(['X-MenuCloud-Signature' => "sha256={$firma}"])
                ->timeout(5)
                ->post("{$pidebotUrl}/menucloud/menu/{$restaurant->slug}");

            if ($response->successful()) {
                Log::info("🍴 Menú empujado a Dicbot → {$restaurant->slug} (v{$version})");
            } else {
                Log::warning("MenuSync: Dicbot respondió {$response->status()} para {$restaurant->slug}");
            }
        } catch (\Throwable $e) {
            // No bloquear el guardado del dueño; la reconciliación de Dicbot lo recupera después.
            Log::warning("MenuSync: no se pudo empujar el menú de {$restaurant->slug}: {$e->getMessage()}");
        }
    }
}
