/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import deposit from "../../assets/deposit.png";
import withdraw from "../../assets/withdraw.png";
import transection from "../../assets/transection.png";
import refer from "../../assets/referel.png";
import vip from "../../assets/vip.png";
import "./dashboard.css";
import UserProfile from "./UserProfile";
import Deposit from "./Deposit";
import Withdraw from "./Withdraw";
import History from "./History";
import Vip from "./Vip";
import Refers from "./Refers";
import { GetUserDetails } from "../../controller/userController";
import Try from "../../componentes/Loader/Try";
import Loading1 from "../../componentes/Loader/Loading1";
import { Link } from "react-router-dom";
import { IoDocumentText } from "react-icons/io5";
import { GrRefresh } from "react-icons/gr";





export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(1);
  const [userData, seUsertData] = useState();
  const [loading, setLoading] = useState(true);

  const [dataChange, setDataChange] = useState(true);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
    setDataChange(tabNumber);
  };

  const getUserData = async () => {
    try {
      const fetchedData = await GetUserDetails();
      seUsertData(fetchedData.data[0]);
      setLoading(false);
    } catch (error) {
      window.location.href="/login"
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const refresh = () => {
    getUserData();
  };

  const refreshParent =()=>{
    getUserData();
  }

  return (
    <div className="pt-[64px]">
      {loading ? (
        <Loading1/>
      ) : (
        <div>
          <UserProfile userData={userData} refreshParent={refreshParent}/>

          <div className="container m-auto w-[98vw] sm:w-[70vw]  rounded-lg pb-4 pt-4">
            <div className="flex justify-between bg-[#bebbff] py-2 rounded-lg px-2">
              <div className="font-bold flex">
                Wallet Balance : Rs.
                {userData && Number(userData.wallet_balance).toFixed(2)} <GrRefresh onClick={getUserData} className="ml-1 mt-1 font-bold cursor-pointer"/>
              </div>
              <Link to={"/winning-history"} className="font-bold flex">
                Winning Points : Rs.
                {userData && Number(userData.winning_balance).toFixed(2)} <IoDocumentText className="mt-1 ml-1 "/>
              </Link>
            </div>
            <div className="flex justify-center justify-between m-auto  text-center align-center mt-4 gap-2 w-[98vw] sm:w-[70vw] ">
              <div
                className="dashboard-card-1 w-[17%] sm:w-[19%] cursor-pointer text-xs sm:text-[16px] p-[5px] sm:p-[15px]"
                onClick={() => changeTab(1)}
              >
                {" "}
                <img alt="icon" src={deposit} className=" w-8 sm:w-12" />{" "}
                Deposit
              </div>
              <div
                className="dashboard-card-1 w-[17%] sm:w-[19%] cursor-pointer text-xs sm:text-[16px] p-[5px] sm:p-[15px]"
                onClick={() => changeTab(2)}
              >
                {" "}
                <img alt="icon" src={withdraw} className=" w-8 sm:w-12" />{" "}
                Withdraw
              </div>
              <div
                className="dashboard-card-1 w-[17%] sm:w-[19%] cursor-pointer text-xs sm:text-[16px] p-[5px] sm:p-[15px]"
                onClick={() => changeTab(3)}
              >
                {" "}
                <img
                  alt="icon"
                  src={transection}
                  className=" w-8 sm:w-12"
                />{" "}
                History
              </div>
              <div
                className="dashboard-card-1 w-[17%] sm:w-[19%] cursor-pointer text-xs sm:text-[16px] p-[5px] sm:p-[15px]"
                onClick={() => changeTab(4)}
              >
                {" "}
                <img alt="icon" src={vip} className=" w-8 sm:w-12" /> VIP
              </div>
              <div
                className="dashboard-card-1 w-[17%] sm:w-[19%] cursor-pointer text-xs sm:text-[16px] p-[5px] sm:p-[15px]"
                onClick={() => changeTab(5)}
              >
                {" "}
                <img alt="icon" src={refer} className=" w-8 sm:w-12" /> Referral
              </div>
            </div>
          </div>

          <div className="container m-auto w-[98vw] sm:w-[70vw]  rounded-lg pb-4 pt-4 bg-[#bebbff]">
            <div className={`${activeTab === 1 ? "block" : "hidden"}`}>
              <Deposit />
            </div>

            <div className={`${activeTab === 2 ? "block" : "hidden"}`}>
              <Withdraw userData={userData} refreshEarnings={refresh} dataChange={dataChange}/>
            </div>

            <div className={`${activeTab === 3 ? "block" : "hidden"}`}>
              <History dataChange={dataChange} refreshEarnings={refresh}/>
            </div>

            <div className={`${activeTab === 4 ? "block" : "hidden"}`}>
              <Vip userData={userData} />
            </div>

            <div className={`${activeTab === 5 ? "block" : "hidden"}`}>
              <Refers userData={userData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
