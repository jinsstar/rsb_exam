<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student_Info;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationEmail;

class EmailController extends Controller
{
    public function validateStudentId(Request $request)
    {
        $studentId = $request->studentId;
    
        $student = Student_Info::where('student_id', $studentId)->first();
        if (!$student) {
            return response()->json(['error' => 'Invalid Student_ID'], 404); // Updated error message for consistency
        }
    
        $user = User::where('email', $student->email)->first();
        return response()->json([
            'email' => $student->email,
            'verified' => $user ? $user->email_verified_at !== null : false,
        ]);
    }
    
    public function sendVerificationEmail(Request $request)
    {
        $user = User::where("id",$request->studentID)->first();
        // Generate a secure token (you can also use signed routes here)
        // generate api to send in email
        $verificationUrl = route('verify.email', ['token' => base64_encode($request->studentID)]);

        // Send email using the Mailable
        // Mail::to($user->email)->send(new VerificationEmail($verificationUrl));
        Mail::to("stevenacosta0203@gmail.com")->send(new VerificationEmail($verificationUrl));

        return response()->json(['message' => 'Verification email sent successfully']);
    }   
    public function verifyEmail($token)
    {
        $userId = base64_decode($token);
        $user = User::find($userId);

        if ($user) {
            $user->email_verified_at = now();
            $user->save();

            return response()->json(['message' => 'Email verified successfully.']);
        }

        return response()->json(['error' => 'Invalid verification token.'], 400);
    }

}
