import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardAllocatedProjects from "components/Cards/CardFaculty/CardAssignedProject";

export default function AllocatedProject() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardAllocatedProjects />
      </div>
    </>
  );
}

AllocatedProject.layout = DashboardView;
