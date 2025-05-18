import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Service = (props) => {
    const { roomName, serviceType, search } = props;

    return (
        <Link className="bg-white block shadow-md border border-slate-300 rounded-lg p-6 select-none cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all" href={`/service/${props.id}`}>
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">🏠 {roomName}</h2>
                <span className="text-sm text-white bg-blue-900 px-3 py-1 rounded-md">
                    {serviceType}
                </span>
            </div>
            <Painting {...props} />
            <p className="font-bold inline-block">💵 Total: {props.total}</p>
        </Link>
    );
};

const Painting = ({ wallGallons, ceilingGallons, wallArea, ceilingArea }) => {
    return (
        <div className="grid grid-cols-2 mt-4 mb-2">
            <p>🧱 Wall Area: {wallArea}</p>
            <p>🧱 Ceiling Area: {ceilingArea}</p>
            <p>🎨 Wall Gallons: {wallGallons}</p>
            <p>🎨 Ceiling Gallons: {ceilingGallons}</p>
        </div>
    )
}

export default Service;
