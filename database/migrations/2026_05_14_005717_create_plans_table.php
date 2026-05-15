<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('plans', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Basic, Pro, Premium
            $table->decimal('price', 8, 2);
            $table->integer('max_products')->default(30);
            $table->integer('max_categories')->default(5);
            $table->boolean('has_promotions')->default(false);
            $table->boolean('has_custom_domain')->default(false);
            $table->boolean('has_statistics')->default(false);
            $table->integer('max_admins')->default(1);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('plans');
    }
};
