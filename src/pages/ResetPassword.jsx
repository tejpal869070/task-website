/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import bg1 from "../assets/reset-bg.jpg";
import { ChangePassword } from "../controller/userController";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const [formError, setFormError] = useState();
  const [resetting, setReset] = useState(false);

  const sessionMobile = sessionStorage.getItem("mobile")

  const [user, setUser] = useState({
    mobile: "",
    password: "",
    new_password: "",
  });

  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const resetPassord = async(e) => {
    e.preventDefault();
    setReset(true);
    if (user.password.length < 6) {
      setFormError("Old password must be more then 6");
      setReset(false);
      return;
    } else if (user.mobile !== sessionMobile) {
      setFormError("Mobile incorrect");
      setReset(false);
      return;
    } else if (user.new_password.length < 6) {
      setFormError("New password must be more then 6");
      setReset(false);
      return;
    }

    try {
        const response = await ChangePassword(user)
        if(response.error === false){
          swal({
            title: "Password reset success!",
            text: "Yeh!",
            icon: "success",
          });
            setReset(false)
            sessionStorage.clear()
            setTimeout(function () {
              window.location.href = "/login";
            }, 2000);
        } else{
            setFormError(response.message)
            setReset(false)
        }
    } catch (error) {
        setReset(false)
        setFormError("Something went wrong")
    }
  };

  const { mobile, password, new_password } = user;
  return (
    <div>
      <section
        className="bg-no-repeat	bg-cover "
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full p-6 bg-[#ffffff63] rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
            <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Change Password
            </h2>
            <p className="text-[red]"> {formError} </p>
            <form
              class="mt-4 space-y-4 lg:mt-5 md:space-y-5"
              onSubmit={resetPassord}
            >
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+91-9876543210"
                  required=""
                  value={mobile}
                  onChange={handleDataChange}
                />
              </div>
              <div>
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Old Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={password}
                  onChange={handleDataChange}
                />
              </div>
              <div>
                <label
                  for="new_password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  New Password
                </label>
                <input
                  type="password"
                  name="new_password"
                  id="new_password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  value={new_password}
                  onChange={handleDataChange}
                />
              </div>

              <button
                type="submit"
                class="w-full text-white bg-[blue] hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {resetting ? "Processing..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
