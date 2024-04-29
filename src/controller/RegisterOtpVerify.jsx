import React, { useRef, useState } from "react";
import { VerifyOtp, userRegistration } from "./userController";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatingLoader from "../componentes/Loader/CreatingLoader";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function RegisterOtpVerify({ userData, goBack }) {
  const [otp, setOTP] = useState(Array(4).fill("")); // Array to store OTP values
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const [otpVerifying, setOtpVerifying] = useState(false);

  const handleChange = (index, event) => {
    const value = event.target.value;
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpVerifying(true);
    const enteredOTP = otp.join("");

    if (enteredOTP.trim() === "" || enteredOTP.length < 4) {
      setError("All fields are required");
      setOtpVerifying(false);
    } else {
      setError("");
      try {
        const response = await VerifyOtp({
          mobile: userData.mobile,
          otp: enteredOTP,
        });
        if (response.status === true) {
          const regsiterResponse = await userRegistration(userData);
          if (regsiterResponse.status === true) {
            setOtpVerifying(false);
            swal({
              title: "Registration Success!",
              text: "Yeh!",
              icon: "success",
              buttons: false,
            });
            setTimeout(function () {
              window.location.href = "/login";
            }, 2500);
          } else {
            swal({
              title: "Something went wrong !",
              text: "Error!",
              icon: "error",
            });
            setOtpVerifying(false);
          }
        } else {
          toast("Incorrect OTP !");
          setOtpVerifying(false);
        }
      } catch (error) {
        toast("Something went wrong.");
        setOtpVerifying(false);
      }
    }
  };
  return (
    <div>
      <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 rounded-lg">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-4">
            <div className="flex flex-col items-center justify-center  space-y-2">
              <div className="w-full flex cursor-pointer">
                <p
                  onClick={goBack}
                  className="bg-[#9ecfff] font-semibold text-left   px-2 rounded-lg"
                >
                  {" "}
                  <span>
                    <IoMdArrowRoundBack className="inline mt-[-3px] " />
                  </span>{" "}
                </p>
              </div>
              <div className="font-semibold text-3xl mb-4">
                <p>Mobile Verification</p>
              </div>
              <div className="flex flex-row text-sm font-medium text-gray-400">
                <p>We have sent a code to your mobile {userData.mobile}</p>
              </div>
              {error && <div className="text-red-500 ">{error}</div>}
            </div>

            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-between mx-auto mt-4 w-full max-w-xs">
                  {otp.map((digit, index) => (
                    <div className="w-16 h-16" key={index}>
                      <input
                        ref={(ref) => (inputRefs.current[index] = ref)}
                        className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-2 border-[#656363] text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="number"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e)}
                      />
                    </div>
                  ))}
                </div>

                <div className="flex">
                  <button
                    type="submit"
                    className="w-[82%] m-auto text-white mt-6 bg-[green]  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center   dark:focus:ring-primary-800"
                  >
                    {otpVerifying ? <CreatingLoader /> : "Verify"}
                  </button>
                </div>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
