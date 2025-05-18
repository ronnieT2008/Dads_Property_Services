import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";

connect();

export const POST = async (req) => {
    try {
        const { serviceId } = await req.json();
        const id = await getTokenData(req);

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: "User does not exist!" }, { status: 400 });

        const estimate = user.estimates.find((est) => est.services.find((ser) => ser.id.toString() === serviceId)) || null;

        const service = estimate.services.find((ser) => ser.id === serviceId || null);

        return NextResponse.json({ message: "Service fetched successfully!", estimate, service }, { status: 200 });
    } catch (err) {
        console.log(err);
        return NextResponse.error();
    }
}