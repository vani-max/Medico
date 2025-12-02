1. Project Title
Medico - Doctor Appointment booking system

2. Problem Statement
In today’s world, scheduling medical appointments is often inconvenient and can be hectic due to time issues, thus medico helps you book appointments easily at your convenience. 
Patients face issues like : 
Long Waiting lines for appointments, difficulty in finding suitable doctors according to their specialization, affordability etc.
Clinics and doctors on the other hand face issues like:
Lack of communication between patients and doctors, reducing no shows.
3. System Architecture
Frontend → Backend (API) → Database
Frontend: React.js with react router for routing


Backend: Node.js + Express js REST API


Database:MongoDB


Authentication: JWT based login signup


Hosting:


Frontend → Vercel


Backend → Render


Database →MongoDB Atlas



5. Key Features
Category
Features
Authentication & Authorization
Secure user registration and login using JWT (JSON Web Token). The system provides role-based access control (Doctors/Patients)
Doctor Search Functionality
Patients can search for doctors by name, specialization, location, or hospital.
Advanced Filtering Options
Users can filter doctors based on consultation fees, ratings, experience, or availability.
Sorting Mechanism
Results can be sorted by doctor’s rating, experience, fee, or appointment availability.
Pagination for Doctor Listings
To handle large datasets efficiently, the doctor list supports pagination.
Appointment Booking and Management
Patients can book, reschedule, or cancel appointments with ease.
Doctors can view all bookings, approve or reject requests, and update time slots
Doctor Availability Management
Doctors can define their available days and time slots.
Patient Dashboard
Each patient will have a personalised dashboard displaying appointments, past visits and booking history.
Admin Panel
Admin can manage doctor-patient profiles, verification.
Review and Rating System
After a consultation, patients can leave feedback and rate doctors.
Frontend Routing
Pages: Home, Login, Dashboard, Details, Profile, etc.




Hosting
Deploy both backend and frontend to accessible URLs


6. Tech Stack
Layer
Technologies
Frontend
React.js , TailwindCSS
Backend
Node.js, Express.js
Database
MongoDB 
Authentication
JWT
Hosting
Vercel , Render, MongoDB Atlas


7. API Overview
Endpoint
Method
Description
Access
/api/auth/register
POST
Register new user
Public
/api/auth/login
POST
login
Public
/api/doctors
GET
Get list of all doctors
Authenticated
/api/doctors/:id/profile
PUT
Update doctor’s profile info
Authenticated
/api/appointment/:id
DELETE
Cancel appointments
doctors only

/api/admin/users  GET        Get all patients         public

