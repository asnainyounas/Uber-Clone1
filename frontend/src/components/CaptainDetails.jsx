import React, { useContext } from 'react';
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainDetails = () => {
  const { captain, isLoading } = useContext(CaptainDataContext);

  // always log to understand lifecycle
  console.log('Consumer captain:', captain);

  // still loading → don't check captain yet
  if (isLoading) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  // loading finished but no data
  if (!captain || !captain.fullname) {
    return <p className="text-center mt-4">No captain data</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAp3Z1hXfTVTKtbw3vE75-rtfr1ZCFcPSw4A&s"
            alt="captain"
          />
          <h4 className="text-lg font-medium">
            {captain.fullname.firstname} {captain.fullname.lastname}
          </h4>
        </div>

        <div className="text-right">
          <h4 className="text-xl font-semibold">$20.99</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex mt-6 p-3 bg-gray-100 rounded-xl justify-center gap-5">
        <div className="text-center">
          <i className="text-3xl ri-timer-2-line"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        <div className="text-center">
          <i className="text-3xl ri-speed-up-fill"></i>
          <h5 className="text-lg font-medium">120 km</h5>
          <p className="text-sm text-gray-600">Distance Covered</p>
        </div>

        <div className="text-center">
          <i className="text-3xl ri-booklet-line"></i>
          <h5 className="text-lg font-medium">Notes</h5>
          <p className="text-sm text-gray-600">Nothing</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
