import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency , backendUrl, token, getDoctorsData} = useContext(AppContext);
  const navigate = useNavigate()
  const daysOfWeek = ['SUN','MON','TUE','WED','THUR','FRI','SAT']
  const [docInfo, setDocInfo] = useState(null);
  const [docSlots,setDocSlots] = useState([])
  const [slotIndex,setSlotIndex] = useState(0)
  const [slotTime, setSlottime] = useState('')

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;

    const info = doctors.find(doc => doc._id === docId);
    setDocInfo(info || null);
    console.log(info)
  }, [doctors, docId]);

  const GetAvailableSlots = async() =>{
    setDocSlots([])
    let today = new Date()
    for(let i=0; i<7 ; i++){
      let curr = new Date(today)
      curr.setDate(today.getDate() + i)

      let end = new Date()
      end.setDate(today.getDate() + i)
      end.setHours(21,0,0,0)

      if(today.getDate()===curr.getDate()){
        curr.setHours(curr.getHours()>10 ? curr.getHours()+1 : 10)
        curr.setMinutes(curr.getMinutes()>30 ? 30:0)
      }else{
        curr.setHours(10)
        curr.setMinutes(0)
      }
      let timeSlots = []
      while(curr<end){
        let formatTime = curr.toLocaleTimeString([],{hour: "2-digit" , minute : '2-digit'})
        timeSlots.push({
          datetime : new Date(curr),
          time : formatTime
        })
        curr.setMinutes(curr.getMinutes()+30)
      }
      setDocSlots(prev=>[...prev,timeSlots])
    }
  }

  async function bookAppointment() {
    if(!token){
      toast.warn('Login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth()+1
      let year = date.getFullYear()
      const slotDate = day + "_" + month + '_' + year
      const {data} = await axios.post(backendUrl + '/api/user/book-appointment', {docId,slotDate,slotTime}, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  }

  useEffect(()=>{
    GetAvailableSlots()
  },[docInfo])

  useEffect(()=>{
    console.log(docSlots)
  },[docSlots])

  if (!docInfo) return <div>Loading doctor info...</div>;

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
        <img className='bg-[#3b82f6] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
      </div>
      <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
        <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>{docInfo.name} <img src={assets.verified_icon} alt="" className='w-5'/></p>
        <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
          <p>{docInfo.degree}- {docInfo.speciality}</p>
          <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
        </div>
        <div>
          <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
          <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
        </div>
        <p className='text-gray-500 font-medium mt-4'>Appointment Fee: <span className='text-gray-600'>{currency} {docInfo.fees}</span></p>
      </div>
      </div>
      {
        <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
          <p>Booking Slots</p>
          <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
            {
              docSlots.length && docSlots.map((item,index)=>(
                <div key={index} onClick={()=>setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex===index ? 'bg-[#3b82f6] text-white' : 'border border-gray-200'}`}>
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))
            }
          </div>
        </div>
      }
      <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
        {docSlots.length && docSlots[slotIndex].map((item,index)=>(
          <p onClick={()=>setSlottime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#3b82f6] text-white':'text-gray-400 border border-gray-300'}`} key={index}>{item.time.toLowerCase()}</p>
        ))}
      </div>
      <button className='bg-[#3b82f6] text-white text-sm font-light px-14 py-3 rounded-full my-6' onClick={bookAppointment}>Book an appointment</button>
      <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
    </div>
  )
}

export default Appointment;
