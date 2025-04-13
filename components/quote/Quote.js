import { useEffect, useState } from "react";

const Quote = (props) => {
    const [show, setShow] = useState(true);

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
        search
    } = props;

    useEffect(() => {
        if (!search) {
            setShow(true);
            return;
        }

        const lowerSearch = search.toLowerCase();

        const allValues = Object.entries(props)
            .filter(([key]) => key !== "search")
            .map(([_, value]) => String(value).toLowerCase());

        const matched = allValues.some(val => val.includes(lowerSearch));
        setShow(matched);
    }, [search, props]);

    if (!show) return null;

    return (
        <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6">
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

export default Quote;
