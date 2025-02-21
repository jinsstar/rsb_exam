import React, { useState, useEffect } from "react";
import AdminHeader from "../../components/header/admin/AdminHeader";
import FeatureImport from "../../components/datatable/admin/FeatureImport";
import FeatureTable from "../../components/datatable/admin/FeatureTable";

const StudentInformation = () => {
  const [importedData, setImportedData] = useState([]);
  const [showAddStudentForm, setShowAddStudentForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newStudent, setNewStudent] = useState({
    student_id: "",
    fullname: "",
    email: "",
    course: "",
    year: "",
    section: "",
  });

  // Fetch the initial data when the component loads
  useEffect(() => {
    fetchFeatures();
  }, []);

  const handleImportSuccess = () => {
    console.log("Import successful!");
    fetchFeatures(); // Refresh data after a successful import
  };

  const fetchFeatures = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/features");
      const data = await response.json();
      setImportedData(data); // Update the table data
    } catch (error) {
      console.error("Error fetching features:", error);
    }
  };

  const addStudent = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/add-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStudent),
      });

      if (!response.ok) throw new Error("Failed to add student");
      alert("Student added successfully!");

      // Refresh features table
      fetchFeatures();
      setShowAddStudentForm(false);
      setNewStudent({
        student_id: "",
        fullname: "",
        email: "",
        course: "",
        year: "",
        section: "",
      });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student: " + error.message);
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-fit h-full">
        <AdminHeader />
      </div>
      <div className="w-full h-full">
        <p className="flex justify-center p-2 font-semibold">
          Student Information
        </p>
        <FeatureImport onImportSuccess={handleImportSuccess} />

        <div className="flex justify-between p-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="p-2 border w-[35%] border-gray-300 rounded"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => setShowAddStudentForm(true)}
          >
            Add Student
          </button>
        </div>

        {showAddStudentForm && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-semibold mb-4">Add Student</h2>
              {["student_id", "fullname", "email", "course", "year", "section"].map((field) => (
                <div key={field} className="mb-2">
                  <label className="block text-sm capitalize">
                    {field.replace("_", " ")}
                  </label>
                  <input
                    type={
                      field === "email"
                        ? "email"
                        : field === "year"
                        ? "number"
                        : "text"
                    }
                    className="w-full p-2 border rounded"
                    value={newStudent[field]}
                    onChange={(e) => {
                      if (field === "year" && e.target.value.length > 4) {
                        return;
                      }
                      setNewStudent({ ...newStudent, [field]: e.target.value });
                    }}
                    min={field === "year" ? 1 : undefined}
                    max={field === "year" ? 4 : undefined}
                  />
                </div>
              ))}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-2 hover:bg-gray-500"
                  onClick={() => setShowAddStudentForm(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={addStudent}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}

        <FeatureTable searchQuery={searchQuery} data={importedData} />
      </div>
    </div>
  );
};

export default StudentInformation;
