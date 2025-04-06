import React from 'react'
import PaymentPage from '../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'
import User from '@/models/user'

const Username = async ({ params }) => {
  // Connect to MongoDB first
  await connectDB()

  // Check if the user exists
  const user = await User.findOne({ username: params.username })
  if (!user) return notFound()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

// Dynamic metadata for SEO
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - FundBay`,
  }
}
