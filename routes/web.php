<?php

use App\Http\Controllers\PortalController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::get('/', [PortalController::class, 'index']);
Route::post('/dashboard', [PortalController::class, 'store'])->middleware(['auth', 'verified'])->name('dashboard.store');
Route::get('/dashboardshow', [PortalController::class, 'show'])->middleware(['auth', 'verified'])->name('dashboard.show');
Route::get('/dashboard/edit', [PortalController::class, 'edit'])->middleware(['auth', 'verified'])->name('dashboard.edit');
Route::post('/dashboard/update', [PortalController::class, 'update'])->middleware(['auth', 'verified'])->name('dashboard.update');
Route::post('/dashboard/delete', [PortalController::class, 'destroy'])->middleware(['auth', 'verified'])->name('dashboard.delete');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

require __DIR__ . '/auth.php';
