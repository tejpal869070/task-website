import React, { useCallback, useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdCancel, MdError } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import likeEarn from "../../assets/likeEarn-min.png";
import { GetLikeTasks } from "../../controller/userController";
import LikeVideoPopup from "./TaskPops/LikeVideoPopup";

export default function Liketask({ userData }) {
  console.log(userData)
  const [isLikePopupOpen, setLikePopup] = useState(false);
  const [singleTask, setSingleTask] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const handleLikePost = useCallback(
    (item) => {
      setLikePopup(!isLikePopupOpen);
      setSingleTask(item);
    },
    [isLikePopupOpen]
  );

  const closeLikePopup =()=>{
    setLikePopup(false)
  }

  useEffect(() => {
    const getLikeTaskData = async () => {
      try {
        const fetchedData = await GetLikeTasks();
        setTaskData(fetchedData);
        setDataLoading(false);
      } catch (error) {}
    };

    getLikeTaskData();
  }, [handleLikePost]);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <img alt="omg" src={likeEarn} className="w-full" loading="lazy" />
        <div className="w-[100%] overflow-x-scroll">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700  bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Plateform
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Earning
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {dataLoading ? (
                <p className="text-center mt-2 mb-2 text-black">Loading...</p>
              ) : (
                taskData &&
                taskData.map((item, index) => (
                  <tr
                    className={`odd:bg-white  font-[600] odd:dark:bg-gray-900 even:bg-gray-50  border-b ${
                      item.status === "Failed"
                        ? "text-[red]"
                        : item.status === "Completed"
                        ? "text-[green]"
                        : "text-black"
                    }`}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4   whitespace-nowrap dark:text-white"
                    >
                      {index + 1}.
                    </th>
                    <td className="px-6 py-4"> {item.platform} </td>
                    <td className="px-6 py-4">
                      {item.status}
                      {item.status === "Initiate" ? "/Verifying" : ""}
                    </td>
                    <td className="px-6 py-4  ">
                      <span className="font-semibold text-[green]">
                        + ₹
                        {userData &&
                          (
                            userData.total_like_price / userData.total_like
                          ).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 ">
                      {item.status === "Completed" ? (
                        <RiVerifiedBadgeFill className="w-5 h-5 cursor-pointer" />
                      ) : item.status === "Failed" ? (
                        <MdError
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => handleLikePost(item)}
                        />
                      ) : item.status === "Pending" ? (
                        <FaExternalLinkAlt
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => handleLikePost(item)}
                        />
                      ) : (
                        <MdAccessTimeFilled
                          className="w-5 h-5 cursor-pointer"
                          onClick={() => handleLikePost(item)}
                        />
                      )}
                    </td>
                  </tr>
                ))
              )}

              {isLikePopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => handleLikePost(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <LikeVideoPopup singleTask={singleTask} closeLikePopup={closeLikePopup} />
                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
