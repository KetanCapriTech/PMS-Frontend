import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardReview from "components/Cards/CardStudent/CardReview";

export default function Review() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardReview />
      </div>
    </>
  );
}

Review.layout = DashboardView;
