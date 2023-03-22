import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardRequest from "components/Cards/CardStudent/CardGroup";

export default function Request() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardRequest />
      </div>
    </>
  );
}

Request.layout = DashboardView;
