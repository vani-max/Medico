import React,{ createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

function AppContextProvider(props){
    const currency = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setDoctors]=useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    async function getDoctorsData(){
        try{
            const res = await axios.get(backendUrl + '/api/doctor/list')
            if(res.data.success){
                setDoctors(res.data.doctors)
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    async function loadUserProfileData(){
        try{
            const res =await axios.get(`${backendUrl}/api/user/get-profile`, {headers: { Authorization: `Bearer ${token}` }})
            if(res.data.success){
                setUserData(res.data.userData)
            }else{
                toast.error(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    const value = {
        doctors,currency,token,setToken,backendUrl, userData, setUserData, loadUserProfileData, setDoctors, getDoctorsData
    }

    useEffect(()=>{
        getDoctorsData()
    },[])

    useEffect(()=>{
        if(token){
            loadUserProfileData()
        }else{
            setUserData(false)
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;