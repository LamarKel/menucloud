<?php

use App\Models\Restaurant;
use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/panel/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    $restaurant = Restaurant::factory()->create();
    $user = User::factory()->create(['restaurant_id' => $restaurant->id]);

    $this->actingAs($user);

    $this->get('/panel/dashboard')->assertOk();
});

test('unverified users are redirected to the email verification notice', function () {
    $restaurant = Restaurant::factory()->create();
    $user = User::factory()->unverified()->create(['restaurant_id' => $restaurant->id]);

    $this->actingAs($user);

    $this->get('/panel/dashboard')->assertRedirect(route('verification.notice', absolute: false));
});
