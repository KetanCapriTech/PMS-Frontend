import React, { useState } from "react";

function FacultyCsv() {
  const [csvData, setCsvData] = useState([]);
  const [responseData, setResponseData] = useState([]);
  const bearerToken = localStorage.getItem("token");

  const handleOnDrop = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/add-faculties`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
        }
      );
      const data = await response.json();
      console.log("Success:", data);
      setResponseData(data); // set the data received from the server to the state variable
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div class="flex w-full  items-center justify-center bg-grey-lighter">
        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg
            class="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span class="mt-2 text-base leading-normal">Select a file</span>
          <input
            type="file"
            accept=".csv"
            class="hidden"
            onChange={handleOnDrop}
          />
        </label>
      </div>

      <table class="w-full border-collapse border border-gray-400">
        <tbody>
          {csvData.map((row, index) => (
            <tr key={index} class="bg-white border border-gray-400">
              <td class="p-3">{row[0]}</td>
              <td class="p-3">{row[1]}</td>
              <td class="p-3">{row[2]}</td>
              <td class="p-3">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {responseData.length > 0 && (
        <div>
          <h3 className="mt-8 mb-8 font-bold">
            Data received from the server:
          </h3>

          <table class="w-full border-collapse border border-gray-400">
            <thead>
              <tr class="bg-gray-200 border border-gray-400">
                <th class="p-3 text-left">Name</th>
                <th class="p-3 text-left">Email</th>
                <th class="p-3 text-left">Department</th>
                <th class="p-3 text-left">Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {responseData.map((row, index) => (
                <tr key={index} class="bg-white border border-gray-400">
                  <td class="p-3">{row.name}</td>
                  <td class="p-3">{row.email}</td>
                  <td class="p-3">{row.department}</td>
                  <td class="p-3">{row.phoneNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default FacultyCsv;
