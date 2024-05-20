/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaLink } from "react-icons/fa";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetReferData } from "../../controller/userController";
import Loading1 from "../../componentes/Loader/Loading1";
import { MdSwipeRightAlt } from "react-icons/md";
import SocialShare from "../../componentes/SocialShare";

export default function Refers({ userData }) {
  const [userDetails, setUserDetails] = useState(userData || {});
  const [loading, setLoading] = useState(true);
  const [refferHistory, setRefferHistory] = useState([]);

  const textToCopy = `${window.location.origin}/register?referrer_code=${
    userDetails.reffer_code || ""
  }`;

  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    toast("Link copied. Share with your friends", {
      position: "bottom-right",
    });
    setCopied(true);
  };

  const RefferlDetails = async () => {
    const response = await GetReferData();
    if (response.status === true) {
      setRefferHistory(response.data);
      setLoading(false);
    } else {
    }
  };

  useEffect(() => {
    RefferlDetails();
  }, []);

  const [showShare, setShowShare] = useState(false);

  const openSocialShare = () => {
    setShowShare(true);
  };

  const closeSocialShare = () => {
    setShowShare(false);
  };

  return (
    <div>
      <div className="mb-2 bg-[#b993ff] text-black font-semibold flex justify-center py-2">
        Refer you friend and earn on 3 levels.
        <p
          onClick={openSocialShare}
          className="px-4 bg-gray-300 rounded-lg cursor-pointer ml-1"
        >
          {" "}
          {isCopied ? "Copied" : "Copy"}{" "}
        </p>
      </div>
      <div className="px-2">
        <div class="relative overflow-x-scroll shadow-md  ">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  S.No.
                </th>
                <th scope="col" class="px-6 py-3">
                  UID
                </th>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Level
                </th>
                <th scope="col" class="px-6 py-3">
                  Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Commission
                </th>
              </tr>
            </thead>
            {loading ? (
              <Loading1 />
            ) : refferHistory.length === 0 ? (
              <h1 className="text-center w-full py-2 text-black flex">
                {" "}
                <MdSwipeRightAlt size={22} className="mr-2" /> You have no
                reffer history
              </h1>
            ) : (
              <tbody>
                {refferHistory &&
                  refferHistory.map((item, index) => (
                    <tr
                      class={`odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${
                        item.status === "Pending"
                          ? "text-[red]"
                          : "text-[green]"
                      }`}
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {index + 1}.
                      </th>
                      <td class="px-6 py-4"> {item.uid} </td>
                      <td
                        class={`px-6 py-4  flex align-center ${
                          item.status === "Pending"
                            ? "text-[red]"
                            : "text-[green]"
                        }`}
                      >
                        {item.username}
                        <span
                          className={`h-3 w-3 mt-1 ml-1 rounded-full ${
                            item.status === "Pending"
                              ? "bg-[red]"
                              : "bg-[green]"
                          }`}
                        ></span>
                      </td>
                      <td class="px-6 py-4">
                        {item.level === "level_1"
                          ? "1"
                          : item.level === "level_2"
                          ? "2"
                          : "3"}
                      </td>
                      <td class="px-6 py-4">
                        {item.date.split("T")[0].split("-").reverse().join("-")}
                      </td>
                      <td
                        class={`px-6 py-4 ${
                          item.status === "Pending"
                            ? "text-[red]"
                            : "text-[green]"
                        }`}
                      >
                        {item.status}
                      </td>
                      <td class="px-6 py-4 text-[green]"> {item.amount} </td>
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
      {showShare && (
        <SocialShare
          url={`${window.location.origin}/register?referrer_code=${userDetails.reffer_code}`}
          onClose={closeSocialShare}
        />
      )}
      <ToastContainer />
    </div>
  );
}
