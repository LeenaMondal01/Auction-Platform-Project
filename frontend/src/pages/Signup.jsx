import { register } from '@/store/slices/userSlice';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");
    const [password, setPassword] = useState("");
    const [bankAccountName, setBankAccountName] = useState("");
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [bankName, setBankName] = useState("");
    const [UPI_ID_Gpay, setUPI_ID_Gpay] = useState("");
    const [UPI_ID_PhonePe, setUPI_ID_PhonePe] = useState("");
    const [paypalEmail, setPaypalEmail] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [profileImagePreview, setProfileImagePreview] = useState("");

    const { loading, isAuthenticated } = useSelector((state) => state.user);
    const navigateTo = useNavigate();
    const dispatch = useDispatch();

    const handleRegister = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("userName",userName);
        formData.append("email",email);
        formData.append("password",password);
        formData.append("phone",phone);
        formData.append("address",address);
        formData.append("role",role);
        formData.append("profileImage",profileImage);
        role === "Auctioneer" && 
            formData.append("bankAccountName",bankAccountName);
            formData.append("bankAccountNumber",bankAccountNumber);
            formData.append("bankName",bankName);
            formData.append("UPI_ID_Gpay",UPI_ID_Gpay);
            formData.append("UPI_ID_PhonePe",UPI_ID_PhonePe);
            formData.append("paypalEmail",paypalEmail);
        dispatch(register(formData));
    } 

    useEffect(()=>{
        if(isAuthenticated){
            navigateTo("/");
        }
    },[dispatch,loading,isAuthenticated]);

    const imageHandler = (e) => {
        const file  = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setProfileImage(file);
            setProfileImagePreview(reader.result);
        }
    }

    return (
        <section className='w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center'>
            <div className='bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md'>
                <h1 className={`text-[#D6482B] text-2xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl`}>
                    Register
                </h1>
                <form className='flex flex-col gap-5 w-full' onSubmit={handleRegister}>
                    <p className='font-semibold text-xl md:text-2xl'>Personal Details</p>
                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Full Name</label>
                            <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} 
                                className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                        </div>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} 
                                className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Phone</label>
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} 
                                className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                        </div>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Address</label>
                            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} 
                                className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4 sm:flex-row'>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Role</label>
                            <select value={role} onChange={(e) => setRole(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'>
                                <option value="">Select Role</option>
                                <option value="Auctioneer">Auctioneer</option>
                                <option value="Bidder">Bidder</option>
                            </select>
                        </div>
                        <div className='flex flex-col sm:flex-1'>
                            <label className='text-[16px] text-stone-600'>Password</label>
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} 
                                className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none'/>
                        </div>
                    </div>

                    <div className='flex flex-col sm:flex-1 gap-2'>
                        <label className='text-[16px] text-stone-600'>Profile Image</label>
                        <div className='flex items-center gap-3'>
                            <img src={profileImagePreview ? profileImagePreview : "/imageHolder.jpg"} alt="profileImagePreview" className='w-14 h-14 rounded-full' />
                            <input type="file" onChange={imageHandler}/>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <label className='font-semibold text-xl md:2xl flex flex-col'>
                            Payment Method Details <span className='text-[12px] text-stone-500'>Fill Payment Details Only if you are registering as an Auctioneer</span>
                        </label>
                        <div className='flex flex-col gap-2'>
                            <label className='text-[16px] text-stone-500'>Bank Details</label>
                            <div className='flex flex-col gap-1 sm:flex-row sm:gap-4'>
                                <select value={bankName} onChange={(e) => setBankName(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}>
                                    <option value="">Select Your Bank</option>
                                    <option value="SBI">SBI</option>
                                    <option value="Bank of Baroda">Bank of Baroda</option>
                                    <option value="Bank of India">Bank of India</option>
                                    <option value="Axis Bank">Axis Bank</option>
                                </select>
                                <input type="text" value={bankAccountNumber} placeholder='IFSC' onChange={(e) => setBankAccountNumber(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}/>

                                <input type="text" value={bankAccountName} placeholder='Bank Account Username' onChange={(e) => setBankAccountName(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}/>
                            </div>
                        </div>

                        <div>
                            <label className='text-[16px] text-stone-600 font-semibold'>Google Pay, PhonePe and Paypal Details</label>
                            <div className='flex flex-col gap-1 sm:flex-row sm:gap-4'>
                                <input type="number" value={UPI_ID_Gpay} placeholder='Google Pay UPI ID' onChange={(e)=>setUPI_ID_Gpay(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}/>

                                <input type="number" value={UPI_ID_PhonePe} placeholder='PhonePe UPI ID' onChange={(e)=>setUPI_ID_PhonePe(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}/>

                                <input type="email" value={paypalEmail} placeholder='Paypal Email ID' onChange={(e)=>setPaypalEmail(e.target.value)} className='text-[16px] py-2 bg-transparent border-b-[1px] border-b-stone-500 focus:outline-none sm:flex-1' disabled={role === "Bidder"}/>
                            </div>
                        </div>
                    </div>

                    <button className='bg-[#D6482B] font-semibold hover:bg-[#B8381E] transition-all duration-300 text-xl py-2 px-4 rounded-md text-white w-[280px] mx-auto lg:w-[640px] my-4' type='submit' disabled={loading}>
                        {loading && "Registering..."}
                        {!loading && "Register"}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Signup