<?php

use App\Mail\RestaurantRegistered;
use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('registering a restaurant creates a pending restaurant and a verified owner user', function () {
    Mail::fake();

    $plan = Plan::factory()->create();

    $response = $this->post('/registro', [
        'restaurant_name' => 'Mi Restaurante',
        'cuisine_type' => 'Italiana',
        'owner_name' => 'Dueño Test',
        'email' => 'dueno@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'plan_id' => $plan->id,
    ]);

    $response->assertRedirect(route('register.restaurant.success'));

    $restaurant = Restaurant::where('email', 'dueno@example.com')->firstOrFail();
    $user = User::where('email', 'dueno@example.com')->firstOrFail();

    expect($restaurant->status)->toBe('pending');
    expect($user->role)->toBe('restaurant');
    expect($user->restaurant_id)->toBe($restaurant->id);
    expect($user->email_verified_at)->not->toBeNull();

    Mail::assertSent(RestaurantRegistered::class);
});

test('the owner cannot access the panel until the restaurant is approved', function () {
    Mail::fake();

    $plan = Plan::factory()->create();

    $this->post('/registro', [
        'restaurant_name' => 'Mi Restaurante',
        'cuisine_type' => 'Italiana',
        'owner_name' => 'Dueño Test',
        'email' => 'dueno@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
        'plan_id' => $plan->id,
    ]);

    $user = User::where('email', 'dueno@example.com')->firstOrFail();

    $this->actingAs($user)->get('/panel/dashboard')->assertRedirect('/login');
    $this->assertGuest();
});

test('registration is rate limited to prevent spam', function () {
    Mail::fake();

    $plan = Plan::factory()->create();

    $payload = fn (int $i) => [
        'restaurant_name' => "Spam $i",
        'cuisine_type' => 'x',
        'owner_name' => 'Spammer',
        'email' => "spam-$i@example.com",
        'password' => 'password',
        'password_confirmation' => 'password',
        'plan_id' => $plan->id,
    ];

    for ($i = 1; $i <= 6; $i++) {
        $this->post('/registro', $payload($i))->assertRedirect(route('register.restaurant.success'));
    }

    $this->post('/registro', $payload(7))->assertStatus(429);
});
