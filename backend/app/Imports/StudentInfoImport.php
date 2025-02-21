<?php

namespace App\Imports;

use App\Models\Student_Info;
use Maatwebsite\Excel\Concerns\ToModel;

class StudentInfoImport implements ToModel
{
    public function model(array $row)
    {
        // Skip if the student_id already exists
        if (Student_Info::where('student_id', $row[0])->exists()) {
            return null; // Ignore this row
        }

        return new Student_Info([
            'student_id' => $row[0], // Assuming student_id is in the first column
            'fullname' => $row[1],   // Assuming fullname is in the second column
            'email' => $row[2],      // Assuming email is in the third column
            'course' => $row[3],     // Assuming course is in the fourth column
            'year' => $row[4],       // Assuming year is in the fifth column
            'section' => $row[5],    // Assuming section is in the sixth column
        ]);
    }
}

