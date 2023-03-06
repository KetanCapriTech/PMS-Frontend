import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardAssignedProject from "components/Cards/CardFaculty/CardAssignedProject";

export default function AssignedProject() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardAssignedProject />
      </div>
    </>
  );
}

AssignedProject.layout = DashboardView;
