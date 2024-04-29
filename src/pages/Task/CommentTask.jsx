import React, { useCallback, useEffect, useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdAccessTimeFilled, MdCancel, MdError } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import earncomment from "../../assets/commentEarn.png";
import { GetCommentTasks } from "../../controller/userController";
import CommentPopup from "./TaskPops/CommentPopup";

export default function CommentTask({ userData }) {
  const [isCommentPopupOpen, setCommentPopupOpen] = useState(false);
  const [singleCommentData, setSingleCommentData] = useState(null);
  const [taskData, setTaskData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const handleCommentBox = useCallback(
    (item) => {
      setCommentPopupOpen(!isCommentPopupOpen);
      setSingleCommentData(item);
    },
    [isCommentPopupOpen]
  );

  useEffect(() => {
    const getCommentTaskData = async () => {
      try {
        const fetchedData = await GetCommentTasks(); // Assuming GetCommentTasks is defined somewhere
        setTaskData(fetchedData);
        setDataLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setDataLoading(false);
      }
    };

    getCommentTaskData();
  }, [handleCommentBox]); // Now only handleCommentBox is the dependency

  return (
    <div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <img alt="logo" src={earncomment} />
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
                ? "Loading..."
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

                      <td className="px-6 py-4">
                        {" "}
                        {item.status}
                        {item.status === "Initiate" ? "/Verifying" : ""}{" "}
                      </td>
                      <td className="px-6 py-4  flex">
                        {" "}
                        <span className="font-semibold text-[green]">
                          +₹
                          {userData &&
                            (
                              userData.total_comment_price /
                              userData.total_comment
                            ).toFixed(2)}{" "}
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
                            onClick={() => handleCommentBox(item)}
                          />
                        ) : (
                          <MdAccessTimeFilled className="w-5 h-5 cursor-pointer" />
                        )}
                      </td>
                    </tr>
                  ))}

              {isCommentPopupOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => handleCommentBox(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <CommentPopup singleTask={singleCommentData} />
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
