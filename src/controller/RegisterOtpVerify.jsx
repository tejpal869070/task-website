import React, { useState } from "react";
import { SendOtp, VerifyOtp, userRegistration } from "./userController";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreatingLoader from "../componentes/Loader/CreatingLoader";
import { IoMdArrowRoundBack } from "react-icons/io";
import OTPInput from "otp-input-react";

export default function RegisterOtpVerify({ userData, goBack }) {
  const [otp, setOTP] = useState("");
  const [error, setError] = useState("");

  const [otpVerifying, setOtpVerifying] = useState(false);

  
  const resendOtp = async () => {
    try {
      const response = await SendOtp(userData.email);
      if (response.status === true) {
        setError("OTP Sent to your email.");
      }
    } catch (error) {
      setError("Something went wrong.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOtpVerifying(true);

    if (otp.length !== 4) {
      setError("All fields are required");
      setOtpVerifying(false);
    } else {
      setError("");
      try {
        const response = await VerifyOtp({
          email: userData.email,
          otp: otp,
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
          toast.error("Incorrect OTP !", {
            position: "bottom-right",
          });
          setOtpVerifying(false);
        }
      } catch (error) {
        toast.error("Something went wrong !", {
          position: "bottom-right",
        });
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
                  <span>
                    <IoMdArrowRoundBack className="inline mt-[-3px] " />
                  </span>
                </p>
              </div>
              <div className="font-semibold text-3xl mb-4">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-row text-center text-sm font-medium text-gray-400">
                <p>Code sent to {userData.email}</p>
              </div>
              {error && (
                <div className="text-red-500 font-semibold ">{error}</div>
              )}
            </div>

            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-row items-center justify-between mx-auto mt-4 w-full max-w-xs">
                  <OTPInput
                    value={otp}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={4}
                    otpType="number"
                    disabled={false}
                    inputClassName="rounded-lg p-2"
                    className="w-full m-auto  flex items-center justify-center"
                  />
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
              <p
                className="text-center font-semibold cursor-pointer mt-2"
                onClick={resendOtp}
              >
                Resend OTP !
              </p>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
