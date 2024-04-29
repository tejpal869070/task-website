/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import qrcode from "../../assets/qr.png";
import {
  DepositRequest,
  GetPaymentMethod,
} from "../../controller/userController";

import swal from "sweetalert";
import CreatingLoader from "../../componentes/Loader/CreatingLoader";

export default function Deposit() {
  const [payment, setPayment] = useState();
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);

  const [formData, setFormData] = useState({
    id: "",
    d_image: null,
    amount: "",
    transection_id: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      d_image: event.target.files[0],
    });
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setCreating(true)
    if (formData.transection_id === "") {
      setFormError("Please enter a valid transection id");
      setCreating(false);
      return;
    } else if (formData.amount === "" || formData.amount < 100) {
      setFormError("Minimum deposit is Rs.100");
      setCreating(false);
      return;
    } else if (formData.d_image === null) {
      setFormError("Please upload payment screenshot");
      setCreating(false);
      return;
    }
    try {
      const response = await DepositRequest(formData);
      if(response.status === true){
        console.log(response)
        swal({
          title: "Deposit request sent!",
          text: "Yeh!",
          icon: "success",
        });
        setFormError("");
        setCreating(false);
        setFormData({
          amount:"",
          transection_id: "",
          d_image: ""
        })
      } else{
        setFormError("Please upload new screenshot");
        setCreating(false);
      }
    } catch (error) {
      setFormError("Server error. Please try again");
      setCreating(false);
    }
  };

  useEffect(() => {
    const getPaymentDetail = async () => {
      try {
        const fetchedData = await GetPaymentMethod();
        setPayment(fetchedData.data[0]);
        console.log(fetchedData.data[0])
        setPaymentLoading(false);
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getPaymentDetail();
  }, []);

  useEffect(() => {
    if (!paymentLoading) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        id: payment.id,
      }));
    }
  }, [paymentLoading]);

  const { id, d_image, amount, transection_id } = formData;

  return (
    <div>
      <div className="flex flex-wrap-reverse justify-between justify-center mt-4">
        <div className="w-[85%] sm:w-[45%] m-auto">
          {paymentLoading ? (
            "Loading..."
          ) : (
            <div>
            <img alt="qr" src={payment.qr_code} className="w-[72%] m-auto" />
            <p className="font-semibold text-center mt-2">UPI:  : {payment.upi_id} </p>
            </div>
          )}
        </div>
        <div className="w-[85%] sm:w-[45%] m-auto">
          <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 pt-0  mx-auto ">
              <div className="w-full  rounded-lg  sm:max-w-md xl:p-0 ">
                <div className=" space-y-4 md:space-y-6 ">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Complete your deposit
                  </h1>
                  <p className="text-[#d10000]"> {formError} </p>
                  <form className="space-y-4 md:space-y-6" onSubmit={handleDeposit}>
                    <div>
                      <input
                        type="text"
                        name="transection_id"
                        id="refrence_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Your UPI transection id"
                        required=""
                        value={formData.transection_id}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        name="amount"
                        id="amount"
                        placeholder="Amount"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required=""
                        value={formData.amount}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        aria-describedby="file_input_help"
                        id="file_input"
                        type="file"
                        name="d_image"
                        onChange={handleFileChange}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-[#00bf63] py-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {creating ? <CreatingLoader/> : "Deposit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}