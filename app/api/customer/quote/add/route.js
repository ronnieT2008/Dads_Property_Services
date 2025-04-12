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

        const quoteId = new mongoose.Types.ObjectId()

        const updateResult = await User.updateOne(
            { _id: id, "customers.id": customer.id },
            {
                $push: {
                    "customers.$.quotes": {
                        ...quote,
                        id: quoteId,
                    },
                },
            }
        );

        await User.updateOne(
            { _id: id },
            {
                $push: {
                    quotes: {
                        ...quote,
                        id: quoteId,
                        customerId: customer.id,
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
            { message: "Quote added successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Error updating customer quotes:", err);
        return NextResponse.error();
    }
};
