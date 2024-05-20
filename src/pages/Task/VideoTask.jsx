import React, { useCallback, useEffect, useState } from "react";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import { MdCancel, MdError } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import VideoTaskPopup1 from "./TaskPops/VideoTaskPopup";
import { AiFillEdit } from "react-icons/ai";
import { VideoEditPopup } from "./TaskPops/VideoEditPopup";
import videoEarn from "../../assets/videoEarn-min.png";
import { GetVideoTasks } from "../../controller/userController";
import { api } from "../../config/api";

export default function VideoTask({ userData }) {
  const [isVideoPopup1Open, setVideoPopup1] = useState(false);
  const [isVideoEditPopup, setVideoEditPopup] = useState(false);

  const [taskData, setTaskData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const [singleVideoTask, setSingleVideoTask] = useState();

  const openVideoPopup = useCallback(
    (item) => {
      setVideoPopup1(!isVideoPopup1Open);
      setSingleVideoTask(item);
    },
    [isVideoPopup1Open]
  );

  const openVideoEditPopup = () => {
    setVideoEditPopup(!isVideoEditPopup);
  };

  useEffect(() => {
    const getVideoTaskData = async () => {
      try {
        const fetchedData = await GetVideoTasks();
        setTaskData(fetchedData);
        setDataLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataLoading(false);
      }
    };

    getVideoTaskData();
  }, [openVideoPopup]);

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <img alt="logo" src={videoEarn}  loading="lazy" />
        <div className="w-full overflow-x-scroll">
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
                  Download
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
              {dataLoading
                ? "Loading.."
                : taskData && taskData.map((item, index) => (
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
                      <td className="px-6 py-4 flex">
                        <a
                          alt="download"
                          rel="noreferrer"
                          target="_blank"
                          href={`${api.API_URL}${item.task_url}`}
                          download
                        >
                          <FaDownload className="cursor-pointer" />
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        {item.status}
                        {item.status === "Initiate" ? "/Verifying" : ""}{" "}
                      </td>
                      <td className="px-6 py-4  ">
                        {" "}
                        <span className="font-semibold text-[green] ">
                          +₹
                          {userData &&
                            (
                              userData.total_video_price / userData.total_video
                            ).toFixed(2)}
                        </span>{" "}
                      </td>
                      <td className="px-6 py-4 ">
                        {item.status === "Completed" ? (
                          <RiVerifiedBadgeFill className="w-5 h-5 cursor-pointer" />
                        ) : item.status === "Failed" ? (
                          <MdError className="w-5 h-5 cursor-pointer" />
                        ) : item.status === "Pending" ? (
                          <FaExternalLinkAlt
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => openVideoPopup(item)}
                          />
                        ) : (
                          <AiFillEdit
                            className="w-5 h-5 cursor-pointer"
                            onClick={() => openVideoPopup(item)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}

              {isVideoPopup1Open && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => openVideoPopup(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <VideoTaskPopup1 videoData={singleVideoTask} />
                  </div>
                </div>
              )}

              {isVideoEditPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={openVideoEditPopup}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <VideoEditPopup />
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
