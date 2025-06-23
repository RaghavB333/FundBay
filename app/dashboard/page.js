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

    const [showToast, setshowToast] = useState(false);

    useEffect(() => {
        document.title = "Dashboard - FundBay";

        if (session) {
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
            setshowToast(false);
        }
    }, [showToast]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateProfile(form, session.user.name);
        setshowToast(true);
    };

    const uploadImage = async (e, fieldName) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fundbay_upload"); // your Cloudinary unsigned preset

        try {
            const res = await fetch("https://api.cloudinary.com/v1_1/dunoeqfaz/image/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            setForm(prev => ({
                ...prev,
                [fieldName]: data.secure_url
            }));
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    if (!session) return null;

    return (
        <>
            <ToastContainer />
            <div className='flex flex-col justify-center gap-1'>
                <h1 className='text-center text-3xl font-bold pt-8 pb-6'>Welcome to your Dashboard</h1>
                <form onSubmit={handleSubmit}>
                    {['name', 'email', 'username', 'razorpayid', 'razorpaysecret'].map((field) => (
                        <div key={field}>
                            <label className='font-bold ml-[30.2vw] max-md:w-[70vw] max-md:ml-[15vw]' htmlFor={field}>
                                {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <input
                                onChange={handleChange}
                                value={form[field] || ''}
                                className='w-[40vw] rounded-lg bg-slate-700 ml-[30vw] h-8 max-md:w-[70vw] max-md:ml-[15vw] max-md:my-2'
                                type="text"
                                name={field}
                                id={field}
                            />
                        </div>
                    ))}

                    {/* Profile Picture Upload */}
                    <div>
                        <label className='font-bold ml-[30.2vw] max-md:w-[70vw] max-md:ml-[15vw]'>Profile Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => uploadImage(e, 'profilepic')}
                            className="w-[40vw] rounded-lg bg-slate-700 ml-[30vw] h-8 max-md:w-[70vw] max-md:ml-[15vw] max-md:my-2"
                        />
                        {form.profilepic && (
                            <img src={form.profilepic} alt="Profile" className="w-32 h-32 object-cover rounded-full ml-[30vw] my-2" />
                        )}
                    </div>

                    {/* Cover Picture Upload */}
                    <div>
                        <label className='font-bold ml-[30.2vw] max-md:w-[70vw] max-md:ml-[15vw]'>Cover Picture</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => uploadImage(e, 'coverpic')}
                            className="w-[40vw] rounded-lg bg-slate-700 ml-[30vw] h-8 max-md:w-[70vw] max-md:ml-[15vw] max-md:my-2"
                        />
                        {form.coverpic && (
                            <img src={form.coverpic} alt="Cover" className="w-[80vw] h-40 object-cover rounded-xl ml-[10vw] my-2" />
                        )}
                    </div>

                    <button
                        type="submit"
                        className="font-bold mt-4 w-[40vw] ml-[30vw] h-8 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 mx-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save
                    </button>
                </form>
                <br /><br />
                <p className='ml-[30vw]'>
                  To visit a demo page click{" "}
                  <a
                    href="https://fund-bay.vercel.app/raghavbhargava3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  >
                    here
                  </a>
                </p>
            </div>
        </>
    );
};

export default Dashboard;
