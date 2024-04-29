/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import qrcode from "../../assets/withdraw2.png";
import { WithdrawRequest } from "../../controller/userController";
import swal from "sweetalert";

export default function Withdraw({ userData, refreshEarnings, dataChange }) {
  const [userDetails, setUserDetails] = useState(userData);

  useEffect(() => {
    setUserDetails(userData); 
  }, [dataChange, userData]);

  const upi_id = userDetails.upi_id;
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
  });

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
        console.log(response);
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

  return (
    <div>
      <div className="flex flex-wrap justify-between justify-center mt-4">
        <div className="w-[95%] sm:w-[45%] m-auto hidden sm:block">
          {" "}
          <img alt="qr" src={qrcode} className="w-[72%] m-auto" />{" "}
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
                      <label class="block  text-sm font-medium text-gray-900 dark:text-white">
                        Winning Balance : Rs.
                        {wallet_balance}
                      </label>
                    </div>
                    <div>
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
                      />
                    </div>

                    <button
                      type="submit"
                      class="w-full text-white bg-[#00bf63] py-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {withdrawing ? "Processing..." : "Withdraw"}
                    </button>
                  </form>
                </div>
                <p className="text-xs mt-2  ">
                  Click on Edit profile for change bank account{" "}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
