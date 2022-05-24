<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserDB extends Model
{
    use HasFactory;

    protected $fillable = ["email", "username", "password", "key", "create"];
    protected $guarded = ["id"];
}
