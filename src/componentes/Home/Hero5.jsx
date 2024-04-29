import React from "react";
import MaximizedEarnings from "../Compare Pics/Maximized Earnings.png";
import Variety from "../Compare Pics/Task Variety.png";
import Sooners from "../Compare Pics/Get Your Money Sooners.png";
import Trust from "../Compare Pics/trust.png";
import bg1 from "../../assets/bg-4.avif"


function Hero5() {
  const data = [
    {
      id: 1,
      title: "Maximized Earnings",
      icon: MaximizedEarnings,
      text: " Earn more money for the tasks you complete. With higher payouts, your efforts translate into more significant rewards, helping you reach your financial goals faster.",
    },
    {
      id: 2,
      title: "Task Variety Tailored to You",
      icon: Variety,
      text: " Enjoy a diverse range of tasks that match your interests and skills. Whether you prefer Like a post, comment, watching videos, there's something for everyone.",
    },
    {
      id: 3,
      title: "Get Your Money Sooners",
      icon: Sooners,
      text: "Receive your earnings quickly and hassle-free. With fast payouts, you can access your money without delay, providing flexibility in managing your finances.",
    },
    {
      id: 4,
      title: "Trust and Transparency",
      icon: Trust,
      text: "Feel confident knowing exactly what to expect. Our platform prioritizes transparency, ensuring clear communication, payout structures, and terms of service.",
    }
  ];

  return (
    <div style={{ backgroundImage: `url(${bg1})`, backgroundRepeat:"no-repeat", backgroundSize:"cover" }}>
      <div className="slide7 mb-10  pb-10 bg-[#243c5dde]">
        <p className="text-center text-white font-bold py-10 text-4xl px-10 sm:text-5xl md:py-20">
          Why We are Better than others?
        </p>
        <div className="md:pb-10 gap-2 items-center justify-center text-center  flex flex-wrap">
          {data &&
            data.map((item, index) => (
              <div className="w-[88%] sm:w-[20%] block  rounded-lg bg-gray-200 text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white h-90 sm:h-96 ">
                <div className="relative overflow-hidden bg-[#9fd4ff] rounded-lg pb-[14px] bg-cover bg-no-repeat">
                  <img
                    className="w-20 h-20 mx-auto pt-5"
                    src={item.icon}
                    alt=""
                  />
                </div>
                <div class="p-6">
                  <p className="font-bold text-2xl pb-2"> {item.title} </p>
                  <p className="font-semibold text-justify">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Hero5;
