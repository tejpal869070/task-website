import React from "react";
import pic2 from "../Compare Pics/pic2.png";
import pic1 from "../Compare Pics/pic1.png";
import pic3 from "../Compare Pics/pic3.png";
import CountUp from "react-countup";

export default function Hero2() {
  const data = [
    {
      id: 1,
      img: pic1,
      name: "RAM",
      desc: " Impressive earning potential and diverse tasks. My favorite platform for extra income",
    },
    {
      id: 2,
      img: pic2,
      name: "Anita",
      desc: " Thanks for the user-friendly experience and fast payouts. Keep it up!",
    },
    {
      id: 3,
      img: pic3,
      name: "Santosh",
      desc: " Appreciate the transparency and trustworthiness. Peace of mind while earning!",
    },
    {
      id: 4,
      img: pic1,
      name : "Rajesh",
      desc: "ove the supportive community vibe. Makes earning even more enjoyable!"
    },
    {
      id: 1,
      img: pic1,
      name: "RAM",
      desc: " Impressive earning potential and diverse tasks. My favorite platform for extra income",
    },
    {
      id: 2,
      img: pic2,
      name: "Anita",
      desc: " Thanks for the user-friendly experience and fast payouts. Keep it up!",
    },
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center text-center items-center container py-10">
        <div className="w-[95%] sm:w-[45%] rounded-lg ">
          <div className=" bg-[#0069ff1c] py-4  w-80 md:w-96 h-[500px] m-auto rounded-lg overflow-hidden px-5 py-5 ">
            <div className="flex flex-col justify-between">
              <p className="text-4xl font-bold mb-4">JOIN OUR COMMUNITY</p>
              <div className=" font-semibold flex flex-col mx-auto text-center items-center ">
                <div className="slide4InfoSubDiv">
                  <p>
                    <CountUp end={24576} duration={15} />+
                  </p>
                  <p className="text-black">Active Users</p>
                </div>
                <div className="slide4InfoSubDiv">
                  <p>
                    RS <CountUp end={553142} duration={15} />+
                  </p>
                  <p className="text-black">WITHDRAWAL</p>
                </div>
                <div className="slide4InfoSubDiv">
                  <p>
                    <CountUp end={200} duration={15} />+
                  </p>
                  <p className="text-black">COUNTRIES</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[95%] sm:w-[45%] ">
          <div className="comments bg-white  w-80 md:w-96 h-[500px] border-4 border-green-300 m-auto rounded-lg overflow-hidden px-5 py-5 ">
            <div className="mega-comment">
              {data &&
                data.map((item, index) => (
                  <div className="comment1 ">
                    <div class="items-center gap-4 bg-[#fbfbfb] py-3  rounded-lg px-2 mb-8" style={{boxShadow:"4px 4px 4px 4px black"}}>
                      <div className="flex items-center">
                        <img class="w-20 h-20 rounded-full" src={item.img} alt="" />
                        <div class="font-medium dark:text-white">
                          <div className="text-2xl pl-5 font-bold">
                            {item.name}
                          </div>
                        </div>
                      </div>
                      <div>
                        <div class="text-md pt-2  dark:text-gray-400">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
