<?php

use App\Http\Controllers\Web\AuthController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/login', [AuthController::class, 'login'])->name('login');

Route::get('/home', [App\Http\Controllers\Web\HomeController::class, 'index'])->middleware(['auth'])->name('home');
Route::get('/users/{user}', [App\Http\Controllers\Web\UserController::class, 'show'])->middleware(['auth', 'role:super_admin,admin,user'])->name('showUser');
Route::get('/users', [App\Http\Controllers\Web\UserController::class, 'index'])->middleware(['auth', 'role:super_admin,admin,user'])->name('users');
