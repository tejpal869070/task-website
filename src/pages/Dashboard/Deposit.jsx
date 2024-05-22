/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import qrcode from "../../assets/qr.png";
import {
  DepositRequest,
  GetPaymentMethod,
  GetUserPaymentHistory,
} from "../../controller/userController";

import swal from "sweetalert";
import CreatingLoader from "../../componentes/Loader/CreatingLoader";
import { MdCancel } from "react-icons/md";
import Slider from "react-slick";
import { api } from "../../config/api";
import bankimg from "../../assets/Bank.png";

export default function Deposit() {
  const [payment, setPayment] = useState();
  const [paymentLoading, setPaymentLoading] = useState(true);
  const [formError, setFormError] = useState("");
  const [creating, setCreating] = useState(false);

  // if user  have any deposit pending then he cant submit new request
  const [canDeposit, SetCanDeposit] = useState(true);

  const [formData, setFormData] = useState({
    id: "",
    d_image: null,
    amount: "",
    transection_id: "",
    deposit_id: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "deposit_id") {
      const selectedItem = payment.find((item) => item.id === value);
      if (selectedItem) {
        setFormData({
          ...formData,
          [name]: selectedItem.id,
        });
      }
    }

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

  const removeImage = () => {
    setFormData({
      ...formData,
      d_image: null,
    });
  };

  const handleDeposit = async (e) => {
    e.preventDefault();
    setCreating(true);
    if (formData.transection_id.length !== 12) {
      setFormError("Please enter valid UTR no.");
      setCreating(false);
      return;
    } else if (formData.deposit_id === "") {
      setFormError("Please select deposit method.");
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
      if (response.status === true) {
        swal({
          title: "Deposit request sent!",
          text: "Yeh!",
          icon: "success",
        });
        setFormError("");
        setCreating(false);
        setFormData({
          amount: "",
          transection_id: "",
          d_image: null,
        });

        setTimeout(function () {
          window.location.href = "/dashboard";
        }, 2000);
      } else {
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
        setPayment(fetchedData.data);

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

  useEffect(() => {
    const getPaymentDetail = async () => {
      try {
        const response = await GetUserPaymentHistory();
        if (response.data) {
          const depositPayments = response.data.filter(
            (payment) => payment.payment_type === "Deposit"
          );
          const pendingDeposits = depositPayments.filter(
            (payment) => payment.status === "Pending"
          );
          if (pendingDeposits.length > 0) {
            SetCanDeposit(false);
          }
        }
      } catch (error) {
        return <div>Loading...</div>;
      }
    };

    getPaymentDetail();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    speed: 400,
    cssEase: "linear",
  };

  const { id, d_image, amount, transection_id } = formData;

  return (
    <div>
      <div className="flex flex-wrap-reverse justify-between justify-center mt-4">
        <div className="w-[95%] md:w-[45%] m-auto">
          <Slider {...settings}>
            {payment &&
              payment.map((item, index) => (
                <div className=" flex justify-center items-center">
                  {item.type === "UPI" ? (
                    <div>
                      <img
                        alt="qrcode"
                        src={`${api.API_URL}assets/img/${item.qr_code}`}
                      />
                      <p className="font-bold text-xl">
                        UPI ID : {item.upi_id}
                      </p>
                    </div>
                  ) : (
                    <div className="flex w-full bg-[#f3f4f68f] items-center justify-center justify-around">
                      <div className=" w-full lg:w-[70%]  h-full flex flex-col gap-2 px-4 py-6 font-semibold text-lg">
                        <p>Bank Holder. : {item.ac_holder_name}</p>
                        <p>Bank Name. : {item.bank_name}</p>
                        <p>Account Type. : {item.ac_type}</p>
                        <p>Account No. : {item.ac_no}</p>
                        <p>IFSC Code. : {item.ifsc_code}</p>
                      </div>
                      <div className=" w-full lg:w-[30%] hidden lg:block">
                        <img alt="bankimg" src={bankimg} className="w-full" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </Slider>
        </div>
        <div className="w-[95%] md:w-[45%] m-auto">
          <section className="">
            <div className="flex flex-col items-center justify-center px-6 py-8 pt-0  mx-auto ">
              <div className="w-full  rounded-lg  sm:max-w-md xl:p-0 ">
                <div className=" space-y-4 md:space-y-6 ">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Complete your deposit
                  </h1>
                  <p className="text-[#d10000]"> {formError} </p>
                  <p className="text-[#d10000]">
                    {!canDeposit &&
                      "You already have a pending deposit request. Please wait for confirmation. "}
                  </p>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={handleDeposit}
                  >
                    <div>
                      <input
                        type="number"
                        name="transection_id"
                        id="refrence_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="UTR no."
                        required=""
                        value={formData.transection_id}
                        onChange={handleInputChange}
                        maxLength={12}
                        onWheel={() => document.activeElement.blur()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>
                    <div>
                      <select
                        type="number"
                        name="deposit_id"
                        id="refrence_id"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="UTR no."
                        required=""
                        value={formData.deposit_id}
                        onChange={handleInputChange}
                        maxLength={12}
                        onWheel={() => document.activeElement.blur()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                          }
                        }}
                      >
                        <option>---Select Deposit---</option>
                        {payment &&
                          payment.map((item, index) => (
                            <option className="" value={item.id}>
                              {item.type === "UPI"
                                ? item.upi_id
                                : `Bank Account: ${item.ac_no},  ${item.ac_holder_name}`}
                            </option>
                          ))}
                      </select>
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
                        onWheel={() => document.activeElement.blur()}
                        onKeyDown={(e) => {
                          if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                            e.preventDefault();
                          }
                        }}
                      />
                    </div>

                    <div className="flex">
                      {!d_image ? (
                        <input
                          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                          aria-describedby="file_input_help"
                          id="file_input"
                          type="file"
                          name="d_image"
                          onChange={handleFileChange}
                        />
                      ) : (
                        <input
                          type="text"
                          name="amount"
                          id="amount"
                          disabled
                          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          value={d_image.name}
                        />
                      )}
                      {!d_image ? (
                        ""
                      ) : (
                        <MdCancel
                          className="ml-[-20px] mt-3 cursor-pointer"
                          onClick={removeImage}
                        />
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={!canDeposit}
                      className="w-full text-white bg-[#00bf63] py-2 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5  text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      {creating ? <CreatingLoader /> : "Deposit"}
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
