import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/admin/AdminContext'
import { useEffect } from 'react'
import {assets} from "../../assets/assets"

const AllAppointment = () => {
  const {atoken, appointments,getAllAppointments, cancelApp} = useContext(AdminContext)
  useEffect(()=>{
    if(atoken){
      getAllAppointments()
    }
  },[atoken])

  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointments</p>
        <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Date & Time</p>
            <p>Doctor Name</p>
            <p>Fees</p>
            <p>Action</p>
          </div >
          {appointments.map((item,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b'>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img src={item.userData.image} alt="" className='w-8 rounded-full'/>
                <p>{item.userData.name}</p>
              </div>
              <p>{item.slotDate}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img src={item.docData.image} alt="" className='w-8 rounded-full'/>
                <p>{item.docData.name}</p>
              </div>
              <p>{item.amount}</p>
              {item.cancelled ? <p className='text-red-400 text-xs'>Cancelled</p> :
              <img src={assets.cancel_icon} alt="" className='w-10 cursor-pointer' onClick={()=>cancelApp(item._id)}/>}
            </div>
          ))}
        </div>
    </div>
  )
}

export default AllAppointment