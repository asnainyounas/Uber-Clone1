import React from 'react'
import { Link } from 'react-router-dom'
const Riding = (props) => {
  return (
    <div>
        <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
           <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/max/1280/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
            </div>
            <div className='h-1/2 p-4'>
             <div className='flex items-center justify-between'>
        <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain.fullname.firstname}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain.vehicle.plate}</h4>
          <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
          <h1 className='text-lg font-semibold'>  {props.ride?.otp} </h1>
        </div>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-5'>
         
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className='text-lg font-medium'>562/11-A</h3>
              <p className='text-sm -mt-1 text-gray-600'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line"></i>
            <div>
              <h3 className='text-lg font-medium'>₹34535 </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash Cash</p>
            </div>
          </div>
        </div>
      </div>
        <button  className='w-full text-white rounded-lg bg-green-600 p-2 font-semibold'>Make a Payment</button>
            </div>
    </div>
  )
}

export default Riding











// NEW CODE 

// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { SocketContext } from "../context/SocketContext";
// import LiveTracking from "../components/LiveTracking";

// const Riding = (props) => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const {ride} = location.state || {};

//   const {socket} = useContext(SocketContext);

//   socket.on('ride-ended', data => {
//     navigate('/home');
//   });

  
//   return (
//     <div className="h-screen">
//       <Link to={'/home'}  className="fixed right-2 top-2 h-10 w-10 bg-white flex justify-center items-center rounded-full">
//         <i className="text-xl font-medium  ri-home-4-line"></i>
//       </Link>

//       <div className="h-1/2">
//       {/* <LiveTracking /> */}
//         <img
//           className="h-full w-full object-cover"
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSixb3-y80u_w_UbHzb1pmvRu2WYSWgweAG3w&s"
//           alt="temperory img"
//         />
//       </div>

//       <div className="h-1/2 p-4">
//         <div className="flex items-center justify-between">
//           <img
//             className="h-12"
//             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6DQB8VsnMB2MmKSO6v128C2E1h-fUkWbxBXSGw1vSpw&s"
//             alt=""
//           />
//           <div className="text-right">
//             <h2 className="text-lg font-semibold ">{ride?.captain.fullname.firstname}</h2>
//             <h4 className="text-xl font-semibold -my-1">{ride?.captain.vehicle.plate}</h4>
//             <p className="text-sm text-gray-600">{ride?.captain.vehicle.vehicleType}</p>
//           </div>
//         </div>

//         <div className="flex flex-col justify-between items-center">
//           <div className="w-full mt-5">
//             <div className="flex items-center gap-5 p-3 border-b-2 border-gray-100">
//               <i className="text-lg ri-map-pin-user-fill"></i>
//               <div>
//                 <h3 className="text-lg font-medium">Destination</h3>
//                 <p className="text-sm -mt-1 text-gray-600">
//                   {ride?.destination}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-5 p-3">
//               <i className="text-lg ri-currency-fill"></i>
//               <div>
//                 <h3 className="text-lg font-medium">${ride?.fare} </h3>
//                 <p className="text-sm -mt-1 text-gray-600">Cash Cash</p>
//               </div>
//             </div>
//           </div>
//         </div>



//         <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
//           Make a Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Riding;
