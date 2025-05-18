"use client"

import { Customer, Service } from "@/components/estimate";
import Navbar from "@/components/navbar/LoggedNavbar";
import axios from "axios";
import { set } from "mongoose";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Page = ({ params }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [loading, setLoading] = useState(true);
    const [estimate, setEstimate] = useState({});
    const [service, setService] = useState({});

    useEffect(() => {
        getEstimate();
    }, [])

    const getEstimate = async () => {
        try {
            const { id } = await params;
            const res = await axios.post("/api/estimate/service/get", { serviceId: id });

            setService(res.data.service);
            setEstimate(res.data.estimate);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-10 xl:pl-14 px-10 overflow-auto">
                <h1 className="text-4xl font-medium mb-10">Service</h1>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        estimate ?
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 rounded max-h-12/12">
                                <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 space-y-4 col-span-1 sm:col-span-2 xl:col-span-3 overflow-auto md:max-h-[75vh]">
                                    <div>

                                        <CustomerFields estimate={estimate} setEstimate={setEstimate} />
                                        <ServiceFields service={service} setService={setService} estimate={estimate} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="w-full h-9/12 flex items-center justify-center">
                                <h2>No Estimate</h2>
                            </div>
                }
            </main>
        </>
    )
}


const ServiceFields = ({ service, setService, estimate }) => {
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState(service);

    const handleSave = async () => {
        try {
            setService(inputs);
            await axios.post("/api/estimate/service/update", { service: inputs, estimate });
            setEdit(false);
        } catch (err) {
            console.log(err);
        }
    };

    const handleCancel = () => {
        setInputs(service);
        setEdit(false);
    };

    const renderField = (label, value, fieldKey, icon) => {
        return edit ? (
            <div>
                <label className="block font-semibold">{icon} {label}</label>
                <input
                    className="text-xl rounded-md bg-slate-100 px-3 py-1 mt-1 w-full focus:outline-none"
                    value={inputs[fieldKey]}
                    onChange={(e) => setInputs({ ...inputs, [fieldKey]: e.target.value })}
                />
            </div>
        ) : (
            <p>{icon} <strong>{label}:</strong> {value}</p>
        );
    };

    return (
        <div className="pt-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-semibold">🛠 Service Information</h2>
                {edit ? (
                    <div className="flex space-x-3">
                        <Image src="/new_outline.svg" width={35} height={35} alt="save" className="hover:scale-110 cursor-pointer" onClick={handleSave} />
                        <Image src="/delete.svg" width={35} height={35} alt="cancel" className="hover:scale-110 cursor-pointer" onClick={handleCancel} />
                    </div>
                ) : (
                    <Image src="/edit.svg" width={35} height={35} alt="edit" className="hover:scale-110 cursor-pointer" onClick={() => setEdit(true)} />
                )}
            </div>

            {/* Main Service Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10 text-xl mt-8 px-6">
                {renderField("Room", inputs.roomName, "roomName", "🏠")}
                {renderField("Wall Area", inputs.wallArea, "wallArea", "🧱")}
                {renderField("Ceiling Area", inputs.ceilingArea, "ceilingArea", "🧱")}
                {renderField("Type", inputs.serviceType, "serviceType", "📌")}
                {renderField("Wall Gallons", inputs.wallGallons, "wallGallons", "🖌️")}
                {renderField("Ceiling Gallons", inputs.ceilingGallons, "ceilingGallons", "🖌️")}
                {renderField("Total", `$${inputs.total}`, "total", "💵")}
                {renderField("Trim Sq. Ft", inputs.trimSqFt, "trimSqFt", "🧩")}
                {renderField("Trim Quarts", inputs.trimQuarts, "trimQuarts", "🖌️")}
            </div>

            {/* Additional */}
            <h2 className="text-2xl font-semibold mt-12">📐 Detailed Measurements</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10 text-xl mt-8 px-6">
                {renderField("Number of Walls", inputs.wallsNum, "wallsNum", "🧱")}
                {renderField("Ceiling Height", inputs.ceilingHeight, "ceilingHeight", "📏")}
                {renderField("Doors", inputs.doorsNum, "doorsNum", "🚪")}
                {renderField("Wall Length", inputs.wallsLength, "wallsLength", "📏")}
                {renderField("Window Frames", inputs.windowFrames, "windowFrames", "🪟")}
                {renderField("Door Frames", inputs.doorFrames, "doorFrames", "🚪")}
                {renderField("Accent Wall Area", inputs.accentWallArea, "accentWallArea", "🎨")}
            </div>

            <div className="border-t my-6"></div>

            {/* Description */}
            <h2 className="text-3xl font-semibold">💬 Service Description</h2>
            <div className="grid grid-cols-1 gap-y-4 gap-x-10 text-xl mt-8 px-6">
                {edit ? (
                    <textarea
                        className="rounded-md bg-slate-100 px-3 py-2 w-full focus:outline-none"
                        rows={4}
                        value={inputs.description}
                        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                    />
                ) : (
                    <p>{inputs.description}</p>
                )}
            </div>
        </div>
    );
};

const CustomerFields = ({ estimate }) => {
    return (
        <div className="border-b pb-4">
            <div>
                <p className="text-3xl font-semibold mb-2 inline-block">🧾 {estimate.name}</p>
                <span className="text-xl text-white bg-blue-900 px-3 py-1 rounded-full float-right">
                    {estimate.status}
                </span>
            </div>
            <p className="text-lg font-medium">📞 Phone: <span className="font-normal">{estimate.phone}</span></p>
            <p className="text-lg font-medium">🏠 Address: <span className="font-normal">{estimate.address}</span></p>
        </div>
    )
}

export default Page