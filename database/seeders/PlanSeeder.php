<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plan;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Basic',
            'price' => 50.00,
            'max_products' => 30,
            'max_categories' => 5,
            'has_promotions' => false,
            'has_custom_domain' => false,
            'has_statistics' => false,
            'max_admins' => 1,
            'is_active' => true,
        ]);

        Plan::create([
            'name' => 'Pro',
            'price' => 100.00,
            'max_products' => 100,
            'max_categories' => 15,
            'has_promotions' => true,
            'has_custom_domain' => false,
            'has_statistics' => true,
            'max_admins' => 3,
            'is_active' => true,
        ]);

        Plan::create([
            'name' => 'Premium',
            'price' => 200.00,
            'max_products' => 999,
            'max_categories' => 999,
            'has_promotions' => true,
            'has_custom_domain' => true,
            'has_statistics' => true,
            'max_admins' => 999,
            'is_active' => true,
        ]);
    }
}
