import React from "react";
import DashboardView from "layouts/DashboardView.js";
import CardProfile from "components/Cards/CardFaculty/CardProfile";

export default function Profile() {
  return (
    <>
      <div className="flex flex-wrap"></div>
      <div className="flex flex-wrap mt-4">
        <CardProfile />
      </div>
    </>
  );
}

Profile.layout = DashboardView;
