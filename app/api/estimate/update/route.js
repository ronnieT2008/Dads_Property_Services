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

        const estimateIndex = user.estimates.findIndex((est) => est.id.toString() === estimate.id);
        if (estimateIndex === -1) return NextResponse.json({ message: "Estimate not found!" }, { status: 404 });

        user.estimates[estimateIndex] = estimate;
        await user.save();

        return NextResponse.json({ message: "Estimate updated successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}