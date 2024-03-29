import React from "react";

import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Navbar() {
  let role;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    role = localStorage.getItem("role");
  }
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <p
            className="text-white text-2xl uppercase  hidden rounded p-2 lg:inline-block font-semibold"
            href="#pablo"
            onClick={(e) => e.preventDefault()}
            style={{ color: "#212121" }}
          >
            {role}
          </p>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
