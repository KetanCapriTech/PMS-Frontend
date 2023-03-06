import StudentCsv from "components/AdminFolder/studentCsv";
import React from "react";

// components

export default function CardStudentCsv() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full p-8 shadow-lg rounded">
        <div className="rounded-t mb-0 px-2 py-3 text-center border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-base text-blueGray-700 ">
                ADD STUDENT CSV
              </h3>
            </div>
          </div>
        </div>
        {/* content here */}
        <div>
          <StudentCsv />
        </div>
      </div>
    </>
  );
}
