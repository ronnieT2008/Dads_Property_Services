import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const { estimate, service } = await req.json();
        const id = await getTokenData(req);

        const serviceId = new mongoose.Types.ObjectId()

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        // find estimate index
        // add new service to esitmate
        // update estimate
        // set new estimate array to user.estimates

        const estimateIndex = user.estimates.findIndex((est) => est.id.toString() === estimate.id.toString());
        if (estimateIndex === -1) return NextResponse.json({ message: "Estimate not found!" }, { status: 404 });

        let newServices = user.estimates[estimateIndex].services;
        newServices = [...newServices, { ...service, id: serviceId }];

        let newEstimates = user.estimates;
        newEstimates[estimateIndex].services = newServices;

        user.estimates = newEstimates;
        await User.updateOne({ _id: id }, { $set: { estimates: newEstimates } });

        return NextResponse.json({ message: "Estimate not found!" }, { status: 200 });
    } catch (err) {
        console.error("Error updating customer estimates:", err);
        return NextResponse.error();
    }
};