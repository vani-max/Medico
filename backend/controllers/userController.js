import validator from 'validator'
import bcrypt from 'bcrypt'
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose';
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';

async function registerUser(req,res){
    try {
        const {name,email,password} = req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"enter a valid email"})
        }
        if(password.length<8){
            return res.json({success:false,message:"enter a strong password"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashed = await bcrypt.hash(password,salt)
        const userData = {
            name,
            email,
            password : hashed
        }

        const newUser = new UserModel(userData);
        const user = await newUser.save()
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
        return res.json({success:true,token})
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}


async function loginUser(req,res){
    try {
        const {email,password} = req.body;
        const user = await UserModel.findOne({email})
        if(!user){
           return res.json({success:false, message:'User does not exists'}) 
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
            return res.json({success:true,token})
        }else{
            return res.json({success:false, message:'Incorrect password'}) 
        }
    } catch (error) {
        console.log(error)
        return res.json({success:false, message:error.message})
    }
}

async function getProfile(req,res){
    try {
    const userId = (req.userId || req.body.userId || '').toString().trim();

    if (!userId) {
      return res.status(400).json({ success: false, message: 'no userId provided' });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ success: false, message: 'invalid user id' });
    }

    const user = await UserModel.findById(userId).select('-password').lean();

    if (!user) {
      return res.status(404).json({ success: false, message: 'user not found', userData: null });
    }

    return res.json({ success: true, userData: user });
  } catch (err) {
    console.log('getProfile error', err);
    return res.status(500).json({ success: false, message: err.message });
  }
}

async function updateProfile(req,res){
    try {
        const {name,phone,address, dob,gender} = req.body;
        const userId = (req.userId || req.body.userId || '').toString().trim();
        const imageFile = req.file;
        if (!name || !phone || !address ||!dob || !gender) {
            return res.status(500).json({ success: false, message:'data missing' });
        }
        await UserModel.findByIdAndUpdate(userId,{name,phone,address : JSON.parse(address) ,dob,gender})
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
            const imageUrl = imageUpload.secure_url;
            await UserModel.findByIdAndUpdate(userId,{image:imageUrl})
        }
        res.json({success:true, message:'profile updated'})
    } catch (error) {
        console.log('getProfile error', error);
        return res.status(500).json({ success: false, message: err.message });
    }
}

async function bookAppointment(req,res){
    try {
        const userId = req.userId || req.body.userId;
        const { docId, slotDate, slotTime } = req.body;
        const docData = await doctorModel.findById(docId).select('-password')
        if(!docData.available){
            return res.json({success:false, message:'Doctor not available'})
        }
        let slotsBooked = docData.slotsBooked || {};
        if(slotsBooked[slotDate]){
            if(slotsBooked[slotTime].includes(slotTime)){
                return res.json({success:false, message:'slot not available'}) 
            }else{
                slotsBooked[slotDate].push(slotTime)
            }
        }else{
            slotsBooked[slotDate]=[]
            slotsBooked[slotDate].push(slotTime)
        }
        const userData = await UserModel.findById(userId).select('-password')
        delete docData.slotsBooked;
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount : docData.fees,
            slotTime,
            slotDate,
            date : Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()
        await doctorModel.findByIdAndUpdate(docId, {slotsBooked})
        return res.json({success:true, message:'appointment booked'})

    } catch (error) {
        console.log('bookapp error', error);
        return res.status(500).json({ success: false, message: err.message });
    }
}


async function listAppointment(req,res) {
    try {
        const userId = req.userId || req.query.userId || req.body.userId;
        const appointments = await appointmentModel.find({userId})
        return res.json({success:true,appointments})
    } catch (error) {
        console.log('listapp error', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

async function cancelAppointment(req,res){
    try {
        const userId = req.userId || req.query.userId || req.body.userId;
        const {appointmentId} = req.body;
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData.userId!==userId) {
            return res.json({success:false, message:'Unauthorized access'})
        }
        await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
        res.json({success:true, message:'Appointment cancelled'})
    } catch (error) {
        console.log('listapp error', error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export {registerUser, loginUser,getProfile,updateProfile, bookAppointment, listAppointment, cancelAppointment}