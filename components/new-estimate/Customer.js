"use client";
import { useState } from "react";

const Customer = ({ setOption, service, setService, customerInputs, setCustomerInputs }) => {
    const [inputs, setInputs] = useState(customerInputs);

    const handleNext = () => {
        setService({ ...service, active: true });
        setCustomerInputs(inputs);
    };

    return (
        <div className="flex flex-col h-full">
            <div className="px-4">
                <h1 className="text-3xl font-medium">Customer</h1>

                <div className="mt-8">
                    <label className="text-xl">Name</label>
                    <input
                        type="text"
                        className="w-full rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2"
                        value={inputs.name}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                    />
                </div>

                <div className="mt-6">
                    <label className="text-xl">Address</label>
                    <input
                        type="text"
                        className="w-full rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2"
                        value={inputs.address}
                        onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                    />
                </div>

                <div className="mt-6">
                    <label className="text-xl">Phone</label>
                    <input
                        type="number"
                        className="w-full rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2"
                        value={inputs.phone}
                        onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                    />
                </div>
            </div>

            <div className="mt-auto pt-8 pb-4 px-4">
                <h1 className="text-3xl font-medium mb-4">Service</h1>

                <div className="grid xl:grid-cols-3 gap-4">
                    <div
                        className={`rounded-md grid place-items-center cursor-pointer py-2 ${service.type === "painting" ? "bg-blue-950 text-white" : "bg-slate-50"
                            }`}
                        onClick={() => setService({ ...service, service: "painting" })}
                    >
                        <h1 className="text-2xl font-medium mb-1">Painting</h1>
                    </div>
                    <div className="bg-slate-50 rounded-md grid place-items-center cursor-pointer py-2">
                        <h1 className="text-2xl font-medium mb-1">Service 2</h1>
                    </div>
                    <div className="bg-slate-50 rounded-md grid place-items-center cursor-pointer py-2">
                        <h1 className="text-2xl font-medium mb-1">Service 3</h1>
                    </div>
                </div>

                <div className="mt-6">
                    <button className={`w-full bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl ${inputs.name && inputs.address && inputs.phone ? "" : "opacity-70"} mb-2`}
                        onClick={() => {
                            inputs.name && inputs.address && inputs.phone && service && handleNext();
                        }}>Next</button>

                    <button className={`w-full bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => setOption({ active: true, estimate: false })}>Back</button>
                </div>
            </div>
        </div>
    );
};

export default Customer;
