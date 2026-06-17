import React from 'react';

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5
        onClick={() => props.setWaitingForDriver(false)}
        className="p-1 absolute top-0 text-center w-[90%]"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <div className="flex items-center justify-between">
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DQB8VsnMB2MmKSO6v128C2E1h-fUkWbxBXSGw1vSpw&s"
          alt=""
        />
        <div className="text-right">
          <h2 className="text-lg font-semibold ">
            {props.ride?.captain?.fullname.firstname}
          </h2>
          <h4 className="text-xl font-semibold -my-1">
            {props.ride?.captain?.vehicle?.plate}
          </h4>
          <p className="text-sm text-gray-600">
            {props.ride?.captain?.vehicle?.model}
          </p>
          <h1 className="text-sm text-gray-600">{props.ride?.otp}</h1>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center">
        <div className="w-full mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Pickup</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
            <i className="text-lg ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg font-medium">Destination</h3>
              <p className="text-sm -mt-1 text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="text-lg ri-currency-fill"></i>
            <div>
              <h3 className="text-lg font-medium">${props.ride?.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
