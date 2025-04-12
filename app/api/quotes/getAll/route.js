import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const GET = async (req) => {
    try {
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const quotes = user.quotes.reverse();

        return NextResponse.json({ message: "Quotes fetched successfully!", quotes }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}