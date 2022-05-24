<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MoneyUsers extends Model
{
    use HasFactory;

    protected $fillable = ["key", "type", "size", "create", "update"];
    protected $guarded = ["id"];
}
