import React from 'react';
import PaymentPage from '../components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '@/db/connectDb';
import User from '@/models/user';

const Username = async ({ params }) => {
  try {
    await connectDB();

    const user = await User.findOne({ username: params.username });

    if (!user) return notFound();

    return <PaymentPage username={params.username} />;
  } catch (error) {
    console.error('Error in [username]/page.jsx:', error);
    return notFound(); // or a custom error component
  }
};

export default Username;

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - FundBay`,
  };
}
