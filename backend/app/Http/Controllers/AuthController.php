<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyAccount;

class AuthController extends Controller
{
   
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:users,name|string', // Fixed extra space
            'email' => 'required|email|unique:users,email',
            'role' => 'required|in:admin,user',
        ]);
    
        $defaultPassword = $this->generateDefaultPassword();
    
        $user = User::create([
            'name' => trim($request->name), // Trimmed to ensure no extra spaces
            'email' => $request->email,
            'password' => Hash::make($defaultPassword),
            'role' => $request->role,
        ]);
    
        return response()->json(['message' => 'User registered successfully'], 201);
    }
    

    // Function to generate the default password
    private function generateDefaultPassword()
    {
        return 'Default@123'; // Change this to whatever default password you want
    }


    // Login
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        try {
            $email = strtolower($request->email);
            $user = User::where('email', $email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
            
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Login successful',
                'token' => $token,
                'role' => $user->role,
                'name' => $user->name,
                'id' => $user->id, // Add user name here
            ]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e], 500);
        }
    }


    // Logout
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'Logged out successfully']);
    }


    // show Users
    public function getUsers()
    {
        $users = User::all();
        return response()->json($users);
    }
    // Update user profile
    public function updateProfileAdmin(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|min:6', // Password is optional on update
        ]);

        $user = $request->user(); // Get the authenticated user

        // Check if the email is unique, except for the authenticated user's email
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        // Update user information
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }
    public function updateProfileStudent(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'password' => 'nullable|min:6', // Password is optional on update
        ]);

        $user = $request->user(); // Get the authenticated user

        // Check if the email is unique, except for the authenticated user's email
        $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
        ]);

        // Check if password is provided and it is different from the current password
        if ($request->filled('password') && Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'New password cannot be the same as the current password'], 400);
        }

        // Update user information
        $user->name = $request->name;
        $user->email = $request->email;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return response()->json(['message' => 'Profile updated successfully'], 200);
    }


    // Show logged-in user data
    public function getUser(Request $request)
    {
        return response()->json($request->user());
    }
    
}

