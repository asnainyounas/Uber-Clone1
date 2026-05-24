import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const email = localStorage.getItem('verifyEmail');

      const response = await axios.post(
        'http://localhost:5000/users/verify-email',
        {
          otp,
          email,
        }
      );

      alert(response.data.message);

      localStorage.removeItem('verifyEmail');

      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h1 className="text-2xl font-bold mb-4">Verify Email</h1>

        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="border w-full p-3 rounded mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white w-full p-3 rounded"
        >
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;