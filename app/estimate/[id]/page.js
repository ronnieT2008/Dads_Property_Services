"use client"

import { Customer, Service } from "@/components/estimate";
import Navbar from "@/components/navbar/LoggedNavbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const Page = ({ params }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [loading, setLoading] = useState(true);
    const [estimate, setEstimate] = useState({});

    useEffect(() => {
        getEstimate();
    }, [])

    const getEstimate = async () => {
        try {
            const { id } = await params;
            const res = await axios.post("/api/estimate/get", { estimateId: id });

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
                <h1 className="text-4xl font-medium mb-10">Estimate</h1>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        estimate ?
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 rounded max-h-12/12">
                                <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 space-y-4 col-span-1 sm:col-span-2 xl:col-span-3 overflow-auto md:max-h-[75vh]">
                                    <CustomerFields estimate={estimate} setEstimate={setEstimate} />
                                    <div className="grid gap-4">
                                        {
                                            estimate.services.map((service, idx) => (
                                                <Service key={idx} {...service} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="w-full bg-red-200 rounded-md p-4 ">
                                <h2 className="text-2xl font-medium inline-block">No Estimate Found</h2>
                                <Link href="#" className="float-right" onClick={() => window.history.back()}>
                                    <Image src="/back.svg" width={32} height={32} alt="add" className="inline mr-2 mb-1 bg-red-200 hover:bg-red-300 rounded-full" />
                                </Link>
                            </div>
                }
            </main>
        </>
    )
}

const CustomerFields = ({ estimate, setEstimate }) => {
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState(estimate);

    const handleSave = async () => {
        try {
            if (inputs.name === '' || inputs.address === '' || inputs.phone === '') return;
            setEstimate(inputs);
            await axios.post("/api/estimate/update", inputs);
            setEdit(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleDecline = async () => {
        setEdit(false);
    }

    const renderField = (label, value, fieldKey, icon, title) => {
        return edit ? (
            <div className={`max-w-4/12 inline-block ${title ? "w-full" : ""}`}>
                <label className={`block ${title ? "font-semibold text-3xl" : ""}`}>{icon} {label}</label>
                <input
                    className={`text-xl rounded-md bg-slate-100 px-3 py-1 mt-1 w-full focus:outline-none ${title ? "text-3xl mt-2" : ""}`}
                    value={inputs[fieldKey.toLowerCase()]}
                    onChange={(e) => setInputs({ ...inputs, [fieldKey.toLowerCase()]: e.target.value })}
                />
            </div>
        ) : (
            <p>{icon} <strong>{label}:</strong> {value}</p>
        );
    };

    return (
        <div className="border-b pb-4">
            <div>
                {
                    edit ?
                        <>
                            {renderField("Customer Name", inputs.name, "name", "🧾", true)}
                            <Image width={35} height={35} alt="accept" className="block ml-2 float-right hover:scale-110 cursor-pointer" src="/new_outline.svg" onClick={() => handleSave()} />
                            <Image width={35} height={35} alt="decline" className="block ml-4 float-right hover:scale-110 cursor-pointer" src="/delete.svg" onClick={() => handleDecline()} />
                        </>
                        :
                        <>
                            <p className="text-3xl font-semibold mb-2 inline-block">🧾 {estimate.name}</p>
                            <Image width={35} height={35} alt="edit" className="block ml-4 float-right hover:scale-110 cursor-pointer" src="/edit.svg" onClick={() => setEdit(!edit)} />
                        </>
                }
                <span className="text-xl text-white bg-blue-900 px-3 py-1 rounded-full float-right">
                    {estimate.status}
                </span>
            </div>
            <div className="grid grid-cols-1 gap-y-1 text-xl mt-4">
                {renderField("Phone", inputs.phone, "Phone", "📞")}
                {renderField("Address", inputs.address, "Address", "🏠")}
            </div>
            {/* {
                edit ?
                    <>
                        <div>
                            <input type="text" className="w-5/12 rounded-md bg-slate-100 focus:outline-none text-xl px-3 py-2 mt-2" placeholder="Phone" value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} />
                        </div>
                        <div>
                            <input type="text" className="w-5/12 rounded-md bg-slate-100 focus:outline-none text-xl px-3 py-2 mt-2" placeholder="Address" value={inputs.address} onChange={(e) => setInputs({ ...inputs, address: e.target.value })} />
                        </div>
                    </> :
                    <>
                        <p className="text-lg font-medium">📞 Phone: <span className="font-normal">{estimate.phone}</span></p>
                        <p className="text-lg font-medium">🏠 Address: <span className="font-normal">{estimate.address}</span></p>
                    </>
            } */}
            <p className={`text-md text-slate-500 ${!edit ? "mt-1" : "mt-2"}`}>🗂️ Total Services: {estimate.services.length}</p>
        </div>
    )
}

export default Page