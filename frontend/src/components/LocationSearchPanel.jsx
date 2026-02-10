import React from 'react'

const LocationSearchPanel = (props) => {
    
    const Location=[
        " Asnain khan location saddar",
        " Asnain khan location gulberg",
        " Asnain khan location karak",
        " Asnain khan location pesahwar",
    ]
  return (
    <div onClick={()=>{
        props.setVehiclePanel(true)
        props.setPanelOpen(false)
    }}>
        {
            Location.map(function(elem,idx){
                  return  <div key={idx} className='flex items-center border-2 p-3 border-gray-100 active:border-black rounded-xl gap-4 my-2 justify-start'>
            <h2 className='flex items-center justify-center w-11 rounded-full h-8 bg-[#eee]'>
                <i className="ri-focus-3-line text-xl"></i>
            </h2>
            <h4 className='font-medium'>
                {elem}
            </h4>
        </div>
            })

            
        }
       

    </div>
  )
}

export default LocationSearchPanel