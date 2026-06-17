import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const CaptainLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => {
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default CaptainLogout;
