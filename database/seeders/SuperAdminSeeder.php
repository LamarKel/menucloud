<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin@menucloud.com',
            'password' => Hash::make('password123'),
            'role' => 'superadmin',
            'restaurant_id' => null,
        ]);
    }
}
