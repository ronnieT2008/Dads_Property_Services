import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const POST = async (req) => {
    try {
        const { service, estimate } = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });


        const estimateIndex = user.estimates.findIndex((est) => est.id.toString() === estimate.id.toString());
        if (estimateIndex === -1) return NextResponse.json({ message: "Estimate not found!" }, { status: 404 });

        const serviceIndex = estimate.services.findIndex((ser) => ser.id === service.id);
        if (serviceIndex === -1) return NextResponse.json({ message: "Service not found!" }, { status: 404 });

        const updatedEstimates = user.estimates;
        updatedEstimates[estimateIndex].services[serviceIndex] = service;

        await User.updateOne({ _id: id }, { $set: { estimates: updatedEstimates } });

        return NextResponse.json({ message: "Service updated successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}