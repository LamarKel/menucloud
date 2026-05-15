<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'restaurant_id',
        'plan_id',
        'status',
        'started_at',
        'next_billing_date',
        'notes',
    ];

    protected $casts = [
        'started_at' => 'date',
        'next_billing_date' => 'date',
    ];

    public function restaurant()
    {
        return $this->belongsTo(Restaurant::class);
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function payments()
    {
        return $this->hasMany(Payment::class);
    }
}
