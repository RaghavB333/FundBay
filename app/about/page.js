"use client"
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

const AboutPage = () => {
    useEffect(() => {
        document.title="Dashboard - Get me a Chai"

    }, [])
    return (
        <>
            <div className="flex justify-center items-center flex-col text-white h-[44vh]  max-md:text-center">
                <div className="font-bold text-5xl flex gap-2 justify-center items-center max-md:px-4 max-md:text-3xl">
                    About FundBay <span className="pb-2"><img className="invertImg" src="/donate2.gif" alt="" width={55} /></span>
                </div>
                <p className="pb-4 pt-2 text-center max-md:px-6">
                    A Crowdfunding platform for creators. Get funded by your fans and followers.
                </p>
                <div>
                    <Link href={'/login'}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button>
                    </Link>
                    <Link href={'/'}>
                        <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Go to Home</button>
                    </Link>
                </div>
            </div>
            <div className="bg-white h-1  opacity-10"></div>

            <div className="text-white container mx-52 w-[calc(100vw-26rem)] pb-32 pt-14 max-md:text-center max-md:mx-12">
                <h2 className="text-3xl font-bold text-center mb-14 max-md:w-[calc(100vw-6rem)]">Our Vision and Mission</h2>
                <div className="flex gap-5 justify-around max-md:gap-10 max-md:mx-2 max-md:mt-[-70px]">
                    <div className="item space-y-3 flex flex-col items-center justify-center max-md:relative max-md:top-20">
                        <img width={66} src="/donate2.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black " />
                        <p className="font-bold text-xl">Why "FundBay"?</p>
                        <p className="text-center text-lg">Here we are a community of passionate creators and their supports fostering an ecosystem that helps creators create without the financial stress, while the consumers express their gratitude and love through financial support.Not just that, this ecosystem extends to funding for a cause, charity or relief funds.</p>
                    </div>
                    <div className="item space-y-3  flex flex-col items-center justify-center m-8">
                        <img width={66} src="/coin.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black" />
                        <p className="font-bold text-xl">Our Vision</p>
                        <p className="text-center text-lg">FundBay is one stop solution to all the funding and donation needs, be it a creator or a cause. We believe that every creator should have the opportunity to pursue their passions. FundBay provides a space where ideas can be transformed into reality with the help of a supportive community. We also believe that humanitarian causes should be given as much of platform and exposure as possible, and FundBay does exactly that. </p>
                    </div>
                    <div className="item space-y-3 flex flex-col items-center justify-center">
                        <img width={66} src="/group.gif" alt="" className="bg-slate-400 rounded-full p-2 text-black" />
                        <p className="font-bold text-xl">Who Can Benefit?</p>
                        <p className="text-center text-lg">Whether you're a creator or a supporter, or you support a cause or in need of financial help, FundBay is your platform to seek support and make projects a reality, or to contribute to the projects you believe in.</p>
                    </div>
                </div>
            </div>
            
            <div className="bg-white h-1  opacity-10"></div>
            <div className="text-white container mx-52 w-[calc(100vw-26rem)] pb-32 pt-14 flex flex-col items-center justify-center max-md:mx-12 max-md:w-[calc(100vw-6rem)]">
                <h2 className="text-3xl font-bold text-center mb-14">Learn More about us</h2>
                <iframe width="350" height="315" src="https://www.youtube.com/embed/hU9flsFPzDs?si=WI1yOhM95BM_yiFZ" title="YouTube video player" frameBorder={0} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </>
    );
};

export default AboutPage;

// either Static metadata
