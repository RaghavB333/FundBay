import React from 'react'
import PaymentPage from '../components/PaymentPage'
import { notFound } from 'next/navigation'
import connectDB from '@/db/connectDb'
import User from '@/models/user'
const Username = async ({ params }) => {
  const checkUser = async () => {
    connectDB()
    let u = await User.findOne({ username: params.username })
   
    if (!u) {
      return notFound()
    }
  }
  await checkUser()
  return (
    <>

      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

// or Dynamic metadata
export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username}- Get me a Chai`,
  }
}
