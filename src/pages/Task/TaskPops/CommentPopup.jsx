import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { UpdateLikeCommentTask } from "../../../controller/userController";
import CopyToClipboard from "react-copy-to-clipboard";

export default function CommentPopup({ singleTask }) {
  const [formError, setFormError] = useState(true);
  const textToCopy = singleTask.comment_details || "Nice!";
  const[isCopy, setIsCopy] = useState(false)

  const handleCopy =()=>{
    setIsCopy(true)
    setFormError(false)
  }

  const [user, setUser] = useState({
    username: "",
    id: singleTask.id,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (value !== "") {
      setFormError(false);
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
        const response = await UpdateLikeCommentTask(user);
        if (response.status === true) {
        } else {
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
          Enter {singleTask.platform} username. <br /> Copy comment. <br /> Do
          task
        </p>
        <input
          type="text"
          id="username"
          name="username"
          class=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
          placeholder="user_name"
          required
          onChange={handleInputChange}
          value={username}
        />
        
        <CopyToClipboard
          className="text-white cursor-pointer flex  bg-[#7786ff] hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2  focus:outline-none dark:focus:ring-blue-800"
          text={textToCopy}
          onCopy={handleCopy}
        >
           <div>Copy Comment</div>
        </CopyToClipboard>
        <p className="text-[10px] text-left mb-2 font-bold text-[red]"> {isCopy ? "COPIED !" : ""} </p>
        <button
          type="button"
          onClick={() => openTaskWindow()}
          disabled={formError}
          class="text-white flex  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
        >
          Do Task <FaExternalLinkAlt className="mt-[2px] ml-2 w-[12px]" />
        </button>
      </div>
    </div>
  );
}
