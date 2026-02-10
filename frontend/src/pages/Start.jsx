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
