import StudentTab from "components/AdminFolder/student";
import React from "react";

// components

export default function CardStudent() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full  shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-base text-blueGray-700 ">
                STUDENTS
              </h3>
            </div>
          </div>
        </div>
        {/* content here */}
        <div>
          <StudentTab />
        </div>
      </div>
    </>
  );
}
