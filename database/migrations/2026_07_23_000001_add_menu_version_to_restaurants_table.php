<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->unsignedBigInteger('menu_version')->default(0)->after('status');
            $table->timestamp('menu_version_updated_at')->nullable()->after('menu_version');
        });
    }

    public function down(): void
    {
        Schema::table('restaurants', function (Blueprint $table) {
            $table->dropColumn(['menu_version', 'menu_version_updated_at']);
        });
    }
};
