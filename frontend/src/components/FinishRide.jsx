import React from 'react'
import { Link } from 'react-router-dom'

const FinishRide = (props) => {
  return (
     <div>
        <h5 onClick={()=>{
        props.setFinishRidePanel(false)
        }} className="p-3  text-center top-0 absolute w-[93%]"><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
        <h3 className="font-semibold text-2xl mb-5 mt-3">Finish This Ride</h3>
        <div className='items-center justify-between flex p-3 bg-yellow-300 rounded-lg mt-4'>
            <div className='items-center gap-3 flex  '>
                <img className='h-11 w-11 rounded-full object-cover' src="https://i.pinimg.com/736x/38/d0/af/38d0afa64756927b5a3107eb0599b829.jpg" alt="" />
                <h2 className='text-gl font-medium'>Justin Degryse</h2>
            </div>
            <h5 className='text-lg font-semibold'>2.2km</h5>
        </div>
        <div className='flex-col gap-2 flex justify-between itmes-center'>
            
       

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
      <div className='mt-6 w-full'>
       
           
              <Link to={'/captain-riding'} className='w-full mt-5 flex justify-center text-white rounded-lg bg-green-600 p-2 font-semibold'>Ride Complete</Link>

      
       
      </div>
        </div>
    </div>
  )
}

export default FinishRide