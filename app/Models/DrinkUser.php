<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class DrinkUser extends Pivot
{
    protected $table = 'drink_user';

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function drink()
    {
        return $this->belongsTo(Drink::class, 'drink_id', 'id');
    }

    public function scopeToday($query)
    {
        return $query->whereBetween('created_at',[now()->startOfDay(), now()->endOfDay()]);
    }

}
