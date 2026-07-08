import React from 'react';

const VehiclePanel = (props) => {
  const fare = props.fare.fares || {};

  // console.log(fare);
  // console.log(fare.duration);

  return (
    <div>
      <h5
        onClick={() => props.setVehiclePanel(false)}
        className="p-1 absolute top-0 text-center w-[90%]"
      >
        <i className="text-3xl text-gray-300 ri-arrow-down-wide-fill"></i>
      </h5>

      <h2 className="text-2xl font-semibold mb-5">Choose a Vehicle</h2>

      {/* CAR */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehiclePanel(false);
          props.selectVehicle('car');
        }}
        className="w-full border-gray-200 border-2 mb-2 rounded-lg active:border-black flex p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DQB8VsnMB2MmKSO6v128C2E1h-fUkWbxBXSGw1vSpw&s"
          alt="car"
        />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberGo{' '}
            <span>
              <i className="ri-user-3-fill">4</i>
            </span>
          </h4>
          <h4 className="font-medium text-sm">
            {fare.duration || '2 mins away'}
          </h4>
          <p className="text-xs text-gray-600">Affordable, compact rides</p>
        </div>

        <h2 className="text-lg font-semibold">${fare.car || 0}</h2>
      </div>

      {/* BIKE */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehiclePanel(false);
          props.selectVehicle('bike');
        }}
        className="w-full border-gray-200 border-2 mb-2 rounded-lg active:border-black flex p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVjRAoYVgWlss_HyVwOUPTcZdzRvnPNNUg7w&s"
          alt="bike"
        />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            Moto{' '}
            <span>
              <i className="ri-user-3-fill">1</i>
            </span>
          </h4>
          <h4 className="font-medium text-sm">
            {' '}
            {fare.duration || '3 mins away'}
          </h4>
          <p className="text-xs text-gray-600">Affordable, motorcycle rides</p>
        </div>

        <h2 className="text-lg font-semibold">${fare.bike || 0}</h2>
      </div>

      {/* AUTO */}
      <div
        onClick={() => {
          props.setConfirmRide(true);
          props.setVehiclePanel(false);
          props.selectVehicle('auto');
        }}
        className="w-full border-gray-200 border-2 mb-2 rounded-lg active:border-black flex p-3 items-center justify-between"
      >
        <img
          className="h-12"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6o89EzpWQuyHlR4xcLXzYQ3W3nifSnCHsCA&s"
          alt="auto"
        />

        <div className="ml-2 w-1/2">
          <h4 className="font-medium text-base">
            UberAuto{' '}
            <span>
              <i className="ri-user-3-fill">3</i>
            </span>
          </h4>
          <h4 className="font-medium text-sm">
            {' '}
            {fare.duration || '3 mins away'}
          </h4>
          <p className="text-xs text-gray-600">Affordable auto rides</p>
        </div>

        <h2 className="text-lg font-semibold">${fare.auto || 0}</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
