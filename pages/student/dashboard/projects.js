import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardStudentProject from "components/Cards/CardStudent/CardStudentProject";

export default function Project() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardStudentProject />
      </div>
    </>
  );
}

Project.layout = DashboardView;
