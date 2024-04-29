/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaLink } from "react-icons/fa";
import swal from "sweetalert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetReferData } from "../../controller/userController";

export default function Refers({ userData }) {
  const [loading, setLoading] = useState(true);
  const [refferHistory, setRefferHistory] = useState([]);

  const textToCopy = `${window.location.origin}/register?reffer_code=${userData.reffer_code}`;

  const handleCopy = () => {
    // swal("Yeh!", "Something went wrong!", "success");
    toast("Link copied. Share with your friends");
  };

  const RefferlDetails = async () => {
    const response = await GetReferData();
    if (response.status === true) {
      setRefferHistory(response.data);
      setLoading(false);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    RefferlDetails();
  }, []);

  const data = [
    {
      id: 1,
      name: "Ajay",
      uid: "GRF012H",
      level: 1,
      date: "23-04-2024",
      status: "success",
      commission: "$50",
    },
    {
      id: 2,
      name: "Vipul",
      uid: "GRF013K",
      level: 2,
      date: "25-04-2024",
      status: "pending",
      commission: "$0",
    },
  ];
  return (
    <div>
      <div className="mb-2 bg-[#b993ff] text-black font-semibold flex justify-center py-2">
        Refer you friend and earn on 3 levels.
        <CopyToClipboard
          className="pt-1 ml-2 cursor-pointer"
          text={textToCopy}
          onCopy={handleCopy}
        >
          <FaLink />
        </CopyToClipboard>
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
              "Loading..."
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
                        {" "}
                        {item.username}{" "}
                        <span
                          className={`h-3 w-3 mt-1 ml-1 rounded-full ${
                            item.status === "Pending"
                              ? "bg-[red]"
                              : "bg-[green]"
                          }`}
                        ></span>{" "}
                      </td>
                      <td class="px-6 py-4">
                        {" "}
                        {item.level === "level_1"
                          ? "1"
                          : item.level === "level_2"
                          ? "2"
                          : "3"}{" "}
                      </td>
                      <td class="px-6 py-4"> {item.date.split("T")[0]} </td>
                      <td
                        class={`px-6 py-4 ${
                          item.status === "Pending"
                            ? "text-[red]"
                            : "text-[green]"
                        }`}
                      >
                        {" "}
                        {item.status}{" "}
                      </td>
                      <td class="px-6 py-4 text-[green]"> 50 </td>
                      <ToastContainer />
                    </tr>
                  ))}
              </tbody>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
