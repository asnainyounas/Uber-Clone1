import React from 'react'

const LookingForDrivers = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
        props.setVehiclePanel(false)
        }} className="p-3  text-center top-0 absolute w-[93%]"><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className="font-semibold text-2xl mb-5">Looking For a Driver</h3>
        <div className='flex-col gap-2 flex justify-between itmes-center'>
            <img className="h-24 object-contain" src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
       

           <div className='w-full mt-5'>
            
              <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Asnain khan hone</p>
                        </div>
                
          </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
                        <div>
                            <h3 className='text-lg font-medium'>562/11-A</h3>
                            <p className='text-sm -mt-1 text-gray-600'>sfs</p>
                        </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
               <i className="ri-currency-line"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹34535</h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
                        </div>
            </div>
            </div>
       
        </div>
    </div>
  )
}

export default LookingForDrivers