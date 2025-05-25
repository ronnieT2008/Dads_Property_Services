import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const POST = async (req) => {
    try {
        const { estimate, service } = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const estimateIndex = user.estimates.findIndex((est) => est.id.toString() === estimate.id.toString());
        if (estimateIndex === -1) return NextResponse.json({ message: "Estimate not found!" }, { status: 404 });

        const newEstimates = user.estimates;
        newEstimates[estimateIndex].services = newEstimates[estimateIndex].services.filter((ser) => ser.id !== service.id);

        user.estimates = newEstimates;
        await User.updateOne({ _id: id }, { $set: { estimates: newEstimates } });

        return NextResponse.json({ message: "Service deleted successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}