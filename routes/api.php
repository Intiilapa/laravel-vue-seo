<?php

use App\Http\Controllers\Api\DataController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
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

Route::prefix('data')->group(function() {
    Route::get('/roles', [DataController::class, 'roles']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('users')->middleware('auth:sanctum')->group(function() {
    Route::get('/', [UserController::class, 'index'])->middleware(['role:super_admin,admin']);
    Route::post('/', [UserController::class, 'store'])->middleware(['role:super_admin']);
    Route::delete('/{id}', [UserController::class, 'destroy'])->middleware(['role:super_admin']);
});
