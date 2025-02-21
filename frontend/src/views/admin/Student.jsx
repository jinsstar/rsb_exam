import React, { useState, useEffect } from 'react';
import AdminHeader from '../../components/header/admin/AdminHeader';

const Record = () => {
  // State to store courses data
  const [courses, setCourses] = useState([]);

  // Fetch courses data from the API on component mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/courses'); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data); // Set courses in the state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className='w-full h-full'>
      <div className="w-full h-screen flex overflow-scroll overflow-y-hidden">
        <AdminHeader />
        {/* Display the student data */}
        <div className="w-full h-full p-2">
          <p className='flex justify-center items-center font-semibold mt-6'>Student Record</p>
          {/* dynamic filtering */}
          <div className='w-full flex h-fit gap-3 justify-end mb-3 mt-3'>
            {/* Course select dropdown */}
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>Select Course</option>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_code} {/* Only display course_code */}
                  </option>
                ))
              ) : (
                <option>No courses available</option>
              )}
            </select>

            {/* Other filters */}
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>Year Level</option>
            </select>
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>Section</option>
            </select>
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>Select Semester</option>
            </select>
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>School Year</option>
            </select>
            <select className='w-[12%] h-10 outline outline-1 outline-slate-400 rounded-lg'>
              <option>Status</option>
            </select>
          </div>

          <div className='w-full h-full'>
            <table className="table-auto w-[100%] text-left">
              <thead>
                <tr className="bg-slate-300 h-10">
                  <th className='users-th p-6 gap-2 flex'>
                    <input type='checkbox'/>
                    <p className='flex justify-start text-sm'>select all</p>
                  </th>
                  <th className="users-th p-6 w-32"><p className='flex justify-start text-sm'>Student ID</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>Fullname</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>Course</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>Year</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>Section</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>Semester</p></th>
                  <th className="users-th"><p className='flex justify-center text-sm'>School year</p></th>
                  <th className="users-th">
                    <p className="flex justify-center"></p>
                  </th>
                  <th className="users-th">
                    <p className="flex justify-center"></p>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-100">
                  <td></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-start text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'></p></td>
                  <td className="users-td pt-6"></td>
                  <td className="users-td pt-6">
                    <p className="flex justify-center text-blue-500 underline hover:text-slate-500 cursor-pointer"></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Record;
