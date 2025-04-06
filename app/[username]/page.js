// app/[username]/page.tsx
import PaymentPage from '../components/PaymentPage';
import connectDB from '@/db/connectDb';
import User from '@/models/user';
import { notFound } from 'next/navigation';

export default async function UsernamePage({ params }) {
  try {
    await connectDB();

    const user = await User.findOne({ username: params.username });
    if (!user) return notFound();

    return <PaymentPage username={params.username} />;
  } catch (error) {
    console.error('💥 Error in dynamic route [username]:', error);
    return notFound(); // fallback for deployment safety
  }
}

// Optional SEO
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - FundBay`,
  };
}
