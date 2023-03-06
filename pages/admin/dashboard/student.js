import React from "react";
import CardStudent from "components/Cards/CardAdmin/CardStudent";
import Admin from "layouts/DashboardView.js";

export default function Student() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardStudent />
      </div>
    </>
  );
}

Student.layout = Admin;
