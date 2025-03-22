"use server"
import Razorpay from "razorpay";
import Payment from "@/models/payment";
import connectDB from "@/db/connectDb";
import User from "@/models/user";
import axios from 'axios';
import payment from "@/models/payment";


export const initiate = async (amount, to_username, paymentform) => {
    await connectDB();

    let user = await User.findOne({ username: to_username });
    if (!user) {
        throw new Error('User not found');
    }

    const razorpayid = user.razorpayid;
    const razorpaysecret = user.razorpaysecret;

    if (!razorpayid || !razorpaysecret) {
        throw new Error('Razorpay credentials are missing in the database');
    }

    

    const instance = new Razorpay({ key_id: razorpayid, key_secret: razorpaysecret });

    let options = {
        amount: Number.parseInt(amount), // amount should be in paise
        currency: "INR",
        receipt: "receipt#1",
    };

    try {
        let order = await instance.orders.create(options);


        if (!order || !order.id) {
            throw new Error('Order creation failed: ' + JSON.stringify(order));
        }

        const newPayment = await Payment.create({
            oid: order.id,
            amount: amount / 100,
            to_user: to_username,
            name: paymentform.name,
            message: paymentform.message,
        });


        return order;
    } catch (error) {
        console.error('Error creating order:', {
            message: error.message,
            stack: error.stack,
            response: error.response ? JSON.stringify(error.response.data) : 'No response details',
            config: error.config ? JSON.stringify(error.config) : 'No request config',
            status: error.response ? error.response.status : 'No status code',
            headers: error.response ? JSON.stringify(error.response.headers) : 'No response headers'
        });

        if (axios.isAxiosError(error)) {
            const errorDetails = error.response ? JSON.stringify(error.response.data) : 'No response details';
            throw new Error(`Order creation failed: ${error.message}. Details: ${errorDetails}`);
        } else {
            const errorMessage = error.message || 'Unknown error';
            const errorDetails = error.stack ? `Stack trace: ${error.stack}` : 'No stack trace available';
            throw new Error(`Order creation failed: ${errorMessage}. Details: ${errorDetails}`);
        }
    }
}




export const fetchuser = async (username) => {
    try {
        await connectDB();
        let u = await User.findOne({ username: username });

        if (!u) {
            console.error(`User with username ${username} not found.`);
            return { error: "User not found" };
        }

        let user = u.toObject({ flattenObjectIds: true });
        return user;
    } catch (error) {
        console.error("Error fetching user:", error);
        return { error: "An error occurred while fetching user" };
    }
}

export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean();
    return p;
}



export const updateProfile = async (data, oldUsername) => {
    await connectDB();

    let normalizedData;
    if (typeof data === 'object' && !Array.isArray(data)) {
        normalizedData = data;
    } else if (Array.isArray(data)) {
        try {
            normalizedData = Object.fromEntries(data);
        } catch (error) {
            console.error("Error converting data to object:", error);
            return { error: "Error converting data to object" };
        }
    } else {
        return { error: "Invalid data provided" };
    }


    if (oldUsername !== normalizedData.username) {
        // Check if the new username already exists
        let existingUser = await User.findOne({ username: normalizedData.username });
        if (existingUser) {
            console.error("Username already exists:", normalizedData.username);
            return { error: "Username already exists" };
        }

        // Update the user record
        try {
            const updateUserResult = await User.updateOne({ username: oldUsername }, normalizedData);
        } catch (error) {
            console.error("Error updating user record:", error);
            return { error: "Error updating user record" };
        }

        // Update all payments related to the old username
        try {
            const paymentUpdateResult = await Payment.updateMany(
                { to_user: oldUsername },
                { $set: { to_user: normalizedData.username } }
            );
        } catch (error) {
            console.error("Error updating payments:", error);
            return { error: "Error updating payments" };
        }
    } else {
        // If the username hasn't changed, just update the user record
        try {
            const updateUserResult = await User.updateOne({ username: oldUsername }, normalizedData);
        } catch (error) {
            console.error("Error updating user record:", error);
            return { error: "Error updating user record" };
        }
    }

    return { success: true };
};