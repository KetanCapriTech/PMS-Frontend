import React from "react";
import Admin from "layouts/DashboardView.js";
import CardAddStudent from "components/Cards/CardAdmin/CardAddStudent";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap pl-8 justify-center">
        <div className="w-full lg:w-8/12 px-4  py-4 ">
          <CardAddStudent />
        </div>
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
