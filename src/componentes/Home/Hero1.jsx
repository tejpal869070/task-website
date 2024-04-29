import React from 'react' 
import refferimg from "../../assets/website-banner.png"


export default function Hero1() {
  return (
    <>
      <div className=' '>
      <div className="m-auto h-40 lg:h-96 sm:h-80" style={{ backgroundImage: `url(${refferimg})`, backgroundRepeat:"no-repeat", backgroundPosition:"center", backgroundSize:"contain" }}>
      </div>
      </div>
    </>
  )
}
