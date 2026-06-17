import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center h-150 pt-8  flex flex-col w-full justify-between bg-[url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop')]">

        <img
          className="w-24 ml-8"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber Logo"
        />

        <div className="bg-white pb-1 px-4 py-4">
          <h2 className="text-3xl font-bold">Get Started with Uber</h2>
          <Link to="/login" className="w-full flex items-center justify-center bg-black text-white py-3 mt-5">
            Continue
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Start











// NEW CODE 

// import React from "react";
// import { Link } from "react-router-dom";

// const Start = () => {
//   return (
//     <div>
//       <div
//         className="h-screen bg-cover bg-center 
//         bg-[url('https://images.unsplash.com/photo-1527603815363-e79385e0747e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww')] 
//         pt-8 flex justify-between flex-col w-full"
//       >
//         <img
//           className="w-22 ml-16"
//           src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
//           alt=""
//         />
//         <div className="bg-white pb-7 py-4 px-4">
//           <h2 className="text-[28px] font-bold">Get Started with Uber</h2>
//           <Link
//             to={"/login"}
//             className="flex items-center justify-center w-full bg-black text-white py-2 rounded-lg mt-4"
//           >
//             Continue
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Start;
