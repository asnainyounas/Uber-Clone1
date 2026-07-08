// NEW & WORKING CODE
import React, { useContext, useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';

import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDrivers';
import WaitingForDriver from '../components/WaitingForDrivers';
import { SocketContext } from '../context/SocketContext';
import UserContext, { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRide, setConfirmRide] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  useEffect(() => {
    if (user) {
      socket.emit('join', { userId: user._id, userType: 'user' });
    }
  }, [user]);

  // SOCKET.IO
  useEffect(() => {
    if (!socket) return;

    socket.on('confirm-ride', (ride) => {
      setWaitingForDriver(true);
      setRide(ride);
    });

    socket.on('ride-started', (ride) => {
      setWaitingForDriver(false);
      navigate('/riding', { state: { ride } });
    });

    return () => {
      socket.off('confirm-ride');
      socket.off('ride-started');
    };
  }, [socket]);

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length < 3) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setPickupSuggestions(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };
  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length < 3) {
      setDestinationSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { input: value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setDestinationSuggestions(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: '70%',
          padding: 24,
        });
        gsap.to(panelCloseRef.current, {
          opacity: '1',
        });
      } else {
        gsap.to(panelRef.current, {
          height: '0%',
          padding: 0,
        });
        gsap.to(panelCloseRef.current, {
          opacity: '0',
        });
      }
    },
    [panelOpen]
  );

  useGSAP(
    function () {
      if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [vehiclePanel]
  );

  useGSAP(
    function () {
      if (confirmRide) {
        gsap.to(confirmRideRef.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(confirmRideRef.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [confirmRide]
  );

  useGSAP(
    function () {
      if (vehicleFound) {
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [vehicleFound]
  );

  useGSAP(
    function () {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)',
        });
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)',
        });
      }
    },
    [waitingForDriver]
  );

  {
    /* function for finding trip  */
  }
  async function findTrip() {
    if (pickup.length < 3 || destination.length < 3) return;

    try {
      setVehiclePanel(true);
      setPanelOpen(false);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/get-fare`,
        {
          params: { pickup, destination },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      setFare(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  
    /* function for creating ride */
  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        {
          pickup,
          destination,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  }

  return (
    <div className="h-screen relative overflow-hidden">
      {/* LOGO */}
      <img
        className="w-16 absolute top-3 left-3"
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt="uber-logo"
      />
      

      {/* MAP || Bg-img  */}
      <div className="h-screen w-screen">
        {/* LIVE TRACKING MAP  */}
        {/* <LiveTracking />   */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt="temperory img"
        />
      </div>

      {/* PANEL FORM FOR PICK-UP AND DESTINATION & SUGGESTIONS*/}
      <div className="flex flex-col justify-end h-screen absolute w-full top-0">
        {/* PANEL FORM FOR PICK-UP AND DESTINATION*/}
        <div className="bg-white p-5 h-[30%] relative">
          <h4
            className="absolute top-5 right-5 text-3xl opacity-0"
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h4>

          <h4 className="text-2xl font-semibold">Find a trip</h4>

          {/* FORM for pick-up and destination */}
          <form>
            <div className="line absolute h-14 w-1 top-[36%] left-8 rounded-full bg-gray-900"></div>
            <input
              value={pickup}
              onChange={handlePickupChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('pickup');
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-4"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              value={destination}
              onChange={handleDestinationChange}
              onClick={() => {
                setPanelOpen(true);
                setActiveField('destination');
              }}
              className="bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
          {panelOpen && !vehiclePanel && (
            <button
              onClick={findTrip}
              className="bg-black text-white px-4 py-2 rounded-lg mt-3 w-full"
            >
              Find Trip
            </button>
          )}
        </div>

        {/* PANEL FOR SUGGESTIONS */}
        <div ref={panelRef} className="h-[0%] bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === 'pickup' ? pickupSuggestions : (
                destinationSuggestions
              )
            }
            setVehiclePanel={setVehiclePanel}
            setPanelOpen={setPanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* PANEL FOR CHOOSING VEHICLE */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setVehiclePanel={setVehiclePanel}
          setConfirmRide={setConfirmRide}
        />
      </div>

      {/* PANEL FOR CONFIRMING RIDE */}
      <div
        ref={confirmRideRef}
        className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRide={setConfirmRide}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* LOOKING FOR DRIVER PANEL */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bg-white px-3 py-10 pt-12 translate-y-full z-10 bottom-0"
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          ride={ride}
          vehicleType={vehicleType}
          createRide={createRide}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>

       {/* WAITING FOR DRIVER PANEL */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full bg-white px-3 py-10 pt-12  z-10 bottom-0"
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;
