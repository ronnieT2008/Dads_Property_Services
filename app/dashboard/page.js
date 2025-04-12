"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuotes();
    }, [])

    const getQuotes = async () => {
        try {
            const res = await axios.get(`/api/quotes/getAll`);

            if (res.status !== 200) await axios.post("/api/logout");

            setQuotes(res.data.quotes);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-10 xl:pl-14 px-10 overflow-auto">
                <h1 className="text-3xl font-medium mb-10">Welcome Back 👋</h1>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                    {quotes.map((quote, index) => <Quote key={index} {...quote} />)}
                </div>
            </main>
        </>
    )
}

const Quote = (props) => {
    const {
        roomName,
        total,
        wallArea,
        accentWallArea,
        ceilingArea,
        ceilingHeight,
        wallsNum,
        wallsLength,
        doorsNum,
        ceilingType,
        windowFrames,
    } = props;

    return (
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-2">🏠 {roomName}</h2>
            <p className="text-lg font-medium text-gray-800 mb-4">💰 Total: ${parseFloat(total).toFixed(2)}</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700">
                <div>🧱 Wall Area: <span className="font-semibold">{wallArea} sq ft</span></div>
                <div>🎨 Accent Wall: <span className="font-semibold">{accentWallArea} sq ft</span></div>
                <div>🏔️ Ceiling Area: <span className="font-semibold">{ceilingArea} sq ft</span></div>
                <div>📏 Height: <span className="font-semibold">{ceilingHeight} ft</span></div>
                <div>🧱 Walls: <span className="font-semibold">{wallsNum}</span> ({wallsLength} ft)</div>
                <div>🚪 Doors: <span className="font-semibold">{doorsNum}</span></div>
                <div>🪟 Windows: <span className="font-semibold">{windowFrames}</span></div>
                <div>🧱 Ceiling Type: <span className="font-semibold">{ceilingType || "None"}</span></div>
            </div>
        </div>
    );
};
