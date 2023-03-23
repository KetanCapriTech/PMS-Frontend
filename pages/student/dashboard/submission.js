import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardSubmission from "components/Cards/CardStudent/CardSubmission";

export default function Submission() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardSubmission />
      </div>
    </>
  );
}

Submission.layout = DashboardView;
