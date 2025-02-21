import React from 'react'
import AdminHeader from '../../components/header/admin/AdminHeader'
import { Link } from 'react-router-dom'

const Record = () => {
  return (
    <div className='w-full h-full'>
      <div className="w-full h-screen flex overflow-scroll overflow-y-hidden">
      <AdminHeader/>
       {/* Display the student data */}
       <div className="w-full h-full p-2">
         <p className='flex justify-center items-center font-semibold mt-6'>Student Record</p>
         <div className='w-full h-fit flex p-4'>
          <div className='flex w-1/2'>
           <p className='flex justify-center items-center'>Cleared Students</p>
          </div>
          <div className='flex w-1/2 items-end justify-end'>
            <Link to="/admin/student/not-cleared">
              <p className='bg-[#334155] flex justify-center items-center rounded-lg text-white p-1 h-10 w-40 hover:bg-blue-500 transition duration-200'>Not Cleared</p>
            </Link>
          </div>
         </div>
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
                  <th className="users-th">
                  <p className='flex justify-center text-sm'>School year</p>
                  </th>
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
                    <td className="users-td pt-6 pl-6"><p className='flex justify-start text-sm'>MA21010408</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>Steven Acosta</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>BSIS</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>Fourth Year</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>B</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>First Semester</p></td>
                    <td className="users-td pt-6 pl-6"><p className='flex justify-center text-sm'>December 2024</p></td>
                    <td className="users-td pt-6"></td>
                    <td className="users-td pt-6">
                      <p className="flex justify-center text-blue-500 underline hover:text-slate-500 cursor-pointer">Archive</p>
                    </td>
                  </tr>
              </tbody>
            </table>
        </div>
      </div>
    </div>
  )
}

export default Record
