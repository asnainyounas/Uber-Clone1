import React from 'react';

const LookingForDriver = (props) => {
  const fare = props.fare.fares || {};
  const vehicleType = props.vehicleType || 'car';

  return (
    <div>
      <h5
        onClick={() => props.setVehicleFound(false)}
        className="p-1 absolute top-0 text-center w-[90%]"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h2 className="text-2xl font-semibold mb-5">Looking for a Driver</h2>

      <div className="flex flex-col justify-between items-center">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DQB8VsnMB2MmKSO6v128C2E1h-fUkWbxBXSGw1vSpw&s"
          alt="driver"
        />

        <div className="w-full mt-5">
          {/* PICKUP */}
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm text-gray-600">
                {props.pickup || 'Not set'}
              </p>
            </div>
          </div>

          {/* DESTINATION */}
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm text-gray-600">
                {props.destination || 'Not set'}
              </p>
            </div>
          </div>

          {/* FARE */}
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">${fare[vehicleType] || 0}</h3>
              <p className="text-sm text-gray-600">Cash Payment</p>
            </div>
          </div>

          {/* OTP
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-lock-password-fill"></i>
            <div>
              <h3 className="text-lg font-medium">
                {props.ride?.otp || 'Not set'}
              </h3>
              <p className="text-sm text-gray-600">OTP</p>
            </div>
          </div> */}

          
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
