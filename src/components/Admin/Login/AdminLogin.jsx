import React, { useEffect, useState } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  useEffect(() => {
    const auth = localStorage.getItem("admin");
    if (auth) {
      navigate("/admin/dashboard");
    }
  }, []);

  const emailRegex = /^\s*([a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/i;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

  const handleLogin = async () => {
    try {
      if (!emailRegex.test(email) || !passwordRegex.test(password)) {
        setError(true);
        return false;
      }

      let response = await axiosInstance.post("/admin/login", {
        email,
        password,
      });
      if (response.data.auth) {
        localStorage.setItem("admin", JSON.stringify(response.data.admin));
        localStorage.setItem("adminToken", JSON.stringify(response.data.auth));
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-pink-200 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-800 text-center">
              LOGIN
            </h1>
            {serverError && (
              <span className="mt-1 mb-1 p-2 text-gray-800 bg-red-500 font-medium block ml-0">
                {message}
              </span>
            )}
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
                {error && !emailRegex.test(email) && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid email address.
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-800"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {error && !passwordRegex.test(password) && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    Please enter a valid password.
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleLogin}
                className="w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
