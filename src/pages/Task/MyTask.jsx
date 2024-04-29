/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import likeicon from "../../assets/like.png";
import commenticon from "../../assets/comment.png";
import vidoicon from "../../assets/videoicon.png";

import CommentTask from "./CommentTask";
import VideoTask from "./VideoTask";
import LikeTask from "./LikeTask";
import {
  GetUserDetails,
  GetWinningByDate,
} from "../../controller/userController";
import { Link } from "react-router-dom";

export default function MyTask() {
  const [activeTab, setActiveTab] = useState(1);
  const [userData, seUsertData] = useState();
  const [loading, setLoading] = useState(true);
  const[winningByDate, setWinningByDate] = useState()

  const[walletLoading, setwalletloading] = useState(true)



  useEffect(() => {
    const getUserData = async () => {
      try {
        const fetchedData = await GetUserDetails();
        seUsertData(fetchedData.data[0]);
        setLoading(false);
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getUserData();
  }, []);


  useEffect(() => {
    const getWinningBydate = async () => {
      try {
        const fetchedData = await GetWinningByDate()
        setWinningByDate(fetchedData.data[0])
        setwalletloading(false)
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getWinningBydate();
  }, []);

  

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };
  return (
    <div>
      <div className="container m-auto w-[98vw] sm:w-[70vw]  rounded-lg pb-4 pt-4">
        <div className="flex justify-center justify-between m-auto  text-center align-center mt-4 gap-2 w-[98vw] sm:w-[70vw]">
          <Link
            to={"/winning-history"}
            className="dashboard-card-2 p-[5px] sm:p-[15px] w-[23%] cursor-pointer "
          >
            {" "}
            Today
            <p className="sm:text-2xl font-bold text-[#00bf63]  ">Rs.{ walletLoading ? "0" : (winningByDate.today).toFixed(2)}</p>
          </Link>
          <Link
            to={"/winning-history"}
            className="dashboard-card-2 p-[5px] sm:p-[15px] w-[23%] cursor-pointer "
          >
            {" "}
            Yesterday
            <p className="sm:text-2xl font-bold text-[#00bf63]  ">Rs.{walletLoading ? "0" : (winningByDate.yesterday).toFixed(2)}</p>
          </Link>
          <Link
            to={"/winning-history"}
            className="dashboard-card-2 p-[5px] sm:p-[15px] w-[23%] cursor-pointer "
          >
            {" "}
            Weekly
            <p className="sm:text-2xl font-bold text-[#00bf63]  ">Rs.{walletLoading ? "0" : (winningByDate.week).toFixed(2)}</p>
          </Link>
          <Link
            to={"/winning-history"}
            className="dashboard-card-2 p-[5px] sm:p-[15px] w-[23%] cursor-pointer "
          >
            {" "}
            Monthly
            <p className="sm:text-2xl font-bold text-[#00bf63]  ">Rs.{walletLoading ? "0" : (winningByDate.month).toFixed(2)}</p>
          </Link>
        </div>
      </div>

      <div className="container m-auto w-[98vw] sm:w-[70vw] bg-[#92b5ff] rounded-sm pb-4 pt-4">
        <div className="flex flex-wrap justify-center justify-between m-auto  text-center align-center mt-4 gap-2 w-[98vw] sm:w-[70vw]">
          <div
            className="task-card-1 p-[8px] sm:p-[15px] w-[47%] sm:w-[32%] cursor-pointer "
            onClick={() => changeTab(1)}
          >
            <img alt="img" src={likeicon} />
            <p className="sm:text-2xl font-bold text-black  ">Like Task</p>
          </div>
          <div
            className="task-card-1 p-[8px] sm:p-[15px] w-[47%] sm:w-[32%] cursor-pointer "
            onClick={() => changeTab(2)}
          >
            <img alt="img" src={commenticon} />
            <p className="sm:text-2xl font-bold text-black  ">Comment Task</p>
          </div>
          <div
            className="task-card-1 p-[8px] sm:p-[15px] w-[47%] sm:w-[32%] cursor-pointer "
            onClick={() => changeTab(3)}
          >
            <img alt="img" src={vidoicon} />
            <p className="sm:text-2xl font-bold text-black  ">Video Task</p>
          </div>
        </div>
      </div>

      <div className="container m-auto w-[98vw] sm:w-[70vw]  rounded-sm pb-4 pt-4 bg-[#92b5ff] px-4">
        <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
          <LikeTask userData={userData} />
        </div>

        <div className={`${activeTab === 2 ? "block" : "hidden"}`}>
          <CommentTask userData={userData} />
        </div>

        <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
          <VideoTask userData={userData} />
        </div>
      </div>
    </div>
  );
}
