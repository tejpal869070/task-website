import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { GetWinningWalletHistory } from "../../controller/userController";
import { FaComment, FaHeart, FaVideo } from "react-icons/fa";
import Loading1 from "../../componentes/Loader/Loading1";

export default function WinningHistory() {
  const [winningData, setWinningData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWinnigHistory = async () => {
      try {
        const fetchedData = await GetWinningWalletHistory();
        setWinningData(fetchedData.data.reverse());
        setLoading(false);
      } catch (error) {
        setLoading(false)
        window.alert("something webt wrong. Please try again.")
      }
    };

    getWinnigHistory();
  }, []);
  return (
    <div>
      {loading ? (
        <Loading1 />
      ) : (
        <div className="pt-[64px]">
          <div className="container m-auto w-[98vw] sm:w-[70vw]">
            <div className="flex  flex-col m-auto bg-[#bebbff]  align-center justify-between p-4 mt-2 rounded-lg">
              <div className="flex mb-2">
                <Link
                  to={"/my-task"}
                  className="bg-[white] font-semibold   px-2 rounded-lg"
                >
                  {" "}
                  <span>
                    <IoMdArrowRoundBack className="inline" />
                  </span>{" "}
                  Go to Tasks
                </Link>
              </div>

              <div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-lg">
                    <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          S.No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Task
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? "Loading"
                        : winningData.map((item, index) => (
                            <tr className="odd:bg-white text-black font-semibold odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                              <th
                                scope="row"
                                className="px-4 py-2 font-medium text-black whitespace-nowrap dark:text-white"
                              >
                                {index + 1}
                              </th>
                              <td className="px-4 py-2 flex ">
                                {" "}
                                {item.type}{" "}
                                {item.type === "LIKE" ? (
                                  <FaHeart className="mt-1 ml-4 text-[red] " />
                                ) : item.type === "VIDEO" ? (
                                  <FaVideo className="mt-1 ml-1 text-[blue] " />
                                ) : (
                                  <FaComment className="mt-1 ml-1" />
                                )}{" "}
                              </td>
                              <td className="px-4 py-2 text-[green] ">
                                {" "}
                                +₹{item.amount}{" "}
                              </td>
                              <td className="px-4 py-2">
                                {" "}
                                {item.date.split("T")[0]}{" "}
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
