<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'owner_name',
        'email',
        'phone',
        'address',
        'city',
        'cuisine_type',
        'logo',
        'banner',
        'description',
        'status',
        'plan_id',
        'approved_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
    ];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class)->orderBy('sort_order');
    }

    public function products()
    {
        return $this->hasMany(Product::class)->orderBy('sort_order');
    }

    public function promotions()
    {
        return $this->hasMany(Promotion::class);
    }

    public function subscriptions()
    {
        return $this->hasMany(Subscription::class);
    }

    public function settings()
    {
        return $this->hasOne(RestaurantSetting::class);
    }

    public function activeSubscription()
    {
        return $this->hasOne(Subscription::class)->where('status', 'active')->latest();
    }
}
