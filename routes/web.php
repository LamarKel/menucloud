<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SuperAdmin\DashboardController as SuperAdminDashboard;
use App\Http\Controllers\SuperAdmin\RestaurantController as SuperAdminRestaurant;
use App\Http\Controllers\SuperAdmin\PlanController as SuperAdminPlan;
use App\Http\Controllers\Restaurant\DashboardController as RestaurantDashboard;
use App\Http\Controllers\SuperAdmin\PaymentController as SuperAdminPayment;
use App\Http\Controllers\Restaurant\CategoryController;
use App\Http\Controllers\Restaurant\ProductController;
use App\Http\Controllers\Restaurant\PromotionController;
use App\Http\Controllers\Restaurant\SettingController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\RegisterRestaurantController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\Auth\GoogleController;

Route::get('/', function () {
    if (Auth::check()) {
        $user = Auth::user();
        if ($user->role === 'superadmin') {
            return redirect()->route('admin.dashboard');
        }
        return redirect()->route('panel.dashboard');
    }
    return inertia('Landing');
})->name('home');

// Menú público (sin autenticación)
Route::get('/menu/{slug}', [MenuController::class, 'show'])->name('menu.show');
Route::get('/registro', [RegisterRestaurantController::class, 'create'])->name('register.restaurant');
Route::post('/registro', [RegisterRestaurantController::class, 'store'])->name('register.restaurant.store');
Route::get('/registro/exitoso', [RegisterRestaurantController::class, 'success'])->name('register.restaurant.success');

// Rutas autenticadas
Route::middleware(['auth', 'verified'])->group(function () {

    // Super Admin
    Route::middleware('role:superadmin')->prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [SuperAdminDashboard::class, 'index'])->name('dashboard');
        Route::get('/restaurants', [SuperAdminRestaurant::class, 'index'])->name('restaurants.index');
        Route::post('/restaurants', [SuperAdminRestaurant::class, 'store'])->name('restaurants.store');
        Route::patch('/restaurants/{restaurant}/approve', [SuperAdminRestaurant::class, 'approve'])->name('restaurants.approve');
        Route::patch('/restaurants/{restaurant}/suspend', [SuperAdminRestaurant::class, 'suspend'])->name('restaurants.suspend');
        Route::delete('/restaurants/{restaurant}', [SuperAdminRestaurant::class, 'destroy'])->name('restaurants.destroy');
        Route::get('/plans', [SuperAdminPlan::class, 'index'])->name('plans.index');
        Route::post('/plans', [SuperAdminPlan::class, 'store'])->name('plans.store');
        Route::put('/plans/{plan}', [SuperAdminPlan::class, 'update'])->name('plans.update');
        Route::get('/payments', [SuperAdminPayment::class, 'index'])->name('payments.index');
        Route::post('/payments', [SuperAdminPayment::class, 'store'])->name('payments.store');
        Route::delete('/payments/{payment}', [SuperAdminPayment::class, 'destroy'])->name('payments.destroy');
    });

    // Panel Restaurante
    Route::middleware('role:restaurant')->prefix('panel')->name('panel.')->group(function () {
        Route::get('/dashboard', [RestaurantDashboard::class, 'index'])->name('dashboard');
        Route::apiResource('categories', CategoryController::class);
        Route::apiResource('products', ProductController::class);
        Route::apiResource('promotions', PromotionController::class);
        Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
        Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');
    });
});
Route::get('/auth/google', [GoogleController::class, 'redirect'])->name('auth.google');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('auth.google.callback');
require __DIR__ . '/auth.php';
