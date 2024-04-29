export function VideoEditPopup() {
    return (
      <div>
        <div className='text-center'>
          <p className='text-xl text-black'>Want to edit url ?</p>
          <input type="text" id="first_name" class=" mt-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4" placeholder="URL" required />
          <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800">Edit</button>
          <p className=' text-[#a90000] mt-2 '>Uploading on different plateform <br/> may cause to fail the task.</p>
        </div>
      </div>
    )
  }
  