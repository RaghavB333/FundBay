"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { fetchuser, updateProfile } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

const Dashboard = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        profilepic: '',
        coverpic: '',
        razorpayid: '',
        razorpaysecret: ''
    });

const [showToast, setshowToast] = useState(false)

    useEffect(() => {

        document.title = "Dashboard - Get me a Chai";



        if (session) {
        //     router.push('/login');
        // } else {
            const fetchData = async () => {

                let u = await fetchuser(session.user.name);
                setForm(u);


            };
            fetchData();
        }
    }, [session, status, router]);


    useEffect(() => {
        if (showToast) {
            toast('Profile Updated!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            setshowToast(false);  // Reset showToast after showing the toast
        }
    }, [showToast]);  // Add showToast as a dependency
    

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        let a = await updateProfile(form, session.user.name);
        setshowToast(true);  // Trigger the toast after updating the profile

    }


    if (!session) {
        return null;
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='flex flex-col justify-center gap-1'>
                <h1 className='text-center text-3xl font-bold pt-8 pb-6'>Welcome to your Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'username', 'profilepic', 'coverpic', 'razorpayid', 'razorpaysecret'].map((field) => (
                        <div key={field}>
                            <label className='font-bold ml-[30.2vw] max-md:w-[70vw] max-md:ml-[15vw]' htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                onChange={handleChange}
                                value={form[field] || ''} // Ensure value is controlled
                                className='w-[40vw] rounded-lg bg-slate-700 ml-[30vw] h-8 max-md:w-[70vw] max-md:ml-[15vw] max-md:my-2'
                                type="text"
                                name={field}
                                id={field}
                            />
                        </div>
                    ))}
                    <button 
                        type="submit"
                        id="dropdownDefaultButton"
                        data-dropdown-toggle="dropdown"
                        className="font-bold mt-4 w-[40vw] ml-[30vw] h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </form>
            </div>
        </>
    );
};

export default Dashboard;


