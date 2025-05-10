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

        const updateResult = await User.updateOne(
            {
                _id: id,
                estimates: {
                    $elemMatch: {
                        id: new mongoose.Types.ObjectId(estimate.id),
                    },
                },
            },
            {
                $push: {
                    "estimates.$.services": {
                        ...service,
                        id: serviceId,
                    },
                },
            }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: "Customer not found or no update performed!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Service added successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating customer estimates:", err);
        return NextResponse.error();
    }
};