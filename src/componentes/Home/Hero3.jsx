import React from "react";
import bank from "../../assets/withdraw4.gif";
import bg1 from "../../assets/withdraw3.jpg";
import { Link } from "react-router-dom";

export default function Hero3() {
  return (
    <div>
      <div
        className="slide5 bg-fixed"
        style={{
          backgroundImage: `url(${bg1})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-wrap-reverse justify-center p-4 sm:p-10 py-10 sm:py-10 items-center bg-[#243c5dde]">
          <div className="w-[100%] sm:w-[45%]  flex ">
            <img alt="img" src={bank} className="rounded-[40px] m-auto" />
          </div>
          <div className="w-[100%] sm:w-[45%] text-center text-white">
            <p className="text-5xl text-center font-bold mb-6 ">
              Now You Can Withdraw Money Easily
            </p>
            <Link
              to={"/login"}
              class="relative mb-6 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-[#683ab6] rounded-xl group"
            >
              <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
              </span>
              <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-[#683ab6] rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
              <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                Try Now !
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
