<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->string('bg_color')->default('#1a1611');
            $table->string('text_color')->default('#ffffff');
            $table->string('card_color')->default('#ffffff0f');
            $table->string('nav_color')->default('#1a1611');
        });
    }

    public function down(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->dropColumn(['bg_color', 'text_color', 'card_color', 'nav_color']);
        });
    }
};
