/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg1 from "../assets/register-bg-1.jpg";
import { api } from "../config/api";
import swal from "sweetalert";
import logo from "../assets/logog.webp";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import {
  ForgetPassword,
  SendOtp,
  VerifyOtp,
} from "../controller/userController";

export default function ForgotPassword() {
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [otpVerifying, setOtpVerifying] = useState(false);

  const [forgetting, setForgetting] = useState(false);

  const [isOtpVerified, setOtpVerified] = useState(false);

  const [isOtpSent, setOtpSent] = useState(false);

  const [token, setToken] = useState();

  const [user, setUser] = useState({
    email: "",
    otp: "",
  });

  const [newPasswords, setNewPasswords] = useState({
    password: "",
    rePassword: "",
  });

  const ShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const sendOtp = async () => {
    if (!email) {
      setFormError("Please enter email.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError("Please enter a valid email address.");
      return;
    }
    setFormError("");
    try {
      const response = await SendOtp(email);
      if (response.status === true) {
        setFormError("OTP Sent to your email.");
        setOtpSent(true);
      }
    } catch (error) {
      setFormError("Something went wrong.");
    }
  };

  const handleVerifyOtp = async (e) => {
    setOtpVerifying(true);
    e.preventDefault();
    if (user.otp.length !== 4) {
      setFormError("Please enter a valid OTP");
      setOtpVerifying(false);
      return;
    }
    try {
      const formData = {
        email: user.email,
        otp: user.otp,
      };
      const response = await VerifyOtp(formData);
      if (response.status === true) {
        setFormError("");
        setToken(response.token);
        setOtpVerified(true);
        setOtpVerifying(false);
      } else {
        setFormError(response.msg);
        setOtpVerifying(false);
      }
    } catch (error) {
      setFormError("Something went wrong");
      setOtpVerifying(false);
    }
  };

  const handleForgotPassword = async (e) => {
    setForgetting(true);
    e.preventDefault();
    if (newPasswords.password !== newPasswords.rePassword) {
      setFormError("Password must be same in both fields.");
      setForgetting(false);
      return;
    } else if (newPasswords.password.length < 6) {
      setFormError("Password must be 6 digit long.");
      setForgetting(false);
      return;
    }
    try {
      const formData = {
        email: user.email,
        password: newPasswords.password,
        token: token,
      };
      const response = await ForgetPassword(formData);
      if (response.status === true) {
        setFormError("");
        setForgetting(false);
        swal({
          title: "Password Forget Success!",
          text: "Yeh!",
          icon: "success",
          buttons: false,
        });
        setNewPasswords({
          password: "",
          rePassword: "",
        });
        setTimeout(function () {
          window.location.href = "/login";
        }, 2000);
      }
    } catch (error) {
      setFormError("Something went wrong.");
      setForgetting(false);
    }
  };

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleDataChange2 = (e) => {
    const { name, value } = e.target;
    setNewPasswords({ ...newPasswords, [name]: value });
  };

  const { email, otp } = user;
  const { password, rePassword } = newPasswords;
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
              className="flex  flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
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
                  Forget Password
                </h1>
                <p className=" text-[red] "> {formError} </p>
                {isOtpVerified ? (
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleForgotPassword}
                  >
                    <div className="flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="New Passsword "
                        required
                        value={password}
                        onChange={handleDataChange2}
                      />
                      <FaEye
                        className=" ml-[-25px] cursor-pointer"
                        onClick={ShowPassword}
                      />
                    </div>
                    <div className="flex items-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="rePassword"
                        id="rePassword"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Re-Enter  "
                        required
                        value={rePassword}
                        onChange={handleDataChange2}
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-[green]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                    >
                      {forgetting ? "Processing..." : "Submit"}
                    </button>
                  </form>
                ) : (
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleVerifyOtp}
                  >
                    <div className="flex items-center">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Enter Email "
                        required
                        value={email}
                        onChange={handleDataChange}
                      />
                      <div
                        onClick={sendOtp}
                        className="ml-[-75px] cursor-pointer bg-[#7ce2ff] font-semibold p-1 rounded-lg text-sm"
                      >
                        {isOtpSent ? "OTP Sent" : "Send OTP"}
                      </div>
                    </div>

                    {isOtpSent ? (
                      <div className="flex items-center">
                        <input
                          type="number"
                          name="otp"
                          id="otp"
                          className="w-1/2 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter OTP "
                          required
                          value={otp}
                          onChange={handleDataChange}
                          onWheel={() => document.activeElement.blur()}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                              e.preventDefault();
                            }
                          }}
                        />
                      </div>
                    ) : (
                      ""
                    )}

                    <button
                      type="submit"
                      className="w-full text-white bg-[green]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                    >
                      {otpVerifying ? "Verifying..." : "Submit"}
                    </button>

                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      <Link
                        to={"/login"}
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login !
                      </Link>
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
