"use client";
import axios from "axios";
import { Router, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ViewQuote = ({ customerInputs, serviceInputs, service, setService, existingCustomer }) => {
    const [quote, setQuote] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (serviceInputs) {
            const {
                roomName,
                ceilingHeight,
                walls,
                ceilingType,
                doorFrames,
                windowFrames,
                doorsNum,
                wallsNum,
                wallsLength,
            } = serviceInputs;

            const parsedHeight = parseFloat(ceilingHeight) || 0;
            const wallAreas = walls.map((w) => parseFloat(w) || 0).reduce((a, b) => a + b, 0) * parsedHeight;
            const ceilingArea = wallAreas > 0 ? wallAreas / walls.length : 0;

            const accentWallArea = (parseFloat(wallsNum) || 0) * (parseFloat(wallsLength) || 0) * parsedHeight;

            const prices = {
                wall: 2.5,
                ceiling: 1.8,
                trim: 40,
                door: 60,
                accentWall: 3.5,
            };

            const ceilingTypeMultipliers = {
                "Flat Ceiling": 1.0,
                "Cathedral Ceiling": 1.4,
                "Vaulted Ceiling": 1.5,
                "Tray Ceiling": 1.2,
                "Coffered Ceiling": 1.6,
                "Exposed Beam Ceiling": 1.7,
                "None": 0,
            };

            const ceilingMultiplier = ceilingTypeMultipliers[ceilingType] ?? 0;

            const total =
                wallAreas * prices.wall +
                ceilingArea * prices.ceiling * ceilingMultiplier +
                (parseInt(doorFrames) || 0) * prices.trim +
                (parseInt(windowFrames) || 0) * prices.trim +
                (parseInt(doorsNum) || 0) * prices.door +
                accentWallArea * prices.accentWall;

            setQuote({
                roomName,
                ceilingHeight: parsedHeight,
                ceilingType,
                doorFrames: parseInt(doorFrames) || 0,
                windowFrames: parseInt(windowFrames) || 0,
                doorsNum: parseInt(doorsNum) || 0,
                wallsNum: parseInt(wallsNum) || 0,
                wallsLength: parseFloat(wallsLength) || 0,
                wallArea: wallAreas.toFixed(2),
                ceilingArea: ceilingArea.toFixed(2),
                accentWallArea: accentWallArea.toFixed(2),
                total: total.toFixed(2),
            });
        }
    }, [serviceInputs]);

    if (!serviceInputs) return <p className="p-6 text-xl">No service input found.</p>;

    const newQuote = async () => {
        try {
            if (!existingCustomer) {
                const customer = {
                    name: customerInputs.name,
                    phone: customerInputs.phone,
                    address: customerInputs.address,
                    quotes: [quote],
                };

                const res = await axios.post("/api/customer/new", customer);
                if (res.status === 200) router.push("/dashboard");
            } else {
                const res = await axios.post("/api/customer/quote/add", { customer: customerInputs, quote });
                // if (res.status === 200) router.push("/dashboard");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="max-w-3xl mx-auto p-6 py-0">
            <h1 className="text-3xl font-bold mb-6">Quote Summary</h1>
            <div className="space-y-4 text-xl">
                <p><strong>Room Name:</strong> {serviceInputs.roomName}</p>
                <p><strong>Wall Area:</strong> {quote?.wallArea} sq ft</p>
                <p><strong>Ceiling Area:</strong> {quote?.ceilingArea} sq ft</p>
                <p><strong>Accent Wall Area:</strong> {quote?.accentWallArea} sq ft</p>
                <p><strong>Ceiling Type:</strong> {serviceInputs.ceilingType}</p>
                <p><strong>Door Frames:</strong> {serviceInputs.doorFrames}</p>
                <p><strong>Window Frames:</strong> {serviceInputs.windowFrames}</p>
                <p><strong>Doors:</strong> {serviceInputs.doorsNum}</p>
                <p className="text-2xl font-semibold mt-6">Total Estimate: <span className="text-green-700">${quote?.total} CAD</span></p>
            </div>
            <div className="w-full grid gap-2 mt-2">
                <button
                    type="button"
                    className="bg-blue-900 hover:bg-blue-950 text-white text-xl py-2 px-4 rounded cursor-pointer" onClick={newQuote}>
                    Create Quote
                </button>
                <button
                    className="bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded cursor-pointer text-xl"
                    onClick={() => setService({ ...service, active: true, quote: false })}>
                    Back
                </button>
            </div>
        </div>
    );
};


export default ViewQuote