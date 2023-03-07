import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardStudentProfile from "components/Cards/CardStudent/CardStudentProfile";

export default function StudentProfile() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardStudentProfile />
      </div>
    </>
  );
}

StudentProfile.layout = DashboardView;
