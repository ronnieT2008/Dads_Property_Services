import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const estimate = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const newEstimates = [...user.estimates, { ...estimate, id: new mongoose.Types.ObjectId(), customerId: new mongoose.Types.ObjectId() }];

        user.estimates = newEstimates;
        await user.save();

        return NextResponse.json({ message: "Estimate created successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}