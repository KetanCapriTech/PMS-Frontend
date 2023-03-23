/* eslint-disable no-use-before-define */
/* eslint-disable react/jsx-no-target-blank */
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import NotificationDropdown from "components/Dropdowns/NotificationDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = React.useState("hidden");
  const router = useRouter();
  let role;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    role = localStorage.getItem("role");
  }
  let token;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    token = localStorage.getItem("token");
  }
  let projectIsAssigned;
  if (typeof window !== "undefined") {
    // Perform localStorage action
    projectIsAssigned = localStorage.getItem("projectIsAssigned");
  }
  // console.log(role);
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    localStorage.clear();
    router.push("/login");
  };
  return (
    <>
      <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          {/* Toggler */}
          <button
            className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
            type="button"
            onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
          >
            <i className="fas fa-bars"></i>
          </button>
          {/* Brand */}
          <Link href="/">
            <a
              href="#pablo"
              className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
            >
              PMS
            </a>
          </Link>
          {/* User */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <NotificationDropdown />
            </li>
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>
          {/* Collapse */}
          <div
            className={
              "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded " +
              collapseShow
            }
          >
            {/* Collapse header */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link href="/">
                    <a
                      href="#pablo"
                      className="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                    >
                      PMS
                    </a>
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end  ">
                  <button
                    type="button"
                    className="cursor-pointer bg-black text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 md:hidden">
              <div className="mb-3 pt-0">
                <input
                  type="password"
                  placeholder="Search"
                  className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
                />
              </div>
            </form>
            {/* Divider */}
            <hr className="my-4 md:min-w-full" />
            {/* Heading */}
            <h6 className="md:min-w-full text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline">
              {role} Layout Pages
            </h6>
            {/* Navigation */}
            {role === "admin" && (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link href="/admin/dashboard/student">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/dashboard/student") !==
                        -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/student"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Student
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/dashboard/faculty">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf("/admin/dashboard/faculty") !==
                        -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/faculty"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Faculty
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/dashboard/f-acultyCsv">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/admin/dashboard/f-acultyCsv"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/f-acultyCsv"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Faculty Csv
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/dashboard/s-tudentCsv">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/admin/dashboard/s-tudentCsv"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/s-tudentCsv"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Student Csv
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/dashboard/addStudent">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/admin/dashboard/addStudent"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/addStudent"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Add Student
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/admin/dashboard/addFaculty">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/admin/dashboard/addFaculty"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/admin/dashboard/addFaculty"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Add Faculty
                    </a>
                  </Link>
                </li>

                {/* /admin end/ */}
              </ul>
            )}
            {role === "faculty" && (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link href="/faculty/dashboard/dashboard">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/faculty/dashboard/dashboard"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/faculty/dashboard/dashboard"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Dashboard
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/faculty/dashboard/profile">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/faculty/dashboard/profile"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/faculty/dashboard/profile"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Profile
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/faculty/dashboard/groups">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/faculty/dashboard/groups"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/faculty/dashboard/groups"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Groups
                    </a>
                  </Link>
                </li>
                <li className="items-center">
                  <Link href="/faculty/dashboard/requests">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/faculty/dashboard/requests"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/faculty/dashboard/requests"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>
                      Requests
                    </a>
                  </Link>
                </li>

                {/* /faculty end/ */}
              </ul>
            )}
            {role === "student" && (
              <ul className="md:flex-col md:min-w-full flex flex-col list-none">
                <li className="items-center">
                  <Link href="/student/dashboard/dashboard">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/student/dashboard/dashboard"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/student/dashboard/dashboard"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Dashboard
                    </a>
                  </Link>
                </li>

                <li className="items-center">
                  <Link href="/student/dashboard/profile">
                    <a
                      href="#pablo"
                      className={
                        "text-xs uppercase py-3 font-bold block " +
                        (router.pathname.indexOf(
                          "/student/dashboard/profile"
                        ) !== -1
                          ? "text-lightBlue-500 hover:text-lightBlue-600"
                          : "text-blueGray-700 hover:text-blueGray-500")
                      }
                    >
                      <i
                        className={
                          "fas fa-tv mr-2 text-sm " +
                          (router.pathname.indexOf(
                            "/student/dashboard/profile"
                          ) !== -1
                            ? "opacity-75"
                            : "text-blueGray-300")
                        }
                      ></i>{" "}
                      Profile
                    </a>
                  </Link>
                </li>

                {localStorage.getItem("projectIsAssigned") === "yes" ? (
                  <>
                    <li className="items-center">
                      <Link href="/student/dashboard/request">
                        <a
                          href="#pablo"
                          className={
                            "text-xs uppercase py-3 font-bold block " +
                            (router.pathname.indexOf(
                              "/student/dashboard/request"
                            ) !== -1
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500")
                          }
                        >
                          <i
                            className={
                              "fas fa-tv mr-2 text-sm " +
                              (router.pathname.indexOf(
                                "/student/dashboard/request"
                              ) !== -1
                                ? "opacity-75"
                                : "text-blueGray-300")
                            }
                          ></i>
                          Group
                        </a>
                      </Link>
                    </li>
                    <li className="items-center">
                      <Link href="/student/dashboard/submission">
                        <a
                          href="#pablo"
                          className={
                            "text-xs uppercase py-3 font-bold block " +
                            (router.pathname.indexOf(
                              "/student/dashboard/submission"
                            ) !== -1
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500")
                          }
                        >
                          <i
                            className={
                              "fas fa-tv mr-2 text-sm " +
                              (router.pathname.indexOf(
                                "/student/dashboard/submission"
                              ) !== -1
                                ? "opacity-75"
                                : "text-blueGray-300")
                            }
                          ></i>
                          Submission
                        </a>
                      </Link>
                    </li>

                    <li className="items-center">
                      <Link href="/student/dashboard/projects">
                        <a
                          href="#pablo"
                          className={
                            "text-xs uppercase py-3 font-bold block " +
                            (router.pathname.indexOf(
                              "/student/dashboard/projects"
                            ) !== -1
                              ? "text-lightBlue-500 hover:text-lightBlue-600"
                              : "text-blueGray-700 hover:text-blueGray-500")
                          }
                        >
                          <i
                            className={
                              "fas fa-tv mr-2 text-sm " +
                              (router.pathname.indexOf(
                                "/student/dashboard/projects"
                              ) !== -1
                                ? "opacity-75"
                                : "text-blueGray-300")
                            }
                          ></i>
                          Project
                        </a>
                      </Link>
                    </li>
                  </>
                ) : null}

                {/* /faculty end/ */}
              </ul>
            )}
          </div>
          <button
            className="bg-indigo-500 w-full lg:w-8 mt-4 mb-4  pt-4 pb-4 text-white font-medium py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </>
  );
}
