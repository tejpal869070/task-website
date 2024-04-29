import React from 'react'
import loadingimg from "../../assets/loader1.gif"

export default function CreatingLoader() {
  return (
    <div className='flex align-center justify-center items-center gap-2 mt-[-9px] mb-[-9px]'>
      Loading<img alt='loader' src={loadingimg} className=' h-8 mt-1 '/>
    </div>
  )
}
