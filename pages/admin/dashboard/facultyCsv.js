import React from "react";
import Admin from "layouts/DashboardView.js";
import CardFacutlyCsv from "components/Cards/CardAdmin/CardFacultyCsv";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardFacutlyCsv />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
