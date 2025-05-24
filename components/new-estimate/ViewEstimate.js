"use client";
import axios from "axios";
import mongoose from "mongoose";
import { Router, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PaintingCalculator from "../calculators/PaintingCalculator";

const ViewEstimate = ({ customerInputs, serviceInputs, service, setService, existingCustomer }) => {
    const [estimate, setEstimate] = useState(null);
    const router = useRouter();

    useEffect(() => {
        PaintingCalculator({ estimate: serviceInputs, setEstimate });
    }, [serviceInputs]);

    if (!serviceInputs) return <p className="p-6 text-xl">No service input found.</p>;

    const newEstimate = async () => {
        try {
            if (!existingCustomer) {
                const newEstimate = {
                    name: customerInputs.name,
                    phone: customerInputs.phone,
                    address: customerInputs.address,
                    status: "RFA",
                    services: [{ ...estimate, serviceType: "painting", id: new mongoose.Types.ObjectId() }],
                };

                const res = await axios.post("/api/estimate/customer/new", newEstimate);
                if (res.status === 200) router.push("/dashboard");
            } else {
                const service = { ...estimate, serviceType: "painting", status: "RFA", id: new mongoose.Types.ObjectId() };
                const res = await axios.post("/api/estimate/new", { estimate: { ...customerInputs, status: "RFA" }, service });
                if (res.status === 200) router.push("/dashboard");
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="max-w-3xl h-full mx-auto p-6 py-0">
            <h1 className="text-3xl font-bold mb-6">Estimate Summary</h1>
            <div className="space-y-4 text-xl">
                <p><strong>Room Name:</strong> {serviceInputs.roomName}</p>
                <p><strong>Wall Area:</strong> {estimate?.wallArea} sq ft</p>
                <p><strong>Accent Wall Area:</strong> {estimate?.accentWallArea} sq ft</p>
                <p><strong>Ceiling Area:</strong> {estimate?.ceilingArea} sq ft</p>
                <p><strong>Ceiling Type:</strong> {serviceInputs.ceilingType}</p>
                <p><strong>Door Frames:</strong> {serviceInputs.doorFrames}</p>
                <p><strong>Window Frames:</strong> {serviceInputs.windowFrames}</p>
                <p><strong>Doors:</strong> {serviceInputs.doorsNum}</p>
                <p><strong>Gallons of Paint for Walls:</strong> {estimate?.wallGallons} gallon(s)</p>
                <p><strong>Trim Paint:</strong> {estimate?.trimQuarts} quart(s) ({estimate?.trimSqFt} sq ft)</p>
            </div>
            <div className="w-full grid gap-2 mt-8">
                <p className="text-2xl font-semibold">Estimate Total: <span className="text-green-700">${estimate?.total} CAD</span></p>
                <button
                    type="button"
                    className="bg-blue-900 hover:bg-blue-950 text-white text-xl py-2 px-4 rounded cursor-pointer" onClick={newEstimate}>
                    Create Estimate
                </button>
                <button
                    className="bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded cursor-pointer text-xl"
                    onClick={() => setService({ ...service, active: true, estimate: false })}>
                    Back
                </button>
            </div>
        </div>
    );
};

export default ViewEstimate