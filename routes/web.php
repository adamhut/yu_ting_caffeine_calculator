<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserDrinksContrller;

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

Auth::routes();

Route::redirect('/', '/login', 301);

Route::group(['auth'],function(){
    Route::get('/home', [HomeController::class, 'index'])->name('home');
    Route::get('/user-drink', [UserDrinksContrller::class, 'index'])->name('user-drink.index');
    Route::post('/user-drink', [UserDrinksContrller::class,'store'])->name('user-drink.store');
    Route::delete('/user-drink', [UserDrinksContrller::class, 'destroy'])->name('user-drink.destroy');
});
