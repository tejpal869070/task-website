/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  CancelWithdrawalRequest,
  GetUserPaymentHistory,
} from "../../controller/userController";
import { IoEyeSharp } from "react-icons/io5";
import UpdateProfilePopup from "./DashboardPopups/UpdateProfilePopup";
import ShowScreenShot from "./DashboardPopups/ShowScreenShot";
import { MdCancel } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import Loading1 from "../../componentes/Loader/Loading1";
import { ToastContainer, toast } from "react-toastify";

export default function History({ dataChange, refreshEarnings }) {
  const [loading, setLoading] = useState(true);
  const [history, sethistory] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [cancelItem, setCancelItem] = useState();

  const [isOpen, setIsOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [withDrawItem, setWithdrawItem] = useState();
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const[isWithdrawingCancelling, setWithdrawCancelling] = useState(false)

  const togglePopup = (item) => {
    setSelectedItem(item);
    setIsOpen(!isOpen);
  };

  const cancelTogglePopup = (item) => {
    setCancelItem(item);
    setIsCancelOpen(!isCancelOpen);
  };

  const showWithdrawPopup = (item) => {
    setWithdrawItem(item);
    setIsWithdrawOpen(!isWithdrawOpen);
  };

  const handleWithdrawalCancel = async (cancelItem) => {
    setWithdrawCancelling(true)
    try {
      const response = await CancelWithdrawalRequest(cancelItem);
      if (response) {
        if (response.status === true) {
          toast("Withdrawal cancelled")
          cancelTogglePopup(null)
          refreshEarnings()
          setWithdrawCancelling(false)
        } else {
          window.alert(response.massage);
          setWithdrawCancelling(false)
        }
      } else {
        window.alert("Something went wrong");
        setWithdrawCancelling(false)
      }
    } catch (error) {
      window.alert("Something went wrong. Please try again.");
      setWithdrawCancelling(false)
    }
  };

  useEffect(() => {
    const getPaymentDetail = async () => {
      try {
        const fetchedData = await GetUserPaymentHistory();
        sethistory(fetchedData.data.reverse());
        setLoading(false);
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getPaymentDetail();
  }, [dataChange]);

  return (
    <div>
      <div className="relative overflow-x-scroll shadow-md px-2 ">
        {loading ? (
          <Loading1 />
        ) : (
          <div className="w-[100%] overflow-x-scroll">
            <div className="h-[98vh] ">
              <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      S.No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      File
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {history &&
                    history.map((item, index) => (
                      <tr
                        key={index}
                        className={`odd:bg-white even:bg-gray-50 ${
                          item.status === "Canceled"
                            ? "text-black"
                            : item.payment_type === "Withdrawal"
                            ? "text-[red]"
                            : "text-[green]"
                        }`}
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {index + 1}.
                        </th>
                        <td className="px-6 py-4">Rs.{item.amount} </td>
                        <td
                          className={`px-6 py-4  ${
                            item.payment_type === "Withdrawal" ? "" : ""
                          }`}
                        >
                          {item.payment_type}
                        </td>
                        <td className="px-6 py-4">
                          {" "}
                          {item.date.split("T")[0]}{" "}
                        </td>
                        <td
                          className={`px-6 py-4  ${
                            item.status === "Pending" ? "" : ""
                          }`}
                        >
                          {item.status}
                        </td>
                        <td className="px-6 py-4 text-black ">
                          {item.payment_type === "Deposit" ? (
                            <IoEyeSharp
                              className="cursor-pointer"
                              onClick={() => togglePopup(item)}
                            />
                          ) : item.payment_type === "Withdrawal" &&
                            item.status === "Pending" ? (
                            <ImCancelCircle
                              className="cursor-pointer"
                              onClick={() => cancelTogglePopup(item)}
                            />
                          ) : item.payment_type === "Withdrawal" &&
                            item.status === "Success" ? (
                            <FaEye
                              className="cursor-pointer"
                              onClick={() => showWithdrawPopup(item)}
                            />
                          ) : item.payment_type === "Withdrawal" &&
                            item.status === "Canceled" ? (
                            "-"
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div>
              {isOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white h-[60vh] p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => togglePopup(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <ShowScreenShot data={selectedItem} />
                  </div>
                </div>
              )}
            </div>
            <div>
              {isCancelOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => cancelTogglePopup(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <p>Are u sure to cancel this withdrawal</p>
                    <p className="text-center font-semibold text-xl mt-2">
                      Rs.{cancelItem.amount}{" "}
                    </p>
                    <div className="flex gap-2 justify-center mt-3">
                      <p
                        className="text-semibold bg-[#00bf63] px-3 cursor-pointer hover:w-16 text-center rounded-lg text-white"
                        onClick={() => handleWithdrawalCancel(cancelItem)}
                      >
                        {isWithdrawingCancelling ? "Wait.." : "Yes"}
                      </p>
                      <p
                        className="text-semibold bg-[#ff6666] px-3 cursor-pointer hover:w-16 text-center rounded-lg text-white"
                        onClick={() => cancelTogglePopup(null)}
                      >
                        No
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              {isWithdrawOpen && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[999]">
                  <div className="bg-white p-8 rounded shadow-lg relative">
                    <button
                      onClick={() => showWithdrawPopup(null)}
                      className="absolute top-0 right-0 cursor-pointer text-gray-700"
                    >
                      <MdCancel className="w-6 h-6 m-1" />
                    </button>
                    <p className="text-center">Your payment </p>
                    <p className="text-center font-semibold text-xl mt-2 mb-2 text-[green] ">
                      Rs.{withDrawItem.amount}{" "}
                    </p>
                    <p className="text-center"> is successfully sent to: </p>
                    <p className="text-center mt-2"> {withDrawItem.upi_id} </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <ToastContainer/>
    </div>
  );
}
