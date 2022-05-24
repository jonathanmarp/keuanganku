<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DebtUser extends Model
{
    use HasFactory;

    protected $fillable = ["key", "type", "size", "paid", "create", "has_paid"];
    protected $guarded = ["id"];
}
