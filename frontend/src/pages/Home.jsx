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
















// NEW CODE

// import React, { useRef, useState } from 'react';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import axios from 'axios';

// import LocationSearchPanel from '../components/LocationSearchPanel';
// import VehiclePanel from '../components/VehiclePanel';
// import ConfirmRide from '../components/ConfirmRide';
// import LookingForDriver from '../components/LookingForDriver';
// import WaitingForDriver from '../components/WaitingForDriver';
// import { useContext } from 'react';
// import { SocketContext } from '../context/SocketContext';
// import { UserDataContext } from '../context/UserContext';
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LiveTracking from '../components/LiveTracking';

// const Home = () => {
//   const [pickup, setPickup] = useState('');
//   const [destination, setDestination] = useState('');
//   const [panelOpen, setPanelOpen] = useState(false);
//   const [vehiclePanel, setVehiclePanel] = useState(false);
//   const [confirmRidePanel, setConfirmRidePanel] = useState(false);
//   const [vehicleFound, setVehicleFound] = useState(false);
//   const [waitingForDriver, setWaitingForDriver] = useState(false);
//   const [pickupSuggestions, setPickupSuggestions] = useState([]);
//   const [destinationSuggestions, setDestinationSuggestions] = useState([]);
//   const [activeField, setActiveField] = useState(null);
//   const [fare, setFare] = useState({});
//   const [vehicleType, setVehicleType] = useState(null);
//   const [ride, setRide] = useState(null);

//   const panelRef = useRef(null);
//   const panelCloseRef = useRef(null);
//   const vehiclePanelRef = useRef(null);
//   const confirmRideRef = useRef(null);
//   const vehicleFoundRef = useRef(null);
//   const waitingForDriverRef = useRef(null);

//   const navigate = useNavigate();

//   const { socket } = useContext(SocketContext);
//   const { user } = useContext(UserDataContext);

//   useEffect(() => {
//     if (user) {
//       socket.emit('join', { userId: user._id, userType: 'user' });
//     }
//   }, [user]);

//   socket.on('confirm-ride', (ride) => {
//     setWaitingForDriver(true);
//     setRide(ride);
//   });

//   socket.on('ride-started', ride => {
//     setWaitingForDriver(false);
//     navigate('/riding', { state: { ride } });
//   })



//   const handlePickupChange = async (e) => {
//     setPickup(e.target.value);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setPickupSuggestions(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleDestinationChange = async (e) => {
//     setDestination(e.target.value);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
//         {
//           params: { input: e.target.value },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       setDestinationSuggestions(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const submitHandler = (e) => {
//     e.preventDefault();
//   };

//   useGSAP(
//     function () {
//       if (panelOpen) {
//         gsap.to(panelRef.current, {
//           height: '70%',
//           padding: 24,
//         });
//         gsap.to(panelCloseRef.current, {
//           opacity: '1',
//         });
//       } else {
//         gsap.to(panelRef.current, {
//           height: '0%',
//           padding: 0,
//         });
//         gsap.to(panelCloseRef.current, {
//           opacity: '0',
//         });
//       }
//     },
//     [panelOpen]
//   );

//   useGSAP(
//     function () {
//       if (vehiclePanel) {
//         gsap.to(vehiclePanelRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(vehiclePanelRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [vehiclePanel]
//   );

//   useGSAP(
//     function () {
//       if (confirmRidePanel) {
//         gsap.to(confirmRideRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(confirmRideRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [confirmRidePanel]
//   );

//   useGSAP(
//     function () {
//       if (vehicleFound) {
//         gsap.to(vehicleFoundRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(vehicleFoundRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [vehicleFound]
//   );

//   useGSAP(
//     function () {
//       if (waitingForDriver) {
//         gsap.to(waitingForDriverRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(waitingForDriverRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [waitingForDriver]
//   );

//   async function findTrip() {
//     try {
//       setVehiclePanel(true);
//       setPanelOpen(false);

//       const response = await axios.get(
//         `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
//         {
//           params: { pickup, destination },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       setFare(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   }

//   async function createRide() {
//     try {
//       const response = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/rides/create`,
//         {
//           params: { pickup, destination, vehicleType },
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );
//       console.log(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <div className="h-screen relative overflow-hidden">
//       <img
//         className="w-16 absolute top-3 left-3"
//         src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
//         alt="uber-logo"
//       />
//       <div className="h-screen w-screen">
//         {/* LIVE TRACKING MAP  */}
//         {/* <LiveTracking />   */}
//         <img
//           className="h-full w-full object-cover"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixb3-y80u_w_UbHzb1pmvRu2WYSWgweAG3w&s"
//           alt="temperory img"
//         />
//       </div>
//       <div className="flex flex-col justify-end h-screen absolute w-full top-0">
//         <div className="bg-white p-5 h-[30%] relative">
//           <h4
//             className="absolute top-5 right-5 text-3xl opacity-0"
//             ref={panelCloseRef}
//             onClick={() => setPanelOpen(false)}
//           >
//             <i className="ri-arrow-down-wide-line"></i>
//           </h4>
//           <h4 className="text-2xl font-semibold">Find a trip</h4>
//           <form>
//             <div className="line absolute h-16 w-1 top-[42%] left-10 rounded-full bg-gray-900"></div>
//             <input
//               value={pickup}
//               onChange={handlePickupChange}
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField('pickup');
//               }}
//               className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
//               type="text"
//               placeholder="Add a pick-up location"
//             />
//             <input
//               value={destination}
//               onChange={handleDestinationChange}
//               onClick={() => {
//                 setPanelOpen(true);
//                 setActiveField('destination');
//               }}
//               className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
//               type="text"
//               placeholder="Enter your destination"
//             />
//           </form>
//           {panelOpen && !vehiclePanel && (
//             <button
//               onClick={findTrip}
//               className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
//             >
//               Find Trip
//             </button>
//           )}
//         </div>
//         <div ref={panelRef} className="h-[0%] bg-white">
//           <LocationSearchPanel
//             suggestions={
//               activeField === 'pickup'
//                 ? pickupSuggestions
//                 : destinationSuggestions
//             }
//             setVehiclePanel={setVehiclePanel}
//             setPanelOpen={setPanelOpen}
//             setPickup={setPickup}
//             setDestination={setDestination}
//             activeField={activeField}
//           />
//         </div>
//       </div>
//       <div
//         ref={vehiclePanelRef}
//         className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
//       >
//         <VehiclePanel
//           selectVehicle={setVehicleType}
//           fare={fare}
//           setVehiclePanel={setVehiclePanel}
//           setConfirmRidePanel={setConfirmRidePanel}
//         />
//       </div>
//       <div
//         ref={confirmRideRef}
//         className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
//       >
//         <ConfirmRide
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           createRide={createRide}
//           setConfirmRidePanel={setConfirmRidePanel}
//           setVehicleFound={setVehicleFound}
//         />
//       </div>

//       <div
//         ref={vehicleFoundRef}
//         className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
//       >
//         <LookingForDriver
//           pickup={pickup}
//           destination={destination}
//           fare={fare}
//           vehicleType={vehicleType}
//           createRide={createRide}
//           setVehicleFound={setVehicleFound}
//           setWaitingForDriver={setWaitingForDriver}
//         />
//       </div>

//       <div
//         ref={waitingForDriverRef}
//         className="fixed w-full bg-white px-3 py-10 pt-12  z-10 bottom-0"
//       >
//         <WaitingForDriver 
//         ride={ride}
//         setVehicleFound={setVehicleFound}
//         setWaitingForDriver={setWaitingForDriver} />
//       </div>
//     </div>
//   );
// };

// export default Home;
