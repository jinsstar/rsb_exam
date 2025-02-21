<?php

namespace App\Http\Controllers;

use App\Mail\SendOtp;
use App\Models\OtpCode;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class LoginControllerEmail extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        // Generate OTP
        $otp = rand(100000, 999999);
        OtpCode::create([
            'user_id' => $user->id,
            'otp' => $otp,
            'expires_at' => now()->addMinutes(5), // Expires in 5 minutes
        ]);

        // Send OTP via email
        Mail::to($user->email)->send(new SendOtp($otp));

        return response()->json(['message' => 'OTP sent to your email'], 403);
    }

    public function verifyOtp(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'otp' => 'required|numeric',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $otpCode = OtpCode::where('user_id', $user->id)
            ->where('otp', $request->otp)
            ->where('expires_at', '>=', now()) // Check expiry
            ->first();

        if (!$otpCode) {
            return response()->json(['error' => 'Invalid or expired OTP'], 400);
        }

        // OTP is valid; delete it
        $otpCode->delete();

        return response()->json(['message' => 'OTP verified successfully']);
    }
}
