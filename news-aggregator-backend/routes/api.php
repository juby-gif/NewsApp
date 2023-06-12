<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\NewsFeedController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');
Route::get('/articles', [ArticleController::class, 'fetchArticles'])->name('articles');

/// Protected routes
Route::middleware('auth.api')->group(function () {
    Route::get('/preferences', [NewsFeedController::class, 'showNewsFeed'])->name('preferences');
    Route::post('/preferences/update', [NewsFeedController::class, 'updatePreferences'])->name('preferences.update');
    Route::post('/preferences/create', [NewsFeedController::class, 'createPreferences'])->name('preferences.create');
    Route::delete('/preferences/delete', [NewsFeedController::class, 'deletePreferences'])->name('preferences.delete');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
});

