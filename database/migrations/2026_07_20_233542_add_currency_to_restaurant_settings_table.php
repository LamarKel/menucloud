<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->string('currency', 10)->default('RD$')->after('nav_color');
        });
    }

    public function down(): void
    {
        Schema::table('restaurant_settings', function (Blueprint $table) {
            $table->dropColumn('currency');
        });
    }
};
