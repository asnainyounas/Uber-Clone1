import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import LookingForDrivers from "../components/LookingForDrivers";
import WaitingForDriver from "../components/WaitingForDrivers";
import ConfirmRide from "../components/ConfirmRide";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setWaitingForDriver] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);

  // ✅ IMPORTANT FIX: missing states you forgot
  const [fare] = useState({
    car: 120,
    bike: 60,
    auto: 80,
  });

  const [vehicleType, setVehicleType] = useState("car");

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  // PANEL ANIMATION
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
      });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
      });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  // VEHICLE PANEL
  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      transform: vehiclePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehiclePanel]);

  // CONFIRM PANEL
  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      transform: confirmRidePanel ? "translateY(0)" : "translateY(100%)",
    });
  }, [confirmRidePanel]);

  // VEHICLE FOUND
  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      transform: vehicleFound ? "translateY(0)" : "translateY(100%)",
    });
  }, [vehicleFound]);

  // WAITING DRIVER
  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      transform: waitingForDriver ? "translateY(0)" : "translateY(100%)",
    });
  }, [waitingForDriver]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* LOGO */}
      <img
        className="w-16 absolute left-5 top-5"
        src="https://www.pngall.com/wp-content/uploads/4/Uber-Logo-PNG-Free-Image.png"
        alt=""
      />

      {/* BACKGROUND */}
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      {/* INPUT PANEL */}
      <div className="absolute flex flex-col justify-end h-screen top-0 w-full">
        <div className="h-[30%] p-6 bg-white relative">
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-6 top-6 text-2xl"
          >
            <i className="ri-arrow-down-wide-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a Trip</h4>

          <form onSubmit={submitHandler}>
            <input
              onClick={() => setPanelOpen(true)}
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg w-full mt-5 rounded-lg"
              type="text"
              placeholder="Add a Pickup location"
            />

            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-2 text-lg w-full mt-2 rounded-lg"
              type="text"
              placeholder="Enter Your Destination"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
        </div>
      </div>

      {/* VEHICLE PANEL */}
      <div
        ref={vehiclePanelRef}
        className="fixed w-full bottom-0 px-3 py-7 translate-y-full bg-white"
      >
        <VehiclePanel
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
          setVehicleType={setVehicleType}
        />
      </div>

      {/* CONFIRM RIDE */}
      <div
        ref={confirmRidePanelRef}
        className="fixed w-full bottom-0 px-3 py-7 translate-y-full bg-white"
      >
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* FIND DRIVER */}
      <div
        ref={vehicleFoundRef}
        className="fixed w-full bottom-0 px-3 py-7 translate-y-full bg-white"
      >
        <LookingForDrivers
  pickup={pickup}
  destination={destination}
  fare={fare}
  vehicleType={vehicleType}
/>
      </div>

      {/* WAITING DRIVER */}
      <div
        ref={waitingForDriverRef}
        className="fixed w-full bottom-0 px-3 py-7 translate-y-full bg-white"
      >
        <WaitingForDriver
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  );
};

export default Home;