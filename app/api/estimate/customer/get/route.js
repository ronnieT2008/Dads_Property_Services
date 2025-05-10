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

        const customers = user.estimates;
        // user.estimates.forEach((customer) => {
        //     customers.push({ name: customer.name, phone: customer.phone, address: customer.address, id: customer.id.toString() });
        // });

        return NextResponse.json({ message: "Customer fetched successfully!", customers }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}