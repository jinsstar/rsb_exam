import React, { useState, useEffect } from 'react';
import "../CSS/BoxContainer.css";

const Course = () => {
const [coursesList, setCoursesList] = useState([]);
const [courseCode, setCourseCode] = useState('');
const [courseDescription, setCourseDescription] = useState('');
const [editingCourse, setEditingCourse] = useState(null);
const [error, setError] = useState('');
const [isLoading, setIsLoading] = useState(false); // For loading state
const [isSubmitting, setIsSubmitting] = useState(false); // For button disablement

  // Fetch courses on component mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Nested checkbox lists data (Second Level)
 const mainItems = {
    1: [
     { id: 1, label: '1st Year' },
     { id: 2, label: '2nd Year' },
     { id: 3, label: '3rd Year' },
     { id: 4, label: '4th Year' }
    ],
    2: [
     { id: 1, label: '1st Year' },
     { id: 2, label: '2nd Year' },
     { id: 3, label: '3rd Year' },
     { id: 4, label: '4th Year' }
    ],
    3: [
     { id: 1, label: '1st Year' },
     { id: 2, label: '2nd Year' },
     { id: 3, label: '3rd Year' },
     { id: 4, label: '4th Year' }
    ]
  };
 
  // Third-level nested checkbox lists data
  const nestedItems = {
    1: {
      1: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ],
      2: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ]
    },
    2: {
      1: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ],
      2: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ]
    },
    3: {
      1: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ],
      2: [
       { id: 1, label: 'Section A' },
       { id: 2, label: 'Section B' }
      ]
    }
  };

  const fetchCourses = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/courses');
      if (!response.ok) {
        throw new Error(`Failed to fetch courses: ${response.statusText}`);
      }
      const data = await response.json();
      setCoursesList(data.data);
      console.log(coursesList)
      debugger

    } catch (error) {
      console.error('Error fetching courses:', error);
      setError(`Failed to load courses. Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'courseCode') {
      setCourseCode(value);
    } else if (name === 'courseDescription') {
      setCourseDescription(value);
    }
  };

  const handleSaveCourse = async () => {
    if (!courseCode.trim() || !courseDescription.trim()) {
      alert('Both Course Code and Description are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch('http://localhost:8000/api/courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_code: courseCode,
          course_description: courseDescription,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error occurred while saving the course');
        return;
      }

      alert('Course created successfully!');
      setCourseCode('');
      setCourseDescription('');
      fetchCourses(); // Automatically refresh list after saving
    } catch (error) {
      console.error('Error saving course:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCourse = async (id) => {
    if (!courseCode.trim() || !courseDescription.trim()) {
      alert('Both Course Code and Description are required.');
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          course_code: courseCode,
          course_description: courseDescription,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error occurred while updating the course');
        return;
      }

      alert('Course updated successfully!');
      setCourseCode('');
      setCourseDescription('');
      setEditingCourse(null);
      fetchCourses(); // Automatically refresh list after update
    } catch (error) {
      console.error('Error editing course:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/api/courses/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        alert(error.message || 'Error occurred while deleting the course');
        return;
      }

      alert('Course deleted successfully!');
      fetchCourses(); // Automatically refresh list after deletion
    } catch (error) {
      console.error('Error deleting course:', error);
      alert('Failed to connect to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full overflow-y-hidden ">
      <div className="w-full h-full flex">
        <div className="w-full h-full">
          <div className="w-full h-full flex">
            {/* Courses List */}
            <div className="w-1/2 rounded-lg flex flex-col overflow-y-visible-visible h-screen p-4">
              <h2 className="text-xl font-bold mb-4">Courses List</h2>
              {error && <p className="text-red-500">{error}</p>}
              {isLoading ? (
                <p className="text-blue-500">Loading courses...</p>
              ) : (
                <table className="table-auto w-full text-center border border-collapse  border-gray-200">
                  <thead>
                    <tr className="bg-slate-200">
                      <th className="p-2 border">Action</th>
                      <th className="p-2 border">Course Code</th>
                      <th className="p-2 border">Course Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesList.length > 0 ? (
                      coursesList.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-300">
                          <td className="p-2 border flex">
                            <button
                              className="bg-blue-500 rounded-lg w-20 px-3 py-1 text-white mr-2"
                              onClick={() => {
                                setCourseCode(course.course_code);
                                setCourseDescription(course.course_description);
                                setEditingCourse(course.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-500 px-3 w-20 py-1 rounded-lg text-white"
                              onClick={() => handleDeleteCourse(course.id)}
                              disabled={isSubmitting}
                            >
                              Delete
                            </button>
                          </td>
                          <td className="p-2 border">{course.course_code}</td>
                          <td className="p-2 border">{course.course_description}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="3" className="p-4">
                          <p className="text-gray-500">
                            No Courses Available. Click "Add Course" to get started!
                          </p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            {/* Add/Edit Course */}
            <div className="w-1/2 h-full flex flex-col items-center pt-10">
              <h2 className="text-xl font-bold mb-4">
                {editingCourse ? 'Edit Course' : 'Add Course'}
              </h2>
              <input
                type="text"
                name="courseCode"
                maxLength={8} // This limits the input to 10 characters
                className="h-10 outline outline-1 w-1/2 outline-slate-400 rounded-lg mb-4 px-2"
                placeholder={editingCourse ? 'Edit Course Code' : 'Add Course Code'}
                value={courseCode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="courseDescription"
                className="h-10 outline outline-1 w-1/2 outline-slate-400 rounded-lg mb-4 px-2"
                placeholder={editingCourse ? 'Edit Course Description' : 'Add Course Description'}
                maxLength={70} // This limits the input to 10 characters
                value={courseDescription}
                onChange={handleInputChange}
              />
               <div className="box-container w-1/2">
                <h2 className="box-title">Select Year Level And Section</h2>
                <div className="box-content">

                </div>
                </div>
              <button
                className="bg-blue-500 rounded-lg h-10 text-white w-36"
                onClick={() =>
                  editingCourse
                    ? handleEditCourse(editingCourse)
                    : handleSaveCourse()
                }
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Submitting...'
                  : editingCourse
                  ? 'Update'
                  : 'Save'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Course;