import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';

import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate('/captain-login');
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setCaptain(response.data.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [token]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;







// NEW CODE

// import { Navigate } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { CaptainDataContext } from "../context/CaptainContext";

// const CaptainProtectWrapper = ({ children }) => {
//   const { captain, isLoading } = useContext(CaptainDataContext);
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/captain-login" replace />;
//   }

//   //  wait until captain is resolved
//   if (isLoading) {
//     return <p>Checking captain...</p>;
//   }

//   return children;
// };

// export default CaptainProtectWrapper;
