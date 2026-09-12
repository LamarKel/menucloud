<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    use HasFactory;

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
        'menu_version',
        'menu_version_updated_at',
    ];

    protected $casts = [
        'approved_at' => 'datetime',
        'menu_version_updated_at' => 'datetime',
    ];

    /**
     * Sube la versión del menú de forma atómica. Un solo número gobierna
     * sesiones activas, reconciliación, alerta y semáforo del lado Dicbot.
     */
    public function bumpMenuVersion(): int
    {
        $this->increment('menu_version');
        $this->forceFill(['menu_version_updated_at' => now()])->save();

        return $this->fresh()->menu_version;
    }

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
