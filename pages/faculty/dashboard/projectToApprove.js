import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardProjectApproved from "components/Cards/CardFaculty/CardProjectToApprove";

export default function ProjectToApprove() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardProjectApproved />
      </div>
    </>
  );
}

ProjectToApprove.layout = DashboardView;
