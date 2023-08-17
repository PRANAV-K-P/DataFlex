import React, { useState, useEffect } from "react";
import axiosInstance from "../../../api/axiosInstance";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [regexError, setRegexError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const nameRegex = /^\S[a-zA-Z]*(\s[a-zA-Z]+)*\s?\S[a-zA-Z]*$/;
  const emailRegex = /^\s*([a-zA-Z0-9]+@[a-z]+\.[a-z]{2,3})\s*$/i;
  const phoneRegex = /^\d{10}$/;
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

  const check = () => {
    if (
      !nameRegex.test(name) ||
      !emailRegex.test(email) ||
      !passwordRegex.test(password) ||
      password !== confirmPassword
    ) {
      setRegexError(true);
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      if (!name || !email || !gender || !password || !confirmPassword) {
        setError(true);
        return false;
      } else if (!check()) {
        return false;
      }

      let response = await axiosInstance.post("/users/register", {
        name,
        email,
        gender,
        password,
      });
      if (response.data) {
        navigate("/login");
      }
    } catch (err) {
      setServerError(true);
      setMessage(err.response.data.message);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-28 md:mb-16 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
              Sign up
            </h1>
            {serverError && (
              <span className="mt-1 mb-1 p-2 text-white bg-red-500 font-medium block ml-0">
                {message}
              </span>
            )}
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={check}
                  placeholder="Enter full name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {error && !name && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    *Name cannot be empty.
                  </span>
                )}
                {regexError && !nameRegex.test(name) && name && (
                  <span className="mt-1 text-yellow-500 font-medium block ml-0">
                    Invalid Name!
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={check}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter email address"
                  required
                />
                {error && !email && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    *Email cannot be empty.
                  </span>
                )}
                {regexError && !emailRegex.test(email) && email && (
                  <span className="mt-1 text-yellow-500 font-medium block ml-0">
                    Invalid email address!
                  </span>
                )}
              </div>




              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Gender
                </label>
                <div className="flex space-x-4">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      // checked={gender === "male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="text-primary-600 form-radio focus:ring-primary-600"
                    />
                    <span className="ml-2 text-sm font-medium text-white">Male</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      // checked={gender === "female"} 
                      onChange={(e) => setGender(e.target.value)}
                      className="text-primary-600 form-radio focus:ring-primary-600"
                    />
                    <span className="ml-2 text-sm font-medium text-white">Female</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      // checked={gender === "other"}
                      onChange={(e) => setGender(e.target.value)}
                      className="text-primary-600 form-radio focus:ring-primary-600"
                    />
                    <span className="ml-2 text-sm font-medium text-white">Other</span>
                  </label>
                </div>
                {error && !gender && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    * Gender is required.
                  </span>
                )}
              </div>




              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={check}
                  placeholder="Enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {error && !password && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    *Password cannot be empty.
                  </span>
                )}
                {regexError && !passwordRegex.test(password) && password && (
                  <span className="mt-1 text-yellow-500 font-medium block ml-0">
                    * Requires: 6+ characters, 1 num, 1 special, 1 lower, 1
                    upper.
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={check}
                  placeholder="Re-enter password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {error && !confirmPassword && (
                  <span className="mt-1 text-red-500 font-medium block ml-0">
                    *Confirm password cannot be empty.
                  </span>
                )}
                {regexError &&
                  password !== confirmPassword &&
                  confirmPassword && (
                    <span className="mt-1 text-yellow-500 font-medium block ml-0">
                      Passwords don't match.
                    </span>
                  )}
              </div>
              <div className="flex items-start"></div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-orange-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-blue-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary-600 hover:underline text-white"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
