<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student_Info extends Model
{
    // Specify the table name explicitly (if it's not the default plural form)
    protected $table = 'student_info';  // This tells Laravel to use the 'student_info' table
    
    // Define the fillable attributes to prevent mass-assignment vulnerabilities
    protected $fillable = [
        'student_id', 
        'fullname',
        'lastname', 
        'firstname', 
        'email', 
        'course', 
        'year', 
        'section',
    ];

    // If you want to disable timestamps, uncomment the following line
    // public $timestamps = false;
}
