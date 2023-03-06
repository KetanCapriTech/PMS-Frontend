import React from "react";
import Admin from "layouts/DashboardView.js";
import CardFacutly from "components/Cards/CardAdmin/CardFaculty";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardFacutly />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
