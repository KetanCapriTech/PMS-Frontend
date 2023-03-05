import React from "react";
import Admin from "layouts/Admin.js";
import CardAddStudent from "components/Cards/CardAddStudent";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap pl-8">
        <div className="w-full lg:w-8/12 px-4  py-4 ">
          <CardAddStudent />
        </div>
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
