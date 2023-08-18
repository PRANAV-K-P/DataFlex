import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";

const AdminNavBar = () => {
  const auth = localStorage.getItem("admin");
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("admin");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("userData");
    navigate("/admin/login");
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gray-800 text-purple-500">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between md:w-auto md:static md:block md:justify-start">
            <Link
              className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/admin/dashboard"
            >
              DataFlex
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block md:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu className="text-xl" />
            </button>
          </div>
          <div
            className={
              "flex-col md:flex-row md:flex flex-grow items-center  " +
              (navbarOpen ? " flex " : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col md:flex-row list-none md:ml-auto md:mr-auto md:justify-center w-full md:w-1/2">
              <li className="nav-item">
                <Link to="/admin/dashboard" className="mr-2 text-white text-lg">
                  Dashboard
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/admin/users" className="ml-2 text-white text-lg">
                  Users
                </Link>
              </li>
            </ul>
            <div className=" w-full md:w-1/4 text-white">
              {auth ? (
                <>
                  <button
                  type="button"
                  onClick={logout}
                   className="bg-blue-500 rounded-md p-1 text-white float-left md:float-right">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/admin/login" className="mr-2">
                    SIGN IN
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavBar;
