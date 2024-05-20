/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import {
  BuyPlan,
  GetPlanBuyHistory,
  GetPlanDetails,
} from "../../controller/userController";
import { MdCancel } from "react-icons/md";
import BuyPlanPopup from "./DashboardPopups/BuyPlanPopup";
import PlanHistory from "./DashboardPopups/PlanHistory";

export default function Vip({ userData }) {
  const userDetails = userData;
  const [data, setData] = useState([]);
  const [planHistory, setPlanHistory] = useState([]);

  const [isPlanOpen, setIsPlanOpen] = useState(false);
  const [planDetail, setPlanDetail] = useState();

  const [videoTasks, setVideoTasks] = useState();
  const [likeTasks, setLikeTasks] = useState();
  const [commentTasks, setCommentTasks] = useState();
  const [earn_upto, setEarnUpto] = useState();

  const handlePlanBuy = useCallback(
    (item) => {
      setPlanDetail(item);
      setIsPlanOpen(!isPlanOpen);
    },
    [isPlanOpen]
  );

  const closePlanPopup =()=>{
    setIsPlanOpen(false);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedData = await GetPlanDetails();
        setData(fetchedData.data);
      } catch (error) {
      }
    };

    getData();
  }, [handlePlanBuy]);

  useEffect(() => {
    const getPlanHistory = async () => {
      try {
        const fetchedData = await GetPlanBuyHistory();
        setPlanHistory(fetchedData.data.reverse());
        setVideoTasks(
          fetchedData.data.filter(entry=>entry.status==="Active").reduce(
            (total, current) => total + parseFloat(current.total_video),
            0
          )
        );
        setLikeTasks(
          fetchedData.data.filter(entry=>entry.status==="Active").reduce(
            (total, current) => total + parseFloat(current.total_like),
            0
          )
        );
        setCommentTasks(
          fetchedData.data.filter(entry=>entry.status==="Active").reduce(
            (total, current) => total + parseFloat(current.total_comment),
            0
          )
        );
        setEarnUpto(
          fetchedData.data.filter(entry=>entry.status==="Active").reduce(
            (total, current) => total + parseFloat(current.earn_upto),
            0
          )
        );
      } catch (error) {
      }
    };

    getPlanHistory();
  }, [handlePlanBuy]);

  return (
    <div>
      <div className="px-2">
        <div className="bg-[#e5dfff] p-4 rounded-lg shadow-lg max-w-sm m-auto mt-2 ">
          <p className="text-center text-3xl font-bold">Your plan contains:</p>
          <div className="flex justify-center mt-4 mb-2">
            <p className="font-extrabold text-2xl text-[#046f17]">
              {" "}
              Rs.{earn_upto}
            </p>
            <p className="text-sm opacity-60 mt-2">/month</p>
          </div>
          <hr className="text-black bg-black border-1 border-black" />
          <p className="flex items-center text-center  text-sm mt-4">
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
            <b> {videoTasks} Videos tasks /day </b>
          </p>
          <p className="flex items-center text-center  text-sm">
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
            <b> {commentTasks} Comment tasks /day </b>
          </p>
          <p className="flex items-center text-center  text-sm">
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
            <b> {likeTasks} Likes tasks /day</b>
          </p>
        </div>
      </div>
      <div>
        <div className="grid lg:grid-cols-3 px-8 gap-10 text-zinc-800 mt-10">
          {data &&
            data.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col items-center bg-[#e5dfff] p-[1rem] rounded-lg shadow-lg max-w-sm ${
                  item.name === "Gold"
                    ? "bg-gradient-to-br from-blue-100 via-orange-100 to-purple-100 p-8 rounded-lg shadow-lg relative border-8 border-orange-200"
                    : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-20 h-20 absolute -top-11 -left-11 fill-red-400"
                >
                  {item.name === "Gold" ? (
                    <path
                      fill-rule="evenodd"
                      d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z"
                      clip-rule="evenodd"
                    ></path>
                  ) : (
                    ""
                  )}
                </svg>
                <p className="mono text-sm absolute -top-4 bg-red-400 text-zinc-100 py-0.5 px-2 font-bold tracking-wider rounded">
                  {item.name === "Gold" ? "POPULAR" : ""}
                </p>
                <div>
                  <h2
                    className={`font-extrabold text-3xl text-center mb-2 ${
                      item.name === "Gold" ? "text-[#c77900]" : "text-black"
                    }`}
                  >
                    {item.name}
                  </h2>
                  <p className="opacity-60 text-center">
                    In this {item.name} plan you can earn upto
                  </p>
                  <div className="flex flex-col items-center my-8 mt-4">
                    <p className="font-extrabold text-4xl text-[#046f17]">
                      {" "}
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
                    </svg>{" "}
                    {item.name === "Gold"
                      ? "Quick call support"
                      : "Basic support"}
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
                        </svg>{" "}
                        Instant deposit & withdrawal
                      </p>
                    </div>
                  ) : (
                    <p className="invisible">Hii</p>
                  )}
                  <div className="flex justify-center mt-8 ">
                    {item.name === "Free" ? (
                      ""
                    ) : (
                      <button
                        onClick={() => handlePlanBuy(item)}
                        className="border px-4 py-2 bg-[#00bf63] text-white font-semibold border-violet-400 border-4  rounded-xl"
                      >
                        Buy ₹{item.price}/month
                      </button>
                    )}
                  </div>
                  <div>
                    {isPlanOpen && (
                      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                        <div className="bg-white p-8 rounded shadow-lg relative">
                          <button
                            onClick={() => handlePlanBuy(null)}
                            className="absolute top-0 right-0 cursor-pointer text-gray-700"
                          >
                            <MdCancel className="w-6 h-6 m-1" />
                          </button>
                          <BuyPlanPopup item={planDetail} closePlanPopup={closePlanPopup} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="p-2">
        <p className="text-center text-2xl font-semibold mt-6 mb-6 ">
          Your plan history:
        </p>
        <PlanHistory planHistory={planHistory} />
      </div>
    </div>
  );
}
