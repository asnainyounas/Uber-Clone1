import React, {  useRef, useState } from "react";
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRidePanel from "../components/ConfirmRidePanel";
import LookingForDrivers from "../components/LookingForDrivers";
import WaitingForDriver from "../components/WaitingForDrivers";
const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)

  const [ vehicleFound, setVehicleFound ] = useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const [ panelOpen, setPanelOpen ] = useState(false)
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const submitHandler = (e) => {
    e.preventDefault();
    
  };
   useGSAP(() => {
     if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
    }

  },[panelOpen]);

  useGSAP(()=>{
if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
  },[vehiclePanel])

  useGSAP(()=>{
if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
  },[confirmRidePanel])

  useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

  useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])
  


  return (
    <div className="h-screen relative overflow-hidden">
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"
        alt=""
      />
      <div
     
      className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className=" absolute flex flex-col justify-end h-screen top-0 w-full  ">
        
        <div className="h-[30%] p-6 bg-white relative">
                     <h5 ref={panelCloseRef} onClick={() => {
                        setPanelOpen(false)
                    }} className='absolute opacity-0 right-6 top-6 text-2xl'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>

          <h4 className="text-2xl font-semibold">Find a Trip</h4>
          <form
            onSubmit={(e) => {
              submitHandler(e);
            }}
            action=""
          >
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={pickup}
              onChange={(e) => {
                setPickup(e.target.value);
              }}
              className="bg-[#eee]  px-12 py-2 text-lg w-full mt-5 rounded-lg "
              type="text"
              placeholder="Add a Pickup location"
            />
            <input
              onClick={() => {
                setPanelOpen(true);
              }}
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              className="bg-[#eee]  px-12 py-2 text-lg w-full mt-2 rounded-lg "
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0  bg-white ">
          <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}/>
        </div>
      </div>
      <div ref={vehiclePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-7 translate-y-full pt-12 bg-white">
       <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}/>
      </div>
      <div ref={confirmRidePanelRef} className="fixed w-full z-10 bottom-0 px-3 py-7 translate-y-full pt-12 bg-white">
       <ConfirmRidePanel setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound}/>
      </div>
      <div ref={vehicleFoundRef}  className="fixed w-full z-10 bottom-0 px-3 py-7 translate-y-full pt-12 bg-white">
       <LookingForDrivers />
      </div>
      <div  ref={waitingForDriverRef}  className="fixed w-full z-10 b px-3 py-7 bottom-0 pt-12 bg-white">
       <WaitingForDriver   
      setVehicleFound={setVehicleFound}
                    setWaitingForDriver={setWaitingForDriver}
       waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
};

export default Home;
