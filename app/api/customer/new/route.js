import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const customer = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const newQuote = { ...customer.quotes[0], id: new mongoose.Types.ObjectId() };
        const newCustomer = { ...customer, quotes: [newQuote], id: new mongoose.Types.ObjectId() };

        const newCustomers = [...user.customers, newCustomer];

        user.customers = newCustomers;
        user.quotes = [...user.quotes, { ...newQuote, customerId: newCustomer.id }];
        await user.save();

        return NextResponse.json({ message: "Customer created successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}