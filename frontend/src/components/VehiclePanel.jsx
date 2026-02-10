import React from 'react'

const VehiclePanel = (props) => {
  return (
    <div>
         <h5 onClick={()=>{
        props.setVehiclePanel(false)
        }} className="p-3  text-center top-0 absolute w-[93%]"><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className="font-semibold text-2xl mb-5">Choose a Vehicle</h3>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border mb-3 active:border-black  rounded-xl p-3 items-center justify-between w-full ">
          <img className="h-12" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base"> UberGo<span><i className="ri-user-3-fill"></i>4</span></h4>
              <h5 className="font-medium text-sm">2 mins away</h5>
              <p className="font-normal text-xs">Affordable, compact Rides</p>
          </div>
             <h2 className="text-xl font-semibold">$434</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border mb-3 active:border-black  rounded-xl p-3 items-center justify-between w-full ">
          <img className="h-12" src="https://tse4.mm.bing.net/th/id/OIP.VdrX-g7pOBwz9kKSQLrcCwHaHa?pid=Api&h=220&P=0" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base"> Moto<span><i className="ri-user-3-fill"></i>1</span></h4>
              <h5 className="font-medium text-sm">3 mins away</h5>
              <p className="font-normal text-xs">Affordable, Moto Rides</p>
          </div>
             <h2 className="text-xl font-semibold">$200</h2>
        </div>
        <div onClick={()=>{
            props.setConfirmRidePanel(true)
        }} className="flex border mb-3 active:border-black  rounded-xl p-3 items-center justify-between w-full ">
          <img className="h-12" src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png" alt="" />
          <div className="-ml-2 w-1/2">
            <h4 className="font-medium text-base"> Auto<span><i className="ri-user-3-fill"></i>4</span></h4>
              <h5 className="font-medium text-sm">4 mins away</h5>
              <p className="font-normal text-xs">Affordable, Auto Rides</p>
          </div>
             <h2 className="text-xl font-semibold">$250</h2>
        </div>
    </div>
  )
}

export default VehiclePanel