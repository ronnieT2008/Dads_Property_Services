import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const POST = async (req) => {
    try {
        const { estimate } = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const newEstimates = user.estimates.filter((est) => est.id.toString() !== estimate.id.toString());

        user.estimates = newEstimates;
        await User.updateOne({ _id: id }, { $set: { estimates: newEstimates } });

        return NextResponse.json({ message: "Estimate deleted successfully!" }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}