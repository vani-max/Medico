import React from 'react'
import logo from "../assets/logo.jpg"
const Footer = () => {
  return (
  <div className='md:mx-10'>
  <div className='grid grid-cols-1 sm:grid-cols-3 gap-14 my-10 mt-40 text-sm items-start'>

    {/* left */}
    <div className="flex flex-col gap-4">
      <img src={logo} alt="" className='w-20' />
      <p className='w-full md:w-4/5 text-gray-600 leading-6'>
        Our platform simplifies doctor-patient interactions by offering secure, fast,
        and reliable appointment booking anytime, anywhere.
      </p>
    </div>

    {/* center */}
    <div className="flex flex-col gap-4">
      <p className='text-xl font-medium'>COMPANY</p>
      <ul className='flex flex-col gap-2 text-gray-600'>
        <li>Home</li>
        <li>About Us</li>
        <li>Contact Us</li>
        <li>Privacy Policy</li>
      </ul>
    </div>

    {/* right */}
    <div className="flex flex-col gap-4">
      <p className='text-xl font-medium'>GET IN TOUCH</p>
      <ul className='flex flex-col gap-2 text-gray-600'>
        <li>+91-7583467923</li>
        <li>medico@gmail.com</li>
      </ul>
    </div>

  </div>

  <hr />

  <p className='py-5 text-sm text-center'>
    Copyright 2025 @ Medico - All Rights Reserved
  </p>
</div>


  )
}

export default Footer




