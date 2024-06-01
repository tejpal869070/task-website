/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg1 from "../assets/register-bg-1.jpg";
import { api } from "../config/api";
import swal from "sweetalert";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import logo from "../assets/logog.webp";
import { IoEyeOff } from "react-icons/io5";

export default function Login() {
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [user, setUser] = useState({
    mobile: "",
    password: "",
  });

  const ShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const login = async (e) => {
    e.preventDefault();
    setCreating(true);
    if (user.mobile === "" || user.mobile.length < 10) {
      setFormError("Mobile number required");
      setCreating(false);
      return;
    } else if (user.password.length < 6) {
      setFormError("Please enter a valid password");
      setCreating(false);
      return;
    }
    try {
      await fetch(`${api.API_URL}user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mobile: user.mobile,
          password: user.password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            setFormError("Something went wrong.");
            setCreating(false);
          }
          return response.json();
        })
        .then((response) => {
          if (response.status === true) {
            setCreating(false);
            Cookies.set("token", response.token);
            Cookies.set("mobile", response.mobile);
            swal({
              title: "Login Success!",
              text: "Yeh!",
              icon: "success",
              buttons: false,
            });
            setTimeout(function () {
              window.location.href = "/dashboard";
            }, 2000);
          }
          setFormError(response.message);
          setCreating(false);
        })
        .catch((error) => {
          setFormError("Server side error.");
          setCreating(false);
        });
    } catch (error) {
      setFormError("There was an error with the fetch operation:");
      setCreating(false);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const { mobile, password } = user;
  return (
    <div>
      <div className="pt-[64px]">
        <div
          className="bg-no-repeat	bg-cover "
          style={{ backgroundImage: `url(${bg1})` }}
        >
          <div className="flex flex-col items-center  bg-[#c2efffb0] justify-center px-6 py-8 mx-auto  lg:py-20">
            <a
              href="/"
              className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
              KMAOBHARAT
            </a>
            <div
              className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
              style={{ boxShadow: "3px 5px 15px 5px #6b6b6b" }}
            >
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <p className=" text-[red] "> {formError} </p>
                <form className="space-y-4 md:space-y-6" onSubmit={login}>
                  <div>
                    <input
                      type="number"
                      name="mobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter mobile "
                      required=""
                      value={mobile}
                      onChange={handleDataChange}
                      onWheel={() => document.activeElement.blur()}
                      onKeyDown={(e) => {
                        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>

                  <div className="flex ">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      value={[password]}
                      onChange={handleDataChange}
                    />
                    {showPassword ? (
                      <FaEye
                        className="mt-3 ml-[-25px] cursor-pointer"
                        onClick={ShowPassword}
                      />
                    ) : (
                      <IoEyeOff
                        className="mt-3 ml-[-25px] cursor-pointer"
                        onClick={ShowPassword}
                      />
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-[green]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                  >
                    {creating ? "Verifying..." : "Login"}
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don't have an account ?
                    <Link
                      to={"/register"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Create here
                    </Link>
                  </p>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    <Link
                      to={"/forgot-password"}
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Forgot Password ?
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
