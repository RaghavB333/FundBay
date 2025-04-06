import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/payment";
import User from "@/models/user";
import connectDB from "@/db/connectDb";
import { NextResponse } from 'next/server';

export const POST = async (req) => {
    await connectDB();

    try {
        let body = await req.formData();
        body = Object.fromEntries(body);


        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

        const payment = await Payment.findOne({ oid: razorpay_order_id });
        if (!payment) {
            console.error(`Order ID ${razorpay_order_id} not found.`);
            return NextResponse.json({ success: false, message: "Order ID not found" });
        }

        const user = await User.findOne({ username: payment.to_user });
        if (!user) {
            console.error(`User ${payment.to_user} not found.`);
            return NextResponse.json({ success: false, message: "User not found" });
        }

        const secret = user.razorpaysecret;

        const isValid = validatePaymentVerification(
            { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
            razorpay_signature,
            secret
        );

        
        if (isValid) {
            const updatedPayment = await Payment.findOneAndUpdate(
                { oid: razorpay_order_id },
                { done: true },
                { new: true }
            );

            if (updatedPayment && updatedPayment.to_user) {
                return NextResponse.redirect(`/${session.user.name}?paymentdone=true`);
            } else {
                console.error(`Failed to update payment status.`);
                return NextResponse.json({ success: false, message: "Failed to update payment status" });
            }
        } else {
            console.error(`Validation failed.`);
            return NextResponse.json({ success: false, message: "Validation failed" });
        }
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ success: false, message: "Internal server error" });
    }
};
