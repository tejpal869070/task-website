/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { BuyPlan } from "../../../controller/userController";
import { ToastContainer, toast } from "react-toastify";

export default function BuyPlanPopup({ item, closePlanPopup }) {
  const [isBuying, setIsBuying] = useState(false);
  const [isBought, setIsBought] = useState("no");

  const handlePlanBuy = async (item) => {
    setIsBuying(true);
    try {
      const response = await BuyPlan(item);
      if (response) {
        if (response.status === true) {
          setIsBuying(false);
          setIsBought("yes");
        } else {
          toast("Please check your account balance.");
          setIsBuying(false);
        }
      } else {
        setIsBuying(false);
        window.alert("No response form server");
      }
    } catch (error) {
      toast("Please check you wallet balance or try again.", {
        position: "bottom-right",
      });
      setIsBuying(false);
    }
  };
  return (
    <div>
      {isBought === "yes" ? (
        <div className="text-center">
          <p className="font-bold text-[green]">Plan Bought</p>
          <p className="font-bold">Thanks for choosing new plan</p>
          <p onClick={closePlanPopup} className="px-10 py-2 rounded-lg bg-[green] font-semibold mt-4 text-white cursor-pointer inline-block">
            OK
          </p>
        </div>
      ) : (
        <div
          className={`flex flex-col items-center bg-[#e5dfff] p-8 rounded-lg shadow-lg max-w-sm`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
          ></svg>
          <p className="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded"></p>
          <div>
            <h2 className={`font-extrabold text-3xl text-center mb-2 `}>
              {item.name}
            </h2>
            <p className="opacity-60 text-center">
              In this {item.name} plan you can earn upto
            </p>
            <div className="flex flex-col items-center my-8 mt-4">
              <p className="font-extrabold text-4xl text-[#046f17]">
                ₹{item.earn_upto}
              </p>
              <p className="text-sm opacity-60">/month</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <p className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <b> {item.total_video} Videos task </b>
            </p>
            <p className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <b> {item.total_like} Like task </b>
            </p>
            <p className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <b> {item.total_comment} Comment task </b>
            </p>

            <p className="flex items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="w-4 h-4 mr-2"
              >
                <path
                  fill-rule="evenodd"
                  d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              {item.name === "Gold" ? "Quick call support" : "Basic support"}
            </p>
            {item.name === "Gold" ? (
              <div>
                <p className="flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 mr-2"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Instant deposit & withdrawal
                </p>
              </div>
            ) : (
              <p className="invisible">Hii</p>
            )}
            <div className="flex justify-center mt-8 ">
              <button
                onClick={() => handlePlanBuy(item)}
                disabled={isBuying}
                className="border px-4 py-2 bg-[#00bf63] text-white font-semibold border-violet-400 border-4  rounded-xl"
              >
                {isBuying ? "Processing..." : `Buy ₹${item.price}/month`}
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}
