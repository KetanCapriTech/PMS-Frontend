import React from "react";
import Admin from "layouts/Admin.js";
import CardFacutlyCsv from "components/Cards/CardFacultyCsv";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardFacutlyCsv />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
