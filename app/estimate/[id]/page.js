"use client"

import { Customer, Service } from "@/components/estimate";
import Navbar from "@/components/navbar/LoggedNavbar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
            <main className="xl:w-10/12 ml-auto h-11/12 pt-5 md:pt-10 xl:pl-14 px-5 md:px-10 overflow-auto">
                <h1 className="text-4xl font-medium mb-5 md:mb-10">Estimate</h1>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        estimate ?
                            <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 rounded h-10/12">
                                <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 space-y-4 col-span-1 sm:col-span-2 xl:col-span-3 overflow-auto md:max-h-[75vh]">
                                    <CustomerFields estimate={estimate} setEstimate={setEstimate} isTabletOrMobile={isTabletOrMobile} />
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
                <div></div>
            </main>
        </>
    )
}

const CustomerFields = ({ estimate, setEstimate, isTabletOrMobile }) => {
    const [edit, setEdit] = useState(false);
    const [inputs, setInputs] = useState(estimate);

    const renderField = (label, value, fieldKey, icon, title) => {
        return edit ? (
            <div className={`md:max-w-4/12 inline-block ${title ? "w-full" : ""}`}>
                <label className={`block ${title ? "font-semibold text-2xl md:text-3xl" : ""}`}>{icon} {label}</label>
                <input
                    className={`text-xl rounded-md bg-slate-100 px-3 py-1 mt-1 w-full focus:outline-none ${title ? "text-3xl mt-2" : ""}`}
                    value={inputs[fieldKey.toLowerCase()]}
                    onChange={(e) => setInputs({ ...inputs, [fieldKey.toLowerCase()]: e.target.value })}
                />
            </div>
        ) : (
            <p className="text-xl md:text-2xl">{icon} <strong>{label}:</strong> {value}</p>
        );
    };

    return (
        <div className="border-b pb-4">
            <EstimateBar {...{ edit, setEdit, estimate, setEstimate, inputs }} />
            <div>
                {
                    !edit ?
                        !isTabletOrMobile ? renderField("Customer Name", inputs.name, "name", "🧾", true) : renderField("Name", inputs.name, "name", "🧾", true)
                        :
                        <p className="text-3xl font-semibold mb-1 inline-block">🧾 {estimate.name}</p>
                }
            </div>
            <div className="grid grid-cols-1 gap-y-1 text-xl md:mt-4">
                {renderField("Phone", inputs.phone, "Phone", "📞")}
                {renderField("Address", inputs.address, "Address", "🏠")}
            </div>
            <p className={`text-md text-slate-500 ${!edit ? "mt-1" : "mt-2"}`}>🗂️ Total Services: {estimate.services.length}</p>
        </div>
    )
}

const EstimateBar = ({ edit, setEdit, estimate, setEstimate, inputs }) => {
    const router = useRouter();
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

    const deleteEstimate = async () => {
        try {
            if (confirm("Are you sure you want to delete this estimate?")) {
                const res = await axios.post("/api/estimate/delete", { estimate });

                if (res.status === 200) router.back();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="block">
            {!edit ?
                <>
                    <div
                        onClick={() => deleteEstimate()}
                        className="relative cursor-pointer bg-red-400 hover:bg-red-500 text-white rounded-full w-8 h-8 text-xs flex items-center justify-center my-auto float-right ml-3"
                    >
                        ✕
                    </div>
                    <Image width={35} height={35} alt="edit" className="block ml-4 float-right hover:scale-110 cursor-pointer" src="/edit.svg" onClick={() => setEdit(!edit)} />
                </> :
                <>
                    <Image width={35} height={35} alt="accept" className="block ml-2 float-right hover:scale-110 cursor-pointer" src="/new_outline.svg" onClick={() => handleSave()} />
                    <Image width={35} height={35} alt="decline" className="block ml-4 float-right hover:scale-110 cursor-pointer" src="/delete.svg" onClick={() => handleDecline()} />
                </>
            }
            <span className="text-xl text-white bg-blue-900 px-3 py-1 rounded-full float-right">
                {estimate.status}
            </span>
        </div>
    )
}

export default Page