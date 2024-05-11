/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg1 from "../assets/register-bg-1.jpg";
import { api } from "../config/api";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";
import { CheckUserExistance, SendOtp } from "../controller/userController";
import RegsiterOtpVerfy from "../controller/RegisterOtpVerify";
import CreatingLoader from "../componentes/Loader/CreatingLoader";
import { FaEye } from "react-icons/fa";

export default function Register() {
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);
  const [goAhead, setGoAhead] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const ShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleGoBack = () => {
    setGoAhead(false);
  };

  const location = useLocation();

  const getQueryParam = (name) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(name);
  };

  const refferCode = getQueryParam("reffer_code");

  const [user, setUser] = useState({
    user_name: "",
    mobile: "",
    password: "",
    reffer_by: refferCode || "5Zw8gbwv",
    email: "",
    rePassword: "",
  });

  const register = async (e) => {
    e.preventDefault();
    setCreating(true);
    if (user.user_name === "" || user.user_name.length < 3) {
      setFormError("Username required");
      setCreating(false);
      return;
    } else if (user.email === "") {
      setFormError("Email id required");
      setCreating(false);
      return;
    } else if (user.mobile === "" || user.mobile.length < 10) {
      setFormError("Please enter valid mobile number.");
      setCreating(false);
      return;
    } else if (user.password.length < 6) {
      setFormError("Password should be more then 6 letters");
      setCreating(false);
      return;
    } else if (user.rePassword !== user.password) {
      setFormError("Password didn't match.");
      setCreating(false);
      return;
    }
    try {
      const response = await CheckUserExistance(user);
      if (response) {
        if (response.status === true) {
          const otpSendResponse = await SendOtp(email);
          if (otpSendResponse.status === true) {
            setFormError("");
            setCreating(false);
            setGoAhead(true);
          }
        } else {
          setFormError(response.message);
          setCreating(false);
          return;
        }
      } else {
        setCreating(false);
        return;
      }
    } catch (error) {
      setFormError("Something went wrong.");
      setCreating(false);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { user_name, mobile, password, reffer_by, email, rePassword } = user;

  return (
    <div className="pt-[64px]">
      <div
        className="bg-no-repeat	bg-cover "
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="flex flex-col items-center  bg-[#c2efffb0] justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div
            className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
            style={{ boxShadow: "3px 5px 15px 5px #6b6b6b" }}
          >
            {goAhead ? (
              <RegsiterOtpVerfy userData={user} goBack={handleGoBack} />
            ) : (
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Your Account
                </h1>
                <p className="text-[red]">{formError}</p>
                <form className="space-y-4 md:space-y-6" onSubmit={register}>
                  <div>
                    <input
                      type="text"
                      name="user_name"
                      id="user_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="User name"
                      required=""
                      value={user_name}
                      onChange={handleDataChange}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="user@gmail.com"
                      required=""
                      value={email}
                      onChange={handleDataChange}
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      name="mobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="+91-xxxxxxxxxx"
                      required=""
                      value={mobile}
                      onChange={handleDataChange}
                    />
                  </div>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={password}
                      onChange={handleDataChange}
                    />
                    <FaEye
                      className="mt-3 ml-[-25px] cursor-pointer"
                      onClick={ShowPassword}
                    />
                  </div>
                  <div className="flex">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="rePassword"
                      id="rePassword"
                      placeholder="Re-enter Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={rePassword}
                      onChange={handleDataChange}
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="reffer_by"
                      id="reffer_by"
                      placeholder="Referral code"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={reffer_by}
                      onChange={handleDataChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-[green]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                  >
                    {creating ? <CreatingLoader /> : "Register Now !"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account{" "}
                    <Link
                      to={"/login"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login here
                    </Link>
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
