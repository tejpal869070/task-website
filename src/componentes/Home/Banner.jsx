import React from "react";
import { Link } from "react-router-dom";

function Banner() {
  return (
    <div>
      <div className="bg-fullimg bg-cover bg-no-repeat bg-center h-[80vh] text-white items-center  ">
        <div className=" slide1Left flex flex-col justify-center items-center h-[80vh]  text-2xl   font-semibold px-3 text-center bg-[#000000a8]">
          <div>
            <p className=" text-4xl sm:text-5xl p-0 sm:px-[10rem]  " style={{lineHeight:"54px", filter:"drop-shadow(white 0px 0px 14px)"}} >
              Unlock the path to earning with
              <span style={{ color: "yellow" }} className=""> zero Investment!</span> Start
              now and Grow your Money!
            </p>
            <p className="animate-pulse	lg:text-xl text-sm pt-5 ">
              All you Need is PC/Mobile and Internet Connection.
            </p>
            <Link   to={"/dashboard"} class="relative inline-block text-lg group mt-6">
              <span class="relative z-10 block px-5 py-3 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 group-hover:border-2 group-hover:border-white  rounded-lg group-hover:text-white">
                <span class="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
                <span class="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-[green]  group-hover:-rotate-180 ease"></span>
                <span  class="relative"> Start Earning! </span>
              </span>
              <span
                class="absolute bottom-0 right-0 w-full h-12 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-[green] rounded-lg group-hover:mb-0 group-hover:mr-0"
                data-rounded="rounded-lg"
              ></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
