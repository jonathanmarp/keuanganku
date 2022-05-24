<?php

use App\Http\Controllers\DebtUsers;
use App\Http\Controllers\MoneyUser;
use App\Http\Controllers\Users;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get("/", [Users::class, "index"]);

// Create method
// Group user
Route::group(["prefix" => "user"], function () use ($router) {
    // Create
    $router->get("/create/{email}/{username}/{password}/", [Users::class, "create"]);

    // Login
    $router->get("/login/{email}/{username}/{password}/", [Users::class, "login"]);

    // Delete
    $router->get("/delete/{id}/{key}/{email}/{username}/{password}/", [Users::class, "delete"]);

    // Update
    $router->get("/update/{id}/{key}/{email}/{username}/{password}/{newusername}", [Users::class, "update"]);
});

// Group MoneyUser
Route::group(["prefix" => "money"], function () use ($router) {
    // Create
    $router->get("/create/{key}/{type}/{size}/", [MoneyUser::class, "create"]);

    // Delete
    $router->get("/delete/{key}/{id}/", [MoneyUser::class, "delete"]);

    // Update
    $router->get("/update/{key}/{id}/{size}", [MoneyUser::class, "update"]);

    // All
    $router->get("/all/{key}/", [MoneyUser::class, "all"]);
});

// Group MoneyUser
Route::group(["prefix" => "debt"], function () use ($router) {
    // Create
    $router->get("/create/{key}/{type}/{size}/", [DebtUsers::class, "create"]);

    // Delete
    $router->get("/delete/{key}/{id}/", [DebtUsers::class, "delete"]);

    // Update
    $router->get("/update/{key}/{id}/{size}", [DebtUsers::class, "update"]);

    // Update
    $router->get("/paid/{key}/{id}", [DebtUsers::class, "paid"]);

    // All
    $router->get("/all/{key}/", [DebtUsers::class, "all"]);
});