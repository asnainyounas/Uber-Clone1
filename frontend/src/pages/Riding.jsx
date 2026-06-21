

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Riding = ({ ride }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-screen flex flex-col">
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md z-10"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Ride Animation */}
      <div className="h-1/2">
        <img
          className="h-full w-full object-cover"
          src={
            imgError
              ? 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200'
              : 'https://miro.medium.com/v2/resize:fit:1280/0*gwMx05pqII5hbfmX.gif'
          }
          alt="Ride Tracking"
          onError={() => setImgError(true)}
        />
      </div>

      {/* Ride Details */}
      <div className="h-1/2 p-4">
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Vehicle"
          />

          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride?.captain?.fullname?.firstname || 'Captain'}
            </h2>

            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride?.captain?.vehicle?.plate || 'N/A'}
            </h4>

            <p className="text-sm text-gray-600">
              {ride?.captain?.vehicle?.vehicleType || 'Vehicle'}
            </p>

            <h1 className="text-lg font-semibold">
              OTP: {ride?.otp || '----'}
            </h1>
          </div>
        </div>

        <div className="flex gap-2 justify-between flex-col items-center">
          <div className="w-full mt-5">
            <div className="flex items-center gap-5 p-3 border-b-2">
              <i className="text-lg ri-map-pin-2-fill"></i>

              <div>
                <h3 className="text-lg font-medium">Destination</h3>

                <p className="text-sm -mt-1 text-gray-600">
                  {ride?.destination || 'No destination available'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-5 p-3">
              <i className="ri-currency-line"></i>

              <div>
                <h3 className="text-lg font-medium">
                  Rs. {ride?.fare || 0}
                </h3>

                <p className="text-sm -mt-1 text-gray-600">
                  Cash Payment
                </p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full text-white rounded-lg bg-green-600 p-3 font-semibold mt-4">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;




