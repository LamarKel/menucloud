<?php

namespace App\Providers;

use App\Models\Category;
use App\Models\Product;
use App\Observers\MenuCacheObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        if (config('app.env') === 'production') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        // Invalida caché de PideBot cuando el dueño edita su menú
        Product::observe(MenuCacheObserver::class);
        Category::observe(MenuCacheObserver::class);
    }
}
