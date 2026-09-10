<?php

use App\Http\Controllers\Api\MenuApiController;
use App\Http\Controllers\Api\MenuVersionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Dicbot integration
|--------------------------------------------------------------------------
| GET /api/menu/{slug}   → menú público (legado, sin token; Dicbot ya no lo usa)
| GET /api/v1/restaurants/{tenant}/menu/version → versión (reconciliación)
| GET /api/v1/restaurants/{tenant}/menu         → menú completo (reconciliación)
*/

Route::get('/menu/{slug}', [MenuApiController::class, 'show']);

Route::middleware('dicbot.token')->prefix('v1/restaurants/{tenant}')->group(function () {
    Route::get('/menu/version', [MenuVersionController::class, 'version']);
    Route::get('/menu', [MenuVersionController::class, 'full']);
});
