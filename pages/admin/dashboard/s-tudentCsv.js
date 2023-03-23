import React from "react";
import Admin from "layouts/DashboardView.js";
import CardStudentCsv from "components/Cards/CardAdmin/CardStudentCsv";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardStudentCsv />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
