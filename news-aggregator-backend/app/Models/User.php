<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'token',
        'refresh_token',
        'token_expires_at'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function preference()
    {
        return $this->hasOne(Preference::class);
    }
}
