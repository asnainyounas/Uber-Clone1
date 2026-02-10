import React from 'react'

const CaptainDetails = () => {
  return (
    <div> 
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start gap-6">
            <img className="h-10 w-10 rounded-full object-cover" src="https://i.pinimg.com/736x/38/d0/af/38d0afa64756927b5a3107eb0599b829.jpg" alt="" />
            <h4 className="text-lg font-medium">Asnain Younas</h4>
          </div>
          <div>
            <h4 className="text-xl font-semibold">$234.4</h4>
          <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>
        <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-14 items-start">
          <div className="text-center">
            <i className="text-3xl mb- font-thin ri-time-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
          <div  className="text-center">
            <i className="text-3xl mb- font-thin ri-speed-up-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
          <div  className="text-center">
            <i className="text-3xl mb- font-thin ri-sticky-note-line"></i>
            <h5 className="text-lg font-medium">10.2</h5>
            <p className="text-sm text-gray-600">Hours</p>
          </div>
        </div>
    </div>
  )
}

export default CaptainDetails