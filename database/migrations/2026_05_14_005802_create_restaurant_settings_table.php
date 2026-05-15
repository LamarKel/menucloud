<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('restaurant_settings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('restaurant_id')->constrained('restaurants')->cascadeOnDelete();
            $table->string('primary_color')->default('#C9A84C');
            $table->string('font_choice')->default('inter');
            $table->boolean('show_calories')->default(true);
            $table->boolean('show_allergens')->default(true);
            $table->boolean('show_promotions')->default(true);
            $table->string('social_instagram')->nullable();
            $table->string('social_facebook')->nullable();
            $table->string('social_whatsapp')->nullable();
            $table->string('custom_domain')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('restaurant_settings');
    }
};
