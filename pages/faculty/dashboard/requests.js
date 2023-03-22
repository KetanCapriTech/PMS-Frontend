import React from "react";
import DashboardView from "layouts/DashboardView.js";
import Cardrequests from "components/Cards/CardFaculty/Cardrequests";

export default function requests() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <Cardrequests />
      </div>
    </>
  );
}

requests.layout = DashboardView;
