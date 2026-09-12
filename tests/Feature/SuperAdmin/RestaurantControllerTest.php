<?php

use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Notification;

test('superadmin creating a restaurant also creates its owner user and sends a password setup link', function () {
    Notification::fake();

    $admin = User::factory()->create(['role' => 'superadmin']);
    $plan = Plan::factory()->create();

    $response = $this->actingAs($admin)->post('/admin/restaurants', [
        'name' => 'Nuevo Restaurante',
        'owner_name' => 'Dueño Nuevo',
        'email' => 'dueno-nuevo@example.com',
        'plan_id' => $plan->id,
    ]);

    $response->assertRedirect();

    $restaurant = Restaurant::where('email', 'dueno-nuevo@example.com')->firstOrFail();
    $user = User::where('email', 'dueno-nuevo@example.com')->firstOrFail();

    expect($user->role)->toBe('restaurant');
    expect($user->restaurant_id)->toBe($restaurant->id);
    expect($user->email_verified_at)->not->toBeNull();

    Notification::assertSentTo($user, ResetPassword::class);
});
