import React, { useState } from 'react'
import ayush from './Aisha.png'
import { useEffect } from 'react';

function Messages() {

    const [msgValue , setmsgValue] = useState('fixed')
 
    // function msgAlert(){
    //     setTimeout(() => {
    //         if(msgValue == 'none'){
    //             console.log("value is none");
    //             setmsgValue('fixed')
    //         }
    //         else if(msgValue == 'fixed'){
    //             console.log("value is fixed");
    //             setmsgValue('none')
    //         }
    //     }, 10000);
    // }


    // useEffect(()=>{
    //     msgAlert()
    // })

    return (
        <div>
            <div className='fixed bottom-10 right-10 z-50' style={{display: msgValue}}> 


                <div id="toast-notification" class="pl-5 w-72 text-gray-900 bg-gray-300 rounded-lg shadow dark:text-gray-300 " role="alert">

                    <div class="flex items-center py-2">
                        <div class="relative inline-block shrink-0">
                            <img alt="dfd" class="w-12 h-12 rounded-full" src={ayush}  />

                        </div>
                        <div class="ms-3 text-sm font-normal">
                            <div class="text-sm font-bold text-gray-900 dark:text-white ">Bonnie Green</div>
                            <div class="text-sm font-semibold">Withdrawl 500Rs</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Messages