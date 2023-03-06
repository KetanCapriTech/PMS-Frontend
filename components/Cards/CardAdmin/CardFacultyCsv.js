import FacultyCsv from "components/AdminFolder/facultyCsv";
import React from "react";

// components

export default function CardFacutlyCsv() {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words p-8 bg-white w-full  shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-bold text-center text-base text-blueGray-700 ">
                ADD FACULTY CSV
              </h3>
            </div>
          </div>
        </div>
        {/* content here */}
        <div>
          <FacultyCsv />
        </div>
      </div>
    </>
  );
}
