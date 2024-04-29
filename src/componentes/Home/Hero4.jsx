import React from "react";

function Hero4() {
  return (
    <div>
      <div className="slide6 lg:pt-10 text-center font-bold flex flex-col-reverse lg:flex-row lg:items-center   pb-10">
        <div className="slide6left lg:w-1/2 text-center font-sm">
          <div className="slide6leftdiv lg:ml-20 lg:w-4/6 ">
            <p className="lg:text-5xl text-3xl pb-5 leading-normal pt-10 px-5 lg:pt-0 lg:px-0">
              FOLLOW SIMPLE STEPS TO EARN REAL MONEY
            </p>
            <p className="animate-pulse text-2xl font-semibold text-green-500">
              JOIN OUR COMMUNITY{" "}
            </p>
          </div>
        </div>
        <div className="slide6right lg:w-1/2 text-center flex justify-center items-center lg:mr-20">
          <iframe
            title="none"
            className="w-11/12 h-96 mt-20 lg:mt-0 rounded-lg"
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default Hero4;
