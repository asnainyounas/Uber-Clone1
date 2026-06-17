import React, { useRef, useState } from 'react'
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';


const CaptainHome = () => {

const [ ridePopupPanel, setRidePopupPanel ] = useState(true)
    const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)

  const ridePopupPanelRef = useRef(null)
    const confirmRidePopupPanelRef = useRef(null)   


     useGSAP(function () {
        if (ridePopupPanel) {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(ridePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ ridePopupPanel ])

    useGSAP(function () {
        if (confirmRidePopupPanel) {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePopupPanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePopupPanel ])

  return (
    <div className="h-screen">
      <div className="fixed p-6 top-0 flex items-center justify-between w-screen">
        <img
          className="w-16"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <Link
          to="/captain-home"
          className=" h-10 w-10 bg-white flex items-center justify-center rounded-full"
        >
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>
      <div className="h-3/5">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-2/5 p-6">
       <CaptainDetails/>
       </div>
       <div ref={ridePopupPanelRef}  className="fixed w-full z-10 bottom-0   px-3 py-7  pt-12 bg-white">
       <RidePopUp setRidePopupPanel={setRidePopupPanel} seConfirmRidePopupPanel={setConfirmRidePopupPanel}/>
      </div>
       <div ref={confirmRidePopupPanelRef}  className="fixed w-full h-screen z-10 bottom-0   px-3 py-7  pt-12 bg-white">
       <ConfirmRidePopUp seConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />
      </div>
      
    </div>
  );
};

export default CaptainHome;








// NEW CODE

// import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
// import CaptainDetails from '../components/CaptainDetails';
// import RidePopup from '../components/RidePopup';
// import { useGSAP } from '@gsap/react';
// import gsap from 'gsap';
// import ConfirmRidePopup from '../components/ConfirmRidePopup';
// import { useContext } from 'react';
// import { SocketContext } from '../context/SocketContext';
// import { CaptainDataContext } from '../context/CaptainContext';
// import { useEffect } from 'react';
// import axios from 'axios';

// const CaptainHome = () => {
//   const [ridePopupPanel, setRidePopupPanel] = useState(false);
//   const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
//   const [ride, setRide] = useState(null);

//   const ridePopupPanelRef = useRef(null);
//   const confirmRidePopupPanelRef = useRef(null);

//   const { socket } = useContext(SocketContext);
//   const { captain } = useContext(CaptainDataContext);

//   useEffect(() => {
//     if (captain) {
//       socket.emit('join', { userId: captain._id, userType: 'captain' });
//     }

//     const updateLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const location = {
//               ltd: position.coords.latitude,
//               lng: position.coords.longitude,
//             };
//             socket.emit('update-location-captain', {
//               userId: captain._id,
//               location,
//             });
//           },
//           (error) => {
//             console.error('Error getting location:', error);
//           }
//         );
//       }
//     };

//     const locationInterval = setInterval(updateLocation, 10000);
//     updateLocation();

//     return () => {
//       clearInterval(locationInterval);
//     };
//   }, [captain, socket]);

//   socket.on('new-ride', (data) => {
//     setRide(data);
//     setRidePopupPanel(true);
//   });

//     async function confirmRide() {
//       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/ride/confirm`, {
//         rideId: ride._id,
//         captainId: captain._id,
//       }, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem('token')}`,
//         },
//       });
//       setRide(response.data);
//       setConfirmRidePopupPanel(true);
//     }

//   useGSAP(
//     function () {
//       if (ridePopupPanel) {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(ridePopupPanelRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [ridePopupPanel]
//   );
//   useGSAP(
//     function () {
//       if (confirmRidePopupPanel) {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: 'translateY(0)',
//         });
//       } else {
//         gsap.to(confirmRidePopupPanelRef.current, {
//           transform: 'translateY(100%)',
//         });
//       }
//     },
//     [confirmRidePopupPanel]
//   );

//   return (
//     <div className="h-screen">
//       <div className="fixed p-3 top-0 flex items-center justify-between w-screen">
//         <img
//           className="w-16"
//           src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
//           alt="uber-logo"
//         />
//         <Link
//           to={'/captain-login'}
//           className="h-10 w-10 bg-white flex justify-center items-center rounded-full"
//         >
//           <i className="text-xl font-medium  ri-logout-box-r-line"></i>
//         </Link>
//       </div>

//       <div className="h-3/5">
//         <img
//           className="h-full w-full object-cover"
//           src="https://www.researchgate.net/publication/320839993/figure/fig3/AS:556713386676224@1509742222719/Map-in-Uber-application-tracking-user-in-a-Yellow-Cab.png"
//           alt="temperory img"
//         />
//       </div>

//       <div className="h-2/5 p-6">
//         <CaptainDetails />
//       </div>

//       <div
//         ref={ridePopupPanelRef}
//         className="fixed w-full translate-y-full bg-white px-3 py-10 pt-12  z-10 bottom-0"
//       >
//         <RidePopup
//           ride={ride}
//           setRidePopupPanel={setRidePopupPanel}
//           setConfirmRidePopupPanel={setConfirmRidePopupPanel}
//         />
//       </div>

//       <div
//         ref={confirmRidePopupPanelRef}
//         className="fixed w-full translate-y-full h-screen bg-white px-3 py-10 pt-12  z-10 bottom-0"
//       >
//         <ConfirmRidePopup 
//         ride={ride}
//         setRidePopupPanel={setRidePopupPanel}
//         setConfirmRidePopupPanel={setConfirmRidePopupPanel} />
//       </div>
//     </div>
//   );
// };

// export default CaptainHome;
