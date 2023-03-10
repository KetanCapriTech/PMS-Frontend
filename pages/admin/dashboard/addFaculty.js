import React from "react";
import Admin from "layouts/DashboardView.js";
import CardAddFaculty from "components/Cards/CardAdmin/CardAddFaculty";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap w-full lg:w-8/12 px-4 mt-4">
        <CardAddFaculty />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
