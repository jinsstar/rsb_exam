import { useState } from "react";

const FeatureImport = ({ onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleImport = async () => {
    if (!file) {
      setError("Please select a file before uploading.");
      return;
    }

    // Validate file type
    if (!["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "text/csv"].includes(file.type)) {
      setError("Invalid file type. Please upload a valid .xlsx or .csv file.");
      return;
    }

    setError(null); // Clear errors
    const formData = new FormData();
    formData.append("features_file", file);

    try {
      const response = await fetch("http://localhost:8000/api/import-features", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to import features");
      }

      const data = await response.json();
      alert(data.message);

      if (data.message === "Features imported successfully") {
        onImportSuccess(); // Trigger a table refresh
      }
    } catch (error) {
      setError(error.message);
      console.error("There was an error during the import:", error);
    }
  };

  return (
    <div className="p-4">
    {error && (
      <div className="error-message text-red-500 text-sm mb-3">
        {error} {/* Display error */}
      </div>
    )}
    <div className="flex items-center">
      <input
        type="file"
        onChange={handleFileChange}
        className="border p-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mr-4 transition hover:text-blue-500 duration-200"
      />
      <button
        onClick={handleImport}
        className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Import
      </button>
    </div>
  </div>
  
  );
};

export default FeatureImport;
