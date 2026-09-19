<?php

use App\Mail\PaymentReminder;
use App\Mail\SubscriptionSuspended;
use App\Models\Plan;
use App\Models\Restaurant;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

test('sends a reminder for a subscription due in 2 days and marks it sent', function () {
    Mail::fake();

    User::factory()->create(['role' => 'superadmin']);
    $restaurant = Restaurant::factory()->create(['status' => 'active']);
    $plan = Plan::factory()->create();
    $subscription = Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'active',
        'started_at' => now()->subMonth(),
        'next_billing_date' => now()->addDays(2),
    ]);

    $this->artisan('billing:check');

    Mail::assertSent(PaymentReminder::class, 2); // dueño + superadmin
    expect($subscription->fresh()->reminder_sent_at)->not->toBeNull();
    expect($restaurant->fresh()->status)->toBe('active');
});

test('does not resend a reminder already sent for the current cycle', function () {
    Mail::fake();

    $restaurant = Restaurant::factory()->create(['status' => 'active']);
    $plan = Plan::factory()->create();
    Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'active',
        'started_at' => now()->subMonth(),
        'next_billing_date' => now()->addDays(1),
        'reminder_sent_at' => now(),
    ]);

    $this->artisan('billing:check');

    Mail::assertNothingSent();
});

test('suspends the restaurant when the billing date has passed', function () {
    Mail::fake();

    User::factory()->create(['role' => 'superadmin']);
    $restaurant = Restaurant::factory()->create(['status' => 'active']);
    $plan = Plan::factory()->create();
    $subscription = Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'active',
        'started_at' => now()->subMonths(2),
        'next_billing_date' => now()->subDay(),
    ]);

    $this->artisan('billing:check');

    expect($subscription->fresh()->status)->toBe('overdue');
    expect($restaurant->fresh()->status)->toBe('suspended');
    Mail::assertSent(SubscriptionSuspended::class, 2); // dueño + superadmin
});

test('a cancelled subscription is left alone', function () {
    Mail::fake();

    $restaurant = Restaurant::factory()->create(['status' => 'active']);
    $plan = Plan::factory()->create();
    Subscription::create([
        'restaurant_id' => $restaurant->id,
        'plan_id' => $plan->id,
        'status' => 'cancelled',
        'started_at' => now()->subMonths(2),
        'next_billing_date' => now()->subDay(),
    ]);

    $this->artisan('billing:check');

    expect($restaurant->fresh()->status)->toBe('active');
    Mail::assertNothingSent();
});
