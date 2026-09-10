<?php

namespace App\Observers;

use App\Models\Restaurant;
use App\Services\MenuSyncService;

/**
 * Empuja el menú completo a Dicbot cada vez que el dueño crea, actualiza
 * o elimina un producto o categoría (push, no invalidación de caché).
 *
 * Se registra para Product y Category en AppServiceProvider.
 */
class MenuCacheObserver
{
    public function __construct(private MenuSyncService $menuSync) {}

    /**
     * El modelo que llegó puede ser Product o Category.
     * Ambos tienen restaurant_id o lo resuelven a través de la relación.
     */
    // Campos de Product que el bot consume — cualquier otro cambio (foto, etc.) se ignora
    private const CAMPOS_BOT = ['nombre', 'name', 'precio', 'price', 'disponible', 'is_available'];

    public function saved($model): void
    {
        // Para Category: siempre empujar (nombre de categoría sí importa)
        // Para Product: solo si cambió nombre, precio o disponibilidad
        if ($this->esProducto($model) && !$this->cambiaronCamposBot($model)) {
            return;
        }
        $this->empujar($model);
    }

    public function deleted($model): void
    {
        $this->empujar($model);
    }

    private function esProducto($model): bool
    {
        return str_contains(get_class($model), 'Product');
    }

    private function cambiaronCamposBot($model): bool
    {
        $dirty = array_keys($model->getDirty());
        return !empty(array_intersect($dirty, self::CAMPOS_BOT));
    }

    private function empujar($model): void
    {
        $restaurant = $this->resolverRestaurant($model);
        if ($restaurant) {
            $this->menuSync->push($restaurant);
        }
    }

    private function resolverRestaurant($model): ?Restaurant
    {
        // Product → restaurant (relación directa)
        if (method_exists($model, 'restaurant')) {
            return $model->restaurant;
        }
        // Category → restaurant_id directo
        if (isset($model->restaurant_id)) {
            return Restaurant::find($model->restaurant_id);
        }
        return null;
    }
}
