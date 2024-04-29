import React, { useState } from "react";
import { UpdateVideoTask } from "../../../controller/userController";
import swal from "sweetalert";

export default function VideoTaskPopup1({ videoData }) {

  const[isSubmitting, setIsSubmitting] = useState(false)
  const[formError, setFormError] = useState()

  const [formData, setFormData] = useState({
    id: videoData.id,
    url: videoData.url,
  });


  const handleVideoUrl= async(e)=>{
    e.preventDefault();
    setIsSubmitting(true)
    const response = await UpdateVideoTask(formData)
    if(response){
      if(response.status === true){
        swal({
          title: "Success!",
          text: "Thank you. Your task is being verfying. ",
          icon: "success",
        });
        setFormError("You can also edit your provided link.")
        setIsSubmitting(false)
      } else{
        swal({
          title: "Error!",
          text: "This video url is already exists",
          icon: "error",
        });
        setIsSubmitting(false)
      }
    } else{
      console.log("response not rec.")
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div>
      <div className="text-center">
        <p className="text-xl text-black">
          Have you uploaded video on described plateform?
        </p>
        <p className="text-[red] mt-2"> {formError} </p>
        <form onSubmit={handleVideoUrl}>
          <input
            type="text"
            id="first_name"
            name="url"
            class=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
            placeholder="URL"
            required
            value={formData.url}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
          >
            {isSubmitting ? "Processing..." : "Submit"}
          </button>
        </form>
        <p className=" text-[#a90000] mt-2 ">
          Uploading on different plateform <br /> may cause to fail the task.
        </p>
      </div>
    </div>
  );
}
