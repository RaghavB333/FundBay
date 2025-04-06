"use client";
import React, { useState, useEffect } from 'react';
import { fetchuser, fetchpayments, initiate } from '@/actions/useractions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const PaymentPage = ({ username }) => {
    const [paymentform, setpaymentform] = useState({});
    const [currentUser, setcurrentUser] = useState({ coverpic: '', profilepic: '', razorpayid: '', razorpaysecret: '' });
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isRazorpayLoaded, setRazorpayLoaded] = useState(false);

    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        const loadRazorpayScript = () => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.async = true;
                script.onload = resolve;
                script.onerror = reject;
                document.body.appendChild(script);
            });
        };

        loadRazorpayScript()
            .then(() => setRazorpayLoaded(true))
            .catch(() => {
                console.error("Failed to load Razorpay script");
                setRazorpayLoaded(false);
            });
    }, []);

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for your support!', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            router.push(`/${username}`);
        }
    }, [searchParams, router, username]);

    const handleChange = (e) => {
        setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
    };

    const getData = async () => {
        setLoading(true);
        try {
            const u = await fetchuser(username);
            setcurrentUser(u);
            const dbpayments = await fetchpayments(username);
            setPayments(dbpayments);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const pay = async (amount) => {
        if (!amount || isNaN(amount) || amount <= 0) {
            toast.error('Please enter a valid amount', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        if (!currentUser.razorpayid || !currentUser.razorpaysecret) {
            toast.error('Razorpay credentials are missing!', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        if (!isRazorpayLoaded) {
            toast.error('Razorpay is not loaded yet. Please try again later.', {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        try {
            const response = await initiate(amount, username, paymentform);
            if (!response || !response.id) throw new Error('Invalid response from initiate');

            const options = {
                key: currentUser.razorpayid,
                amount,
                currency: 'INR',
                name: 'FundBay Support',
                description: 'Donation',
                image: '/your_logo.png',
                order_id: response.id,
                callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
                prefill: {
                    name: paymentform.name || '',
                    email: paymentform.email || '',
                    contact: paymentform.contact || '',
                },
                notes: {
                    message: paymentform.message || '',
                },
                theme: {
                    color: '#3399cc',
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (error) {
            console.error("Error initiating payment:", error);
            toast.error(`Payment failed: ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                theme: "light",
                transition: Bounce,
            });
        }
    };

    useEffect(() => {
        getData();
    }, [username]);

    return (
        <>
            <ToastContainer />
            <div className='cover w-full bg-red-50 relative z-10'>
                <img className='object-cover w-full h-[350px] max-md:h-[104px]' src={currentUser.coverpic} alt="" />
                <div className='absolute -bottom-14 right-[46%] max-md:right-[42%] max-md:-bottom-12 border-2 rounded-full size-32 overflow-hidden max-md:w-16 max-md:h-16'>
                    <img className='rounded-full size-32 object-cover max-md:w-16 max-md:h-16' src={currentUser.profilepic} alt="" />
                </div>
            </div>
            <div className="info flex flex-col gap-2 justify-center items-center py-16 ml-6">
                <div className='font-bold text-lg'>@{username}</div>
                <div className='text-slate-400'>
                    Let’s help our lovely {username} in their commendable work!
                </div>
                <div className='text-slate-400 mb-10'>
                    {payments.length} Payments • ₹{payments.reduce((a, b) => a + Number(b.amount || 0), 0)} raised
                </div>
                <div className="payment flex gap-3 w-[80%] max-md:w-[100%] max-md:flex-col max-md:items-center">
                    <div className="supporters w-1/2 bg-slate-950 rounded-lg text-white p-10 max-md:w-full">
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <ul className='mx-5 text-lg'>
                                {payments.length === 0 ? (
                                    <li>No donations yet</li>
                                ) : (
                                    [...payments]
                                        .sort((a, b) => b.amount - a.amount)
                                        .slice(0, 10)
                                        .map((p, i) => (
                                            <li key={i} className='my-2 flex gap-2 items-center'>
                                                <img width={33} src="/avatar.gif" alt="" />
                                                <span>
                                                    {p.name} donated <span className='font-bold'>₹{p.amount}</span> — {p.message}
                                                </span>
                                            </li>
                                        ))
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="makePayment w-1/2 bg-slate-950 rounded-lg text-white p-10 max-md:w-full">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex gap-2 flex-col">
                            <input onChange={handleChange} value={paymentform.name || ''} type="text" name="name" placeholder='Enter Name' className='w-full p-3 rounded-lg bg-slate-800' />
                            <input onChange={handleChange} value={paymentform.message || ''} type="text" name="message" placeholder='Enter Message' className='w-full p-3 rounded-lg bg-slate-800' />
                            <input onChange={handleChange} value={paymentform.amount || ''} type="number" name="amount" placeholder='Enter Amount (₹)' className='w-full p-3 rounded-lg bg-slate-800' />
                            <button
                                onClick={() => pay(Number(paymentform.amount) * 100)}
                                disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || !paymentform.amount}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                                Pay
                            </button>
                        </div>
                        <div className='flex gap-2 mt-5'>
                            {[10, 20, 30].map((amt) => (
                                <button
                                    key={amt}
                                    className="p-3 bg-slate-800 rounded-lg"
                                    onClick={() => pay(amt * 100)}
                                >
                                    Pay ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentPage;
