import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardGroups from "components/Cards/CardFaculty/CardGroups";

export default function Groups() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardGroups />
      </div>
    </>
  );
}

Groups.layout = DashboardView;
