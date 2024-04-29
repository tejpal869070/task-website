import React from "react";

export default function PlanHistory({ planHistory }) {
  console.log(planHistory)
  return (
    
      <div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No.
                </th>
                <th scope="col" className="px-6 py-3">
                  Plan Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Buy on
                </th>
                <th scope="col" className="px-6 py-3">
                  Expire on
                </th>
              </tr>
            </thead>
            <tbody>
              {planHistory &&
                planHistory.map((item, index) => (
                  <tr key={index} className={`odd:bg-white text-semibold odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 ${item.status==="Active" ? "text-[green]" : "text-[red]"}` }>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"

                    >
                    {index + 1}.
                    </th>
                    <td className="px-6 py-4"> {item.name} </td>
                    <td className="px-6 py-4"> {item.status==="Active" ? "Active" : "Expired"} </td>
                    <td className="px-6 py-4">{item.price}</td>
                    <td className="px-6 py-4"> {(item.date).split('T')[0]} </td>
                    <td className="px-6 py-4"> {(item.expire_date).split('T')[0]} </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      
  );
}
