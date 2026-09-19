<?php

use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\Subscription;
use App\Models\User;

test('recording a yearly payment extends the next billing date by a year', function () {
    $admin = User::factory()->create(['role' => 'superadmin']);
    $restaurant = Restaurant::factory()->create(['status' => 'active']);
    $plan = Plan::factory()->create();
    $subscription = Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'active',
        'started_at' => now(),
        'next_billing_date' => now()->addDays(5),
    ]);

    $this->actingAs($admin)->post('/admin/payments', [
        'restaurant_id' => $restaurant->id,
        'amount' => $plan->price,
        'method' => 'transfer',
        'billing_cycle' => 'yearly',
        'paid_at' => now()->toDateString(),
    ])->assertRedirect();

    $subscription->refresh();

    expect($subscription->billing_cycle)->toBe('yearly');
    expect($subscription->next_billing_date->toDateString())
        ->toBe(now()->addDays(5)->addYear()->toDateString());
});

test('recording a payment reactivates a suspended restaurant', function () {
    $admin = User::factory()->create(['role' => 'superadmin']);
    $restaurant = Restaurant::factory()->create(['status' => 'suspended']);
    $plan = Plan::factory()->create();
    $subscription = Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'overdue',
        'started_at' => now()->subMonth(),
        'next_billing_date' => now()->subDay(),
        'reminder_sent_at' => now()->subDay(),
    ]);

    $this->actingAs($admin)->post('/admin/payments', [
        'restaurant_id' => $restaurant->id,
        'amount' => $plan->price,
        'method' => 'cash',
        'billing_cycle' => 'monthly',
        'paid_at' => now()->toDateString(),
    ])->assertRedirect();

    expect($restaurant->fresh()->status)->toBe('active');
    expect($subscription->fresh()->status)->toBe('active');
    expect($subscription->fresh()->reminder_sent_at)->toBeNull();
});
