<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Plan extends Model
{
    protected $fillable = [
        'name',
        'price',
        'max_products',
        'max_categories',
        'has_promotions',
        'has_custom_domain',
        'has_statistics',
        'max_admins',
        'is_active',
    ];

    protected $casts = [
        'has_promotions' => 'boolean',
        'has_custom_domain' => 'boolean',
        'has_statistics' => 'boolean',
        'is_active' => 'boolean',
        'price' => 'decimal:2',
    ];

    public function restaurants()
    {
        return $this->hasMany(Restaurant::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }
}
