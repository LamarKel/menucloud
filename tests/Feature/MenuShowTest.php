<?php

use App\Models\Restaurant;

test('the public menu page does not leak the owner\'s private contact info', function () {
    $restaurant = Restaurant::factory()->create([
        'status' => 'active',
        'owner_name' => 'Secret Owner',
        'phone' => '8095551234',
    ]);
    $restaurant->settings()->create([]);

    $response = $this->get("/menu/{$restaurant->slug}");

    $response->assertOk();

    $props = $response->viewData('page')['props']['restaurant'];

    expect($props)->not->toHaveKey('owner_name');
    expect($props)->not->toHaveKey('email');
    expect($props)->not->toHaveKey('phone');
    expect($props)->not->toHaveKey('address');
    expect($props)->not->toHaveKey('plan_id');
    expect($props['name'])->toBe($restaurant->name);
    expect($props['slug'])->toBe($restaurant->slug);
});

test('an inactive restaurant is not publicly visible', function () {
    $restaurant = Restaurant::factory()->create(['status' => 'pending']);

    $this->get("/menu/{$restaurant->slug}")->assertNotFound();
});
