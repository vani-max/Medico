import { useState ,createContext, useEffect } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext = createContext();

const AdminContextProvider = (props) =>{
    const [atoken, setaToken] = useState(() => {
  try {
    return localStorage.getItem('atoken') || '';
  } catch (error) {
    return error.message;
  }
});
useEffect(() => {
  try {
    if (atoken) {
      localStorage.setItem('atoken', atoken);
    } else {
      localStorage.removeItem('atoken');
    }
  } catch (e) {
    console.warn('localStorage error', e);
  }
}, [atoken]);

    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors,setDoctors] = useState([])
    const [appointments, setAppointments] = useState([])
    async function getAllDoctors(){
        try{
            const {data} = await axios.post(backendurl + '/api/admin/all-doctors' , {} , {headers:{atoken}});
            if(data.success){
                setDoctors(data.doctors)
                console.log(data.doctors)
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    async function changeAvailability(docId){
        try{
            const {data} = await axios.post(backendurl + '/api/admin/change-availability', {docId}, {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    async function getAllAppointments() {
        try {
            const {data} = await axios.get(backendurl + '/api/admin/appointments' , {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                setAppointments(data.appointments)
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    async function cancelApp(appointmentId) {
        try {
            const {data} = await axios.post(backendurl + '/api/admin/cancel-appointment' ,{appointmentId},  {headers:{atoken}})
            if(data.success){
                toast.success(data.message)
                getAllAppointments()
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value={
        atoken, setaToken,backendurl, doctors, getAllDoctors, changeAvailability, appointments, setAppointments,getAllAppointments
        , cancelApp
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;