/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import usericon from "../../assets/user.png";
import "./dashboard.css";
import UpdateProfilePopup from "./DashboardPopups/UpdateProfilePopup";
import { MdCancel, MdVerified } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";
import SocialShare from "../../componentes/SocialShare";

// import { GetUserDetails } from "../../controller/userController";

export default function UserProfile({ userData, refreshParent }) {
  const userDetails = userData;

  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const togglePopup = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const closePopup = () => {
    togglePopup();
  };

  const textToCopy = `${window.location.origin}/register?referrer_code=${
    userDetails.reffer_code || ""
  }`;

  const handleCopy = () => {
    toast("Link copied. Share with your friends", {
      position: "bottom-right",
    });
    setIsCopied(true);
    setTimeout(function () {
      setIsCopied(false);
    }, 2000);
  };

  const [showShare, setShowShare] = useState(false);

  const openSocialShare = () => {
    setShowShare(true);
  };

  const closeSocialShare = () => {
    setShowShare(false);
  };

  return (
    <div>
      <div className="container m-auto w-[98vw] sm:w-[70vw]">
        <div className="flex   m-auto bg-[#bebbff]  align-center justify-between p-6 mt-2 rounded-lg">
          <div className="w-[30%] sm:w-[20%] bg-[#b993ff] sm:bg-[#b993ff00] flex flex-col justify-around rounded-lg">
            <img
              alt="user"
              src={usericon}
              className="w-[90%] md:w-[60%] rounded-full m-auto mt-1/2 mb-1/2 "
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
                    onClick={() => {
                      togglePopup();
                      refreshParent();
                    }}
                    className="absolute top-0 right-0 cursor-pointer text-gray-700"
                  >
                    <MdCancel className="w-6 h-6 m-1 text-black" />
                  </button>
                  <UpdateProfilePopup
                    data={userDetails}
                    closePopup={closePopup}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-[65%]  sm:w-[80%] ">
            <div className="text-xl font-semibold user-detail-1 flex">
              {userDetails && userDetails.uname}
              <MdVerified className=" mt-1 ml-1" color="blue" />
            </div>
            <div className="user-detail-1">
              UID : {userDetails && userDetails.uid}
            </div>

            <div className="block md:hidden user-detail-1">
              Email:
              {userDetails &&
                userDetails.email &&
                (userDetails.email.length > 10
                  ? `${userDetails.email.substring(0, 12)}...`
                  : userDetails.email)}
            </div>
            <div className="hidden md:block user-detail-1">
              Email:
              {userDetails && userDetails.email}
            </div>

            <div className="user-detail-1">
              Mobile : {userDetails && userDetails.mobile}
            </div>
            <div className="user-detail-1 flex ">
              Referral : {userDetails && userDetails.reffer_code}
              <FaLink
                onClick={openSocialShare}
                className=" mt-1 ml-1 cursor-pointer"
                color="red"
                size={18}
              />
            </div>
            <ToastContainer />
            {showShare && (
              <SocialShare
                url={`${window.location.origin}/register?referrer_code=${userDetails.reffer_code}`}
                onClose={closeSocialShare}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
