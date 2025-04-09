"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Customer, Service } from "@/components/new-quote";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [service, setService] = useState({ type: "painting", active: true, quote: false });
    const [customerInputs, setCustomerInputs] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [serviceInputs, setServiceInputs] = useState({});

    const customerProps = { service, setService, customerInputs, setCustomerInputs };
    const serviceProps = { service, setService, serviceInputs, setServiceInputs };
    const quoteProps = { customerInputs, serviceInputs, service, setService };

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 max-h-11/12 grid place-items-center overflow-auto">
                <div className="xl:w-5/12 w-10/12 max-h-10/12 p-4 py-8 pb-4 rounded-md bg-slate-200 shadow-xl overflow-y-auto">
                    {!service.active && !service.quote && <Customer {...customerProps} />}
                    {service.active && <Service {...serviceProps} />}
                    {service.quote && <Quote {...quoteProps} />}
                </div>
            </main>
        </>
    )
}

const Quote = ({ customerInputs, serviceInputs, service, setService }) => {
    const [quote, setQuote] = useState(null);

    useEffect(() => {
        if (serviceInputs) {
            const {
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
                wallArea: wallAreas.toFixed(2),
                ceilingArea: ceilingArea.toFixed(2),
                accentWallArea: accentWallArea.toFixed(2),
                total: total.toFixed(2),
            });
        }
    }, [serviceInputs]);

    if (!serviceInputs) return <p className="p-6 text-xl">No service input found.</p>;

    const newQuote = () => {
        try {
            const customer = {
                name: customerInputs.name,
                phone: customerInputs.phone,
                address: customerInputs.address,
                quotes: [quote],
            };
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
