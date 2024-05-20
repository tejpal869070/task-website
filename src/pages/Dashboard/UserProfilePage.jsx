import React, { useEffect, useState } from "react";
import { GetUserDetails } from "../../controller/userController";
import Loading1 from "../../componentes/Loader/Loading1";
import { FaPowerOff, FaRegUserCircle } from "react-icons/fa";
import {
  MdCancel,
  MdOutlineSecurity,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import UpdateProfilePopup from "./DashboardPopups/UpdateProfilePopup";
import user from "../../assets/user.jpg";
import BG1 from "../../assets/contactbg.jpg"

export default function UserProfilePage() {
  const [userData, seUsertData] = useState();
  const [loading, setLoading] = useState(true);

  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    const token = Cookies.get("token");
    const mobile = Cookies.get("mobile");

    if (token && mobile) {
      Cookies.remove("token");
      Cookies.remove("mobile");
      window.location.href = "/login";
    }
  };

  const getUserData = async () => {
    try {
      const fetchedData = await GetUserDetails();
      seUsertData(fetchedData.data[0]);
      setLoading(false);
    } catch (error) {
      window.location.href = "/login";
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading1 />
      ) : (
        <section className="py-10 my-auto dark:bg-gray-900 pt-[64px]">
          <div className="lg:w-[80%] md:w-[100%] xs:w-[96%] mx-auto flex gap-4">
            <div className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
              <div className="">
                <h1 className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white">
                  Profile
                </h1>
                <div>
                  <div className="py-2 w-full rounded-sm bg-cover bg-center bg-no-repeat items-center" style={{backgroundImage:`url(${BG1})`}}>
                    <div
                      className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full  bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `url(${user})` }}
                    ></div>
                  </div>
                  <div className="flex flex-wrap justify-between w-full px-6 py-6 bg-gray-200 rounded-b-lg">
                    <div className="w-full lg:w-[48%] font-bold leading-[30px]">
                      <label>UID :</label> <label> {userData.uid} </label>{" "}
                      <br />
                      <label>Name :</label> <label> {userData.uname} </label>{" "}
                      <br />
                      <label>Email :</label> <label> {userData.email} </label>
                      <br />
                      <label>Mobile :</label> <label> {userData.mobile} </label>
                      <br />
                      <label>Referral code :</label>{" "}
                      <label> {userData.reffer_code} </label>
                      <br />
                    </div>
                    <div className="w-full lg:w-[48%] font-bold  leading-[30px]">
                      <label>Bank Holder :</label>{" "}
                      <label> {userData.ac_name} </label>
                      <br />
                      <label>Bank Name :</label>{" "}
                      <label> {userData.bank_name} </label> <br />
                      <label>Account No. :</label>{" "}
                      <label> {userData.ac_no} </label>
                      <br />
                      <label>IFSC Code :</label>{" "}
                      <label> {userData.ifsc_code} </label>
                      <br />
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-between w-full py-6 ">
                    <div
                      onClick={togglePopup}
                      className="flex hover:bg-gray-300 hover:shadow-lg items-center justify-center font-bold bg-gray-200 h-10 lg:h-20 rounded-lg p-4 w-[100%] lg:w-[23%] cursor-pointer m-2 "
                    >
                      UPDATE ACCOUNT <FaRegUserCircle className="ml-2" />
                    </div>
                    <Link
                      to={"/change-password"}
                      className="flex hover:bg-gray-300 hover:shadow-lg items-center justify-center font-bold bg-gray-200 h-10 lg:h-20 rounded-lg p-4 w-[100%] lg:w-[23%] cursor-pointer m-2 "
                    >
                      CHANGE PASSWORD <MdOutlineSecurity className="ml-2" />
                    </Link>
                    <Link
                      to={"/dashboard"}
                      className="flex hover:bg-gray-300 hover:shadow-lg items-center justify-center font-bold bg-gray-200 h-10 lg:h-20 rounded-lg p-4 w-[100%] lg:w-[23%] cursor-pointer m-2 "
                    >
                      DASHBOARD <MdOutlineSpaceDashboard className="ml-2" />
                    </Link>
                    <div
                      onClick={handleLogout}
                      className="hover:bg-gray-300 hover:shadow-lg flex items-center justify-center font-bold bg-gray-200 h-10 lg:h-20 rounded-lg p-4 w-[100%] lg:w-[23%] cursor-pointer m-2 "
                    >
                      LOGOUT <FaPowerOff className="ml-2" />
                    </div>
                  </div>
                  {isOpen && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black z-[9999] bg-opacity-50">
                      <div className="bg-[#ffffff17] p-8 rounded shadow-lg relative">
                        <button
                          onClick={() => {
                            togglePopup();
                            getUserData();
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
