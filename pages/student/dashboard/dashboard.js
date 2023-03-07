import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardDashboard from "components/Cards/CardStudent/CardDashboard";

export default function Dashboard() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardDashboard />
      </div>
    </>
  );
}

Dashboard.layout = DashboardView;
