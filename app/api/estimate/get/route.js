import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const { estimateId } = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const estimate = user.estimates.find((est) => est.id.toString() === estimateId) || null;

        return NextResponse.json({ message: "Estimate fetched successfully!", estimate }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}