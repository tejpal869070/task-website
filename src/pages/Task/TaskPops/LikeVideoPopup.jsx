import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { UpdateLikeCommentTask } from "../../../controller/userController";

export default function LikeVideoPopup({ singleTask, closeLikePopup }) {
  const [formError, setFormError] = useState(true);

  const [erro2, setError2] = useState("");
  const [isLiked, setIsLiked] = useState(false);

  const [user, setUser] = useState({
    username: "",
    id: singleTask.id,
    status: singleTask.status,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (value !== "") {
      setFormError(false);
    }
  };

  const checkUser = async () => {
    if (user.username !== "") {
      try {
        const response = await UpdateLikeCommentTask(user);
        if (response.data.status === true) {
          setError2("Updated");
        }
      } catch (error) {
        setError2(error.response.data.massage);
      }
    }
  };

  const openTaskWindow = async () => {
    if (user.username !== "") {
      const popup = window.open(
        singleTask.task_url,
        "popupWindow",
        "width=600,height=400"
      );
      if (popup) {
        try {
          const response = await UpdateLikeCommentTask(user);
          if (response.data.status === true) {
            console.log("dont");
            setIsLiked(true);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        console.error("Popup window blocked by browser");
      }
    }
  };

  const { username } = user;

  return (
    <div>
      <div className="text-center">
        <p className="text-xl text-black">
          Please enter your {singleTask.platform} username <br /> then do the
          task.
        </p>
        <input
          type="text"
          id="username"
          name="username"
          class=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2"
          placeholder="user_name"
          required
          onChange={handleInputChange}
          value={username}
        />
        <p className="mb-4"> {erro2} </p>
        <div className="flex flex-row justify-between">
          <button
            type="button"
            onClick={() => openTaskWindow()}
            disabled={formError}
            class="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
          >
            Do Task <FaExternalLinkAlt className="mt-[2px] ml-2 w-[12px]" />
          </button>
          {isLiked && (
            <button
              type="button"
              onClick={closeLikePopup}
              disabled={formError}
              class="text-white flex bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit <FaExternalLinkAlt className="mt-[2px] ml-2 w-[12px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
