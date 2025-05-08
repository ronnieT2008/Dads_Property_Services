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
            } = serviceInputs;

            const parsedHeight = parseFloat(ceilingHeight) || 0;

            // Parse walls into { length, accent }
            const parsedWalls = walls.map(w => ({
                length: parseFloat(w.length) || 0,
                accent: Boolean(w.accent),
            }));

            const totalWallLength = parsedWalls.reduce((sum, w) => sum + w.length, 0);
            const wallArea = totalWallLength * parsedHeight;

            // 🎨 Wall paint: 2 coats, 350 sq ft per gallon, $60 per gallon
            const totalWallSqft = wallArea * 2;
            const wallGallons = Math.ceil(totalWallSqft / 350);
            const wallPaintCost = wallGallons * 60;

            // 🪞 Trim paint: based on total wall length x height, $25 per quart
            const trimHeightInInches = parsedHeight * 12;
            const trimSqFt = (totalWallLength * trimHeightInInches) / 12;
            const trimQuarts = Math.ceil(trimSqFt / 100);
            const trimPaintCost = trimQuarts * 25;

            // 🚪 Doors: $200 per painted door
            const numDoors = parseInt(doorsNum) || 0;
            const doorCost = numDoors * 200;

            // 🚪🪟 Frames: $100 each (both door + window)
            const doorFrameCount = parseInt(doorFrames) || 0;
            const windowFrameCount = parseInt(windowFrames) || 0;
            const frameCount = doorFrameCount + windowFrameCount;
            const frameCost = frameCount * 100;

            // 🎨 Accent walls: $3.5 per sq ft, only if accent is true
            const accentWallArea = parsedWalls
                .filter(w => w.accent)
                .reduce((sum, w) => sum + (w.length * parsedHeight), 0);
            const accentWallCost = accentWallArea * 3.5;

            // 🧱 Ceiling area (assumes rectangular shape from first 2 walls)
            let ceilingArea = 0;
            if (parsedWalls.length >= 2) {
                ceilingArea = parsedWalls[0].length * parsedWalls[1].length;
            }

            // 🎨 Ceiling paint: 2 coats, 350 sq ft per gallon, $60 per gallon
            const ceilingGallons = Math.ceil((ceilingArea * 2) / 350);
            const ceilingPaintCost = ceilingGallons * 60;

            // 💰 Total cost
            const total = wallPaintCost + trimPaintCost + doorCost + frameCost + accentWallCost + ceilingPaintCost;

            setQuote({
                roomName,
                ceilingHeight: parsedHeight,
                doorFrames: doorFrameCount,
                windowFrames: windowFrameCount,
                doorsNum: numDoors,
                wallsNum: parsedWalls.length,
                wallsLength: totalWallLength.toFixed(2),
                wallArea: wallArea.toFixed(2),
                wallGallons,
                trimSqFt: trimSqFt.toFixed(2),
                trimQuarts,
                accentWallArea: accentWallArea.toFixed(2),
                ceilingArea: ceilingArea.toFixed(2),
                ceilingGallons,
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
                if (res.status === 200) router.push("/dashboard");
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="max-w-3xl h-full mx-auto p-6 py-0">
            <h1 className="text-3xl font-bold mb-6">Quote Summary</h1>
            <div className="space-y-4 text-xl">
                <p><strong>Room Name:</strong> {serviceInputs.roomName}</p>
                <p><strong>Wall Area:</strong> {quote?.wallArea} sq ft</p>
                <p><strong>Accent Wall Area:</strong> {quote?.accentWallArea} sq ft</p>
                <p><strong>Ceiling Area:</strong> {quote?.ceilingArea} sq ft</p>
                <p><strong>Ceiling Type:</strong> {serviceInputs.ceilingType}</p>
                <p><strong>Door Frames:</strong> {serviceInputs.doorFrames}</p>
                <p><strong>Window Frames:</strong> {serviceInputs.windowFrames}</p>
                <p><strong>Doors:</strong> {serviceInputs.doorsNum}</p>
                <p><strong>Gallons of Paint for Walls:</strong> {quote?.wallGallons} gallon(s)</p>
                <p><strong>Trim Paint:</strong> {quote?.trimQuarts} quart(s) ({quote?.trimSqFt} sq ft)</p>
            </div>
            <div className="w-full grid gap-2 mt-8">
                <p className="text-2xl font-semibold">Total Estimate: <span className="text-green-700">${quote?.total} CAD</span></p>
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