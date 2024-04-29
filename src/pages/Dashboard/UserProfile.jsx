/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import usericon from "../../assets/user.jpg";
import "./dashboard.css";
import UpdateProfilePopup from "./DashboardPopups/UpdateProfilePopup";
import { MdCancel } from "react-icons/md";

// import { GetUserDetails } from "../../controller/userController";

export default function UserProfile({ userData }) {
  const userDetails = userData;

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="container m-auto w-[98vw] sm:w-[70vw]">
        <div className="flex   m-auto bg-[#bebbff]  align-center justify-between p-6 mt-2 rounded-lg">
          <div className="w-[35%] sm:w-[20%] bg-[#b993ff] sm:bg-[#b993ff00] flex flex-col justify-around rounded-lg">
            <img
              alt="user"
              src={usericon}
              className="w-[50%] rounded-full m-auto mt-1/2 mb-1/2 "
            />
            <div
              className="text-center font-semibold cursor-pointer"
              onClick={togglePopup}
            >
              Edit Profile
            </div>
            {isOpen && (
              <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999] bg-opacity-50">
                <div className="bg-[#ffffff17] p-8 rounded shadow-lg relative">
                  <button
                    onClick={togglePopup}
                    className="absolute top-0 right-0 cursor-pointer text-gray-700"
                  >
                    <MdCancel className="w-6 h-6 m-1 text-black" />
                  </button>
                  <UpdateProfilePopup data={userDetails} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[60%] sm:w-[80%] ">
            <div className="user-detail-1">
              UID : {userDetails && userDetails.uid}
            </div>
            <div className="user-detail-1">
              Name : {userDetails && userDetails.uname}
            </div>
            <div className="user-detail-1">
              Email : {userDetails && userDetails.email}
            </div>
            <div className="user-detail-1">
              Mobile : {userDetails && userDetails.mobile}
            </div>
            <div className="user-detail-1">
              Referral code : {userDetails && userDetails.reffer_code}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
