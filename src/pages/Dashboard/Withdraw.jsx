/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import qrcode from "../../assets/withdraw2.png";
import {
  GetUserPaymentHistory,
  WithdrawRequest,
} from "../../controller/userController";
import swal from "sweetalert";
import { MdCancel } from "react-icons/md";
import UpdateProfilePopup from "./DashboardPopups/UpdateProfilePopup";

export default function Withdraw({
  userData,
  refreshEarnings,
  dataChange,
  OpenProfileUpdatePopup,
}) {
  const [userDetails, setUserDetails] = useState(userData || {});

  // if user  have any withdrawal pending then he cant submit new request
  const [canWithdraw, setCanWithdraw] = useState(true);

  useEffect(() => {
    setUserDetails(userData);
  }, [dataChange, userData]);

  const upi_id = userDetails.upi_id || "";
  const [withdrawing, setWithdrawing] = useState(false);
  const [formError, setFormError] = useState("");
  const [wallet_balance, setWalletBalance] = useState(
    userDetails.winning_balance
  );

  const winningBalance = parseFloat(userDetails.winning_balance);
  const maxAmount = (winningBalance * 60) / 100;
  const formattedMaxAmount = maxAmount.toFixed(2);

  const [formData, setFormData] = useState({
    amount: "",
    ac_name: userDetails.ac_name,
    ac_no: userDetails.ac_no,
    bank_name: userDetails.bank_name,
    ifsc_code: userDetails.ifsc_code,
  });

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleChnage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleWithdraw = async (e) => {
    e.preventDefault();
    setWithdrawing(true);
    if (
      userDetails.ac_name === null ||
      userDetails.ac_name === "" ||
      userDetails.ac_no === null ||
      userDetails.ac_no === "" ||
      userDetails.bank_name === null ||
      userDetails.bank_name === "" ||
      userDetails.ifsc_code === null ||
      userDetails.ifsc_code === "" ||
      userDetails.ifsc_code.length < 5
    ) {
      setFormError("Please update Bank account.");
      setWithdrawing(false);
      return;
    } else if (formData.amount < 100) {
      setFormError("Minimum amount is Rs.100");
      setWithdrawing(false);
      return;
    } else if (formData.amount > (userDetails.winning_balance * 60) / 100) {
      setFormError(
        `Amount should not exceed 60% of the wallet balance. That is ${formattedMaxAmount}`
      );
      setWithdrawing(false);
      return;
    }
    try {
      const response = await WithdrawRequest(formData);
      if (response) {
        if (response.status === true) {
          setWithdrawing(false);
          swal({
            title: "Withdrawal Success!",
            text: "Yeh!",
            icon: "success",
          });
          refreshEarnings();
          setWalletBalance(wallet_balance - formData.amount);
          setFormData({
            amount: "",
            upi_id: upi_id,
          });
          setTimeout(function(){
            window.location.href = "/dashboard";
          }, 1000)
        } else {
          formError(response.massage);
          setWithdrawing(false);
        }
      } else {
        setFormError("Server error");
        setWithdrawing(false);
      }
    } catch (error) {
      setFormError("Something went wrong");
      setWithdrawing(false);
    }
  };

  useEffect(() => {
    const getPaymentDetail = async () => {
      try {
        const response = await GetUserPaymentHistory();
        if (response.data) {
          const withdrawalPayments = response.data.filter(
            (payment) => payment.payment_type === "Withdrawal"
          );
          const pendingWithdrawals = withdrawalPayments.filter(
            (payment) => payment.status === "Pending"
          );
          console.log(pendingWithdrawals);
          if (pendingWithdrawals.length > 0) {
            setCanWithdraw(false);
          }
        }
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getPaymentDetail();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap justify-between justify-center mt-4">
        <div className="w-[95%] sm:w-[45%] m-auto hidden sm:block">
          <img
            alt="qr"
            src={qrcode}
            className="w-[72%] m-auto"
            loading="lazy"
          />
        </div>
        <div className="w-[95%] sm:w-[45%] m-auto ">
          <section class="">
            <div class="flex flex-col items-center justify-center px-6 py-8 pt-0  mx-auto ">
              <div class="w-full  rounded-lg  sm:max-w-md xl:p-0 ">
                <div class=" ">
                  <h1 class="text-xl font-bold mb-2 text-gray-900 md:text-2xl dark:text-white">
                    Withdraw your earnings
                  </h1>
                  <p className="text-[#d10000]"> {formError} </p>
                  
                  <form
                    class="space-y-4 md:space-y-6"
                    onSubmit={handleWithdraw}
                  >
                    <div>
                      <label class="block  text-sm mt-2 font-medium text-gray-900 dark:text-white">
                        Earning Balance : Rs.
                        {wallet_balance}
                      </label>
                    </div>
                    {userDetails.ac_name === null ||
                    userDetails.ac_no === null ||
                    userDetails.bank_name === null ||
                    userDetails.ifsc_code === null ? (
                      <div
                        className="px-2 py-1 cursor-pointer bg-[#f19393] rounded-lg font-semibold inline-block "
                        onClick={togglePopup}
                      >
                        Update Bank Account
                      </div>
                    ) : (
                      <div className="bg-gray-200  px-2 py-1 rounded-lg">
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">
                          Name. : {userDetails.ac_name}
                        </label>
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">
                          Bank Name. : {userDetails.bank_name}
                        </label>
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">
                          Account No. : {userDetails.ac_no}
                        </label>
                        <label class="block  text-sm font-medium text-gray-900 dark:text-white">
                          IFSC : {userDetails.ifsc_code}
                        </label>
                      </div>
                    )}
                    <div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Enter amount "
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={formData.amount}
                        onChange={handleChnage}
                        onWheel={() => document.activeElement.blur()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!canWithdraw}
                      class="w-full text-white bg-[#00bf63] py-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {withdrawing ? "Processing..." : "Withdraw"}
                    </button>
                  </form>
                </div>
               
                <p className="text-[#d10000] mt-1">
                    {!canWithdraw &&
                      "You have already pending withdrawal request.Please wait for confirm that"}
                  </p>
              </div>
            </div>
          </section>
        </div>
        {isOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999] bg-opacity-50">
            <div className="bg-[#ffffff17] p-8 rounded shadow-lg relative">
              <button
                onClick={() => {
                  togglePopup();
                }}
                className="absolute top-0 right-0 cursor-pointer text-gray-700"
              >
                <MdCancel className="w-6 h-6 m-1 text-white" />
              </button>
              <UpdateProfilePopup data={userData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
