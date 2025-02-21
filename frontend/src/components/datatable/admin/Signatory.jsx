import { useEffect, useState } from "react";
import axios from 'axios';

const SignatoryTable = () => {
  const [features, setFeatures] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(null);
  const [isAllSelected, setIsAllSelected] = useState(false); // To manage "Select all" checkbox state
  const [selectedFeatures, setSelectedFeatures] = useState([]); // To track selected features

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/courses');
        if (response.data.success) {
          setCourses(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/sections');
        if (response.status === 200) {
          setSections(response.data.sections);
        }
      } catch (error) {
        console.error("Error fetching sections:", error);
      }
    };

    const fetchFeatures = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/feature");
        if (!response.ok) throw new Error("Failed to fetch features");
        const data = await response.json();
        setFeatures(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching features:", error);
      }
    };

    fetchCourses();
    fetchSections();
    fetchFeatures();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    if (!isAllSelected) {
      // Select all features
      setSelectedFeatures(features.map((feature) => feature.id));
    } else {
      // Deselect all features
      setSelectedFeatures([]);
    }
  };

  const handleSelectFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      // Deselect the feature
      setSelectedFeatures(selectedFeatures.filter((featureId) => featureId !== id));
    } else {
      // Select the feature
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  const filteredFeatures = features.filter((feature) =>
    Object.values(feature).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const openModal = (feature) => {
    setCurrentFeature(feature);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFeature(null);
  };

  const handleApprove = () => {
    console.log("Approved:", currentFeature);
    closeModal();
  };

  const handleDecline = () => {
    console.log("Declined:", currentFeature);
    closeModal();
  };

  return (
    <div className="overflow-x-auto w-full h-full">
      {error && <div className="text-red-500">{error}</div>}

      {/* Search Bar */}
      <div className="w-full flex">
        <div className="w-1/2 h-fit">
          {/* Approve all button */}
          {isAllSelected && (
            <button className="flex rounded-lg justify-center items-center bg-blue-500 p-2 text-white">
              <p>Approve all</p>
            </button>
          )}
        </div>
        <div className="w-full h-fit justify-end flex">
          <div className="w-1/2 mr-2 mb-2">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
        </div>
      </div>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-slate-500">
            <th className="flex justify-center gap-2 items-center p-2">
              <input
                type="checkbox"
                checked={isAllSelected} // This will check or uncheck the "Select all" checkbox
                onChange={handleSelectAll} // Toggle the "Select all" checkbox
              />
              <p>Select all</p>
            </th>
            <th className="px-4 py-2 border">Student Id</th>
            <th className="px-4 py-2 border">Fullname</th>
            <th className="px-4 py-2 border">Email</th>
            <th className="px-4 py-2 border">Course</th>
            <th className="px-4 py-2 border">Year</th>
            <th className="px-4 py-2 border">Section</th>
            <th className="px-4 py-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFeatures.length > 0 ? (
            filteredFeatures.map((feature) => (
              <tr key={feature.id}>
                <td className="flex justify-center border py-5 items-center">
                  <input
                    type="checkbox"
                    checked={selectedFeatures.includes(feature.id)} // Individual checkbox is selected based on the state
                    onChange={() => handleSelectFeature(feature.id)} // Toggle individual checkbox
                  />
                </td>
                <td className="border px-4 py-2">{feature.student_id}</td>
                <td className="border px-4 py-2">{feature.fullname}</td>
                <td className="border px-4 py-2">{feature.email}</td>
                <td className="border px-4 py-2">{feature.course}</td>
                <td className="border px-4 py-2">{feature.year}</td>
                <td className="border px-4 py-2">{feature.section}</td>
                <td className="flex py-2 px-4 justify-center border">
                  <button onClick={() => openModal(feature)} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Approve
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-2">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && currentFeature && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Approve or Decline</h2>
            <div className="mb-4">
              <p><strong>Full Name:</strong> {currentFeature.fullname}</p>
              <p><strong>Student ID:</strong> {currentFeature.student_id}</p>
              <p><strong>Course:</strong> {currentFeature.course}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleApprove}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Approve
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Decline
              </button>
            </div>
            <button
              onClick={closeModal}
              className="mt-4 text-gray-600 underline"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignatoryTable;
