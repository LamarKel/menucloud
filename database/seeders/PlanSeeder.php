<?php

namespace Database\Seeders;

use App\Models\Plan;
use Illuminate\Database\Seeder;

class PlanSeeder extends Seeder
{
    public function run(): void
    {
        Plan::create([
            'name' => 'Basic',
            'price' => 800.00,
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
            'price' => 1500.00,
            'max_products' => 100,
            'max_categories' => 15,
            'has_promotions' => true,
            'has_custom_domain' => false,
            'has_statistics' => false,
            'max_admins' => 3,
            'is_active' => true,
        ]);

        Plan::create([
            'name' => 'Premium',
            'price' => 2500.00,
            'max_products' => 999,
            'max_categories' => 999,
            'has_promotions' => true,
            'has_custom_domain' => false,
            'has_statistics' => false,
            'max_admins' => 999,
            'is_active' => true,
        ]);
    }
}
