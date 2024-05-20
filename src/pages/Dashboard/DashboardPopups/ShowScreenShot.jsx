import React from "react";
import { api } from "../../../config/api";

export default function ShowScreenShot(data) {
  const detail = data.data;
  return (
    <div>
      <div>
        <section class="bg-gray-50  dark:bg-gray-900">
          <div class="flex flex-col items-center justify-center  mx-auto  lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div class=" space-y-4 md:space-y-6 px-2 py-2">
                <img
                  alt="screenshot"
                  className="h-[30vh]"
                  src={`${api.API_URL}${detail.image_path}${detail.image}`}
                />
                <p className="text-black">
                  Transection id: {detail.transaction_id}
                </p>
                {detail.reason !== null ? <p>Declined Reason: {detail.reason}</p> : ""}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
