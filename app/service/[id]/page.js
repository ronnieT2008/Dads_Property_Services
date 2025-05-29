"use client"

import { Customer, Service } from "@/components/estimate";
import Navbar from "@/components/navbar/LoggedNavbar";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import PaintingCalculator from "@/components/calculators/PaintingCalculator";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

            setService((!res.data.service) ? res.data.estimate.services.find((ser) => ser.id.toString() === id) : res.data.service);
            setEstimate(res.data.estimate);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            setEstimate(null);
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
                                        <ServiceFields service={service} setService={setService} estimate={estimate} setEstimate={setEstimate} />
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="w-full bg-red-200 rounded-md p-4 ">
                                <h2 className="text-2xl font-medium inline-block">No Service Found</h2>
                                <Link href="#" className="float-right" onClick={() => window.history.back()}>
                                    <Image src="/back.svg" width={32} height={32} alt="add" className="inline mr-2 mb-1 bg-red-200 hover:bg-red-300 rounded-full" />
                                </Link>
                            </div>
                }
            </main>
        </>
    )
}


const ServiceFields = ({ service, setService, estimate, setEstimate }) => {
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState(service);
    const router = useRouter();

    const handleSave = async () => {
        try {
            PaintingCalculator({ estimate: inputs, setEstimate: setService });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const updateService = async () => {
            await axios.post("/api/estimate/service/update", { service, estimate });
            setEdit(false);
        }

        updateService();
    }, [service])

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

    const handleWallChange = (index, key, value) => {
        const updatedWalls = [...inputs.walls];
        updatedWalls[index][key] = key === "accent" ? value.target.checked : value.target.value;
        setInputs({ ...inputs, walls: updatedWalls });
    };

    const addWall = () => {
        const updatedWalls = [...(inputs.walls || []), { length: "", accent: false }];
        setInputs({ ...inputs, walls: updatedWalls });
    };

    const removeWall = (index) => {
        const updatedWalls = inputs.walls.filter((_, i) => i !== index);
        setInputs({ ...inputs, walls: updatedWalls });
    };

    const deleteService = async () => {
        try {
            if (confirm("Are you sure you want to delete this service?")) {
                const res = await axios.post("/api/estimate/service/delete", { estimate, service });

                if (res.status === 200) router.back();
            }
        } catch (err) {
            console.log(err);
        }
    }

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
                    <div className="flex gap-2">
                        <Image src="/edit.svg" width={35} height={35} alt="edit" className="hover:scale-110 cursor-pointer" onClick={() => setEdit(true)} />
                        <div
                            onClick={() => deleteService()}
                            className="relative cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-full w-7 h-7 text-xs flex items-center justify-center my-auto"
                        >
                            ✕
                        </div>
                    </div>
                )}
            </div>

            {/* Main Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10 text-xl mt-8 px-6">
                {renderField("Room", inputs.roomName, "roomName", "🏠")}
                {renderField("Ceiling Type", inputs.ceilingType, "ceilingType", "📐")}
                {renderField("Door Frames", inputs.doorFrames, "doorFrames", "🚪")}
                {renderField("Number of Walls", inputs.wallsNum, "wallsNum", "🧱")}
                {renderField("Ceiling Height", inputs.ceilingHeight, "ceilingHeight", "📏")}
                {renderField("Doors", inputs.doorsNum, "doorsNum", "🚪")}
                {renderField("Wall Length", inputs.wallsLength, "wallsLength", "📏")}
                {renderField("Window Frames", inputs.windowFrames, "windowFrames", "🪟")}
                {renderField("Trim Height", inputs.trimHeight, "trimHeight", "📏")}
            </div>

            {/* Wall Details */}
            <h2 className="text-2xl font-semibold mt-12">🧱 Wall Details</h2>
            <div className="space-y-4 mt-4 px-6 grid grid-cols-2 gap-x-4">
                {inputs?.walls?.map((wall, index) => (
                    <div key={index} className="border p-4 rounded-lg shadow-sm bg-slate-50 mb-4">
                        <div className="grid grid-cols-2 mb-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-medium">Wall {index + 1}</h3>
                            </div>
                            <div className="flex items-center space-x-3 ml-auto">
                                {edit ? (
                                    <>
                                        <button
                                            type="button"
                                            className={`text-sm font-semibold px-3 py-1 rounded-md cursor-pointer ${wall.accent ? 'bg-blue-900 text-white' : 'bg-slate-200'
                                                }`}
                                            onClick={() => {
                                                handleWallChange(index, "accent", { target: { checked: !wall.accent } });
                                            }}
                                        >
                                            Accent
                                        </button>

                                        <button
                                            onClick={() => removeWall(index)}
                                            className="relative cursor-pointer bg-red-400 text-white rounded-full w-6 h-6 text-xs flex items-center justify-center"
                                            title="Remove Wall"
                                        >
                                            ✕
                                        </button>
                                    </>
                                ) : (
                                    <p>{wall.accent ? "🎨 Accent Wall" : "🧱 Regular Wall"}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex">
                            <label className="inline-block font-semibold">📏 Length (ft)</label>
                            {edit ? (
                                <input
                                    type="number"
                                    className="bg-slate-200 rounded-md py-1 text-center inline-block w-9/12 mx-auto font-semibold focus:outline-none"
                                    value={wall.length}
                                    onChange={(e) => handleWallChange(index, "length", e)}
                                />
                            ) : (
                                <p className="text-gray-600 bg-slate-100 rounded-md py-1 text-center inline-block w-9/12 mx-auto font-semibold">{wall.length} ft</p>
                            )}
                        </div>
                    </div>
                ))}
                {edit && (
                    <div className="flex w-full bg-blue-900 rounded-md mb-4">
                        <button
                            onClick={addWall}
                            className="text-xl text-white px-4 py-2 w-full"
                        >
                            Add Wall
                        </button>
                    </div>
                )}
            </div>

            {/* Description */}
            <h2 className="text-2xl font-semibold mt-12">💬 Service Description</h2>
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

            {/* Extra Info */}
            <h2 className="text-2xl font-semibold mt-8">🧮 Calculations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 gap-x-10 text-xl mt-8 px-6">
                <p>💵 <strong>Total:</strong> {service.total}</p>
                <p>🏠 <strong>Ceiling Area:</strong> {service.ceilingArea}</p>
                <p>📏 <strong>Trim Height (in):</strong> {service.trimHeightInInches}</p>
                <p>🪣 <strong>Wall Gallons:</strong> {service.wallGallons}</p>
                <p>🪣 <strong>Ceiling Gallons:</strong> {service.ceilingGallons}</p>
                <p>📐 <strong>Trim SqFt:</strong> {service.trimSqFt}</p>
                <p>🧱 <strong>Wall Area:</strong> {service.wallArea}</p>
                <p>🎨 <strong>Accent Wall Area:</strong> {service.accentWallArea}</p>
                <p>🧴 <strong>Trim Quarts:</strong> {service.trimQuarts}</p>
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