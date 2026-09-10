<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RestaurantSetting extends Model
{
    protected $fillable = [
        'restaurant_id',
        'primary_color',
        'font_choice',
        'show_calories',
        'show_allergens',
        'show_promotions',
        'social_instagram',
        'social_facebook',
        'social_whatsapp',
        'custom_domain',
        'bg_color',
        'text_color',
        'card_color',
        'nav_color',
        'currency',
    ];

    protected $casts = [
        'show_calories' => 'boolean',
        'show_allergens' => 'boolean',
        'show_promotions' => 'boolean',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }
}
