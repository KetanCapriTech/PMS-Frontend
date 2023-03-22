import { useState, useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
export default function Groups() {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchDetails = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Replace with your actual token
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/faculty/groups`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      const groupsArray = Object.keys(data).map((key) => data[key]);
      setGroups(groupsArray);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDetails();
  }, []);

  const handleClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white rounded-lg shadow-lg cursor-pointer p-4 hover:shadow-xl transition-all duration-300"
              onClick={() => handleClick(group)}
            >
              <h2 className="text-lg font-bold mb-2">{group.groupName}</h2>
              <p className="text-gray-500 text-sm mb-1">{group.title}</p>
              <p className="text-gray-500 text-sm">{group.groupLeader}</p>
            </div>
          ))}
          {selectedGroup && (
            <div className="fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg shadow-lg p-4">
                <h2 className="text-lg font-bold mb-2">
                  {selectedGroup.groupName}
                </h2>
                <p className="text-gray-500 text-sm mb-1">
                  {selectedGroup.semester}
                </p>
                <p className="text-gray-500 text-sm mb-1">
                  {selectedGroup.title}
                </p>
                <p className="text-gray-500 text-sm mb-4">
                  {selectedGroup.description}
                </p>
                <button
                  className="bg-gray-200 px-4 py-2 rounded-md text-sm font-semibold text-gray-800 hover:bg-gray-300 transition-all duration-300"
                  onClick={() => setSelectedGroup(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
