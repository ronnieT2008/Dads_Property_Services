import { NextResponse } from "next/server";
import { connect } from "@/dbConfig";
import User from "@/models/userModel";
import { getTokenData } from "@/helpers/getTokenData";
import mongoose from "mongoose";

connect();

export const POST = async (req) => {
    try {
        const { customer, quote } = await req.json();
        const id = await getTokenData(req);

        const updateResult = await User.updateOne(
            { _id: id, "customers.id": customer.id },
            {
                $push: {
                    "customers.$.quotes": {
                        ...quote,
                        id: new mongoose.Types.ObjectId(),
                    },
                },
            }
        );

        console.log("Update result:", updateResult);

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { message: "Customer not found or no update performed!" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { message: "Customer updated successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating customer quotes:", err);
        return NextResponse.error();
    }
};
