import bcrypt from 'bcrypt'
import validator from 'validator'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from "../models/doctorModel.js"
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

const addDoctor = async(req,res) =>{
    try{
        const {name,email,password,speciality, degree, experience, about, fees, address} = req.body;
        const imageFile = req.file;
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success:false, message:"Missing Details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please enter a valid emailID"})
        }
        if(password.length<8){
            return res.json({success:false, message:"Please enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name, 
            email,
            image: imageUrl,
            password : hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address : JSON.parse(address),
            date : Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        return res.json({success:true, message : "doctor added"})
    }catch(error){
        return res.status(500).json({success:false, message : error.message})
    }
}

const loginAdmin = async (req,res) => {
    try{
        const {email,password} = req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET);
            return res.json({success:true, token})
        } else{
            return res.json({success:false, message:"Invalid credentials"})
        } 
    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function allDoctor(req,res){
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true, doctors})
    }catch(error){
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function AppointmentAdmin(req,res){
    try {
        const appointments = await appointmentModel.find({})
        return res.json({success:true, appointments})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function adminappcancl(req,res){
    try {
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        res.json({success:true, message:'Appointment cancelled'})
    } catch (error) {
        console.log('listapp error', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {addDoctor,loginAdmin,allDoctor,AppointmentAdmin, adminappcancl};