<?php

// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');
use App\Http\Controllers\AddStudentController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ForgotPassword;
use App\Http\Controllers\StudentInfoController;
use App\Http\Controllers\FetchStudents;
use App\Http\Controllers\FeatureController;
use App\Http\Controllers\DataControllerOffice;
use App\Http\Controllers\AddOfficeController;
use App\Http\Controllers\AddCoursesController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\LoginControllerEmail;
use App\Http\Controllers\YearLevelController;
use App\Http\Controllers\SignatoryController;
use App\Http\Controllers\AddSections;
use App\Http\Controllers\AddSchoolYear;
use App\Mail\VerificationEmail;
use Illuminate\Support\Facades\Mail;


Route::post('/login', [AuthController::class, 'login']);

// MIDDLEWARE
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
// USERS AUTHENTICATION
Route::middleware('auth:sanctum')->get('/users', [AuthController::class, 'getUsers']); // Or UserController

// Get current user data (GET request)
Route::middleware('auth:sanctum')->get('/profile', [AuthController::class, 'getUser']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/getTask/{id}', [TaskController::class, 'index']);
    Route::post('/addTask', [TaskController::class, 'store']);
    Route::put('/updateTask/{id}', [TaskController::class, 'update']);
    Route::delete('/deleteTask/{id}', [TaskController::class, 'delete']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/adduser', [AuthController::class, 'register']);
});
// Update user profile (PUT request)
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfileAdmin']);
Route::middleware('auth:sanctum')->put('/profile', [AuthController::class, 'updateProfileStudent']);


// Forgot Password
Route::post('/forgot-password', [forgotPassword::class, 'forgotPassword']);
Route::post('/reset-password', [resetPassword::class, 'resetPassword']);

// Fetching student semester
Route::get('/students', [FetchStudents::class, 'StudentInformation']);
Route::get('/dispatch_task', [TaskController::class, 'dispatch_task']);









