/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { UpdateUserDetail } from "../../../controller/userController";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UpdateProfilePopup({ data, closePopup }) {
  const [isUpdating, setIsUpdating] = useState(false);
  

  const [formError, setFormError] = useState("");

  const [formData, setFormData] = useState({
    uname: data.uname,
    upi_id: data.upi_id,
    bank_name: data.bank_name,
    ifsc_code: data.ifsc_code,
    ac_no: data.ac_no,
    ac_name: data.ac_name,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsUpdating(true);

    if (formData.ifsc_code ==="" || formData.ifsc_code.charAt(4) !== "0" || formData.ifsc_code.length !== 11) {
      setFormError("Please enter valid IFSC Code");
      setIsUpdating(false);
      return;
    } 
    const response = await UpdateUserDetail(formData);
    if (response) {
      if (response.status === true) {
        toast("Profile updated successfully.", {
          position: "bottom-right",
        });
        
        setIsUpdating(false);
        setTimeout(function () {
          closePopup();
        }, 1500);
      } else {
        window.alert("Response error");
        setIsUpdating(false);
      }
    } else {
      window.alert("Something Went wrong");
      setIsUpdating(false);
    }
  }; 

  return (
    <div>
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center  mx-auto  lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Update your profile
              </h1>
              <p className="text-[red]"> {formError} </p>
              <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="flex gap-2 flex-wrap">
                  <div className="w-[97%] sm:w-[48%]">
                    <label
                      for="upi_id"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bank Account Holder
                    </label>
                    <input
                      type="text"
                      name="ac_name"
                      id="ac_name"
                      placeholder=""
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.ac_name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-[97%] sm:w-[48%]">
                    <label
                      for="upi_id"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bank Name
                    </label>
                    <input
                      type="text"
                      name="bank_name"
                      id="bank_name"
                      placeholder=""
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.bank_name}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <div className="w-[97%] sm:w-[48%]">
                    <label
                      for="upi_id"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Bank Account Number
                    </label>
                    <input
                      type="number"
                      name="ac_no"
                      id="ac_no"
                      placeholder=""
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.ac_no}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="w-[97%] sm:w-[48%]">
                    <label
                      for="upi_id"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      IFSC code
                    </label>
                    <input
                      type="text"
                      name="ifsc_code"
                      id="ifsc_code"
                      placeholder=""
                      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      value={formData.ifsc_code}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full text-white bg-[#00bf63] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {isUpdating ? "Updating..." : "Update"}
                </button>
                <ToastContainer />
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
