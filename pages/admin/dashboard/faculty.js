import React from "react";
import Admin from "layouts/Admin.js";
import CardFacutly from "components/Cards/CardFaculty";

export default function FacultyTab() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardFacutly />
      </div>
    </>
  );
}

FacultyTab.layout = Admin;
