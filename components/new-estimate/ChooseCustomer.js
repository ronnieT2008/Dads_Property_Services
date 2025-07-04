"use client"
import axios from "axios";
import { useEffect, useState } from "react"

const ChooseCustomer = ({ setOption, setCustomerInfo, setService, service, customers }) => {
    const [loading, setLoading] = useState(false);
    const [customer, setCustomer] = useState();
    const [activeIndex, setActiveIndex] = useState(null); // ✅ lifted active index

    const handleNext = () => {
        if (!customer) return;
        setCustomerInfo(customer);
        setService({ ...service, active: true });
    }

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <h1 className="text-3xl font-medium mb-4">Customer</h1>

            {/* Scrollable customer list */}
            <div className="bg-slate-100 rounded-md p-6 overflow-auto flex-1">
                {!loading &&
                    customers.map((cust, index) => (
                        <Customer
                            key={index}
                            {...cust}
                            isActive={activeIndex === index}
                            onClick={() => {
                                if (activeIndex === index) {
                                    setActiveIndex(null);
                                    setCustomer(undefined);
                                } else {
                                    setActiveIndex(index);
                                    setCustomer(cust);
                                }
                            }}
                        />
                    ))
                }
            </div>

            {/* Bottom buttons fixed in layout */}
            <div className="pt-4 space-y-2">
                <button
                    className={`w-full bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md text-xl ${!customer ? "opacity-70 cursor-not-allowed" : ""}`}
                    onClick={handleNext}
                >
                    Next
                </button>
                <button
                    className="w-full bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded-md text-xl"
                    onClick={() => setOption({ active: true, estimate: false })}
                >
                    Back
                </button>
            </div>
        </div>
    )
}

const Customer = ({ name, phone, address, services, isActive, onClick }) => {
    return (
        <div
            className={`w-full bg-white shadow-md border border-slate-300 hover:border-blue-500 transition-all p-4 rounded-lg cursor-pointer grid grid-cols-1 md:grid-cols-2 gap-4 mb-3 ${isActive ? "ring-2 ring-blue-500" : ""}`}
            onClick={onClick}
        >
            <div className="space-y-1">
                <p className="text-base font-medium">🧾 Name: <span className="font-normal">{name}</span></p>
                <p className="text-base font-medium">📞 Phone: <span className="font-normal">{phone}</span></p>
                <p className="text-base font-medium">🏠 Address: <span className="font-normal">{address}</span></p>
                <p className="text-sm text-slate-500 mt-1">🗂️ Total Services: {services.length}</p>
            </div>
            <div>
                <p className="font-semibold mb-1">🆕 Latest Service:</p>
                <div className="ml-2 text-sm space-y-1">
                    <p><span className="font-medium">📌 Room:</span> {services[services.length - 1]?.roomName}</p>
                    <p><span className="font-medium">💰 Total:</span> ${services[services.length - 1]?.total}</p>
                </div>
            </div>
        </div>
    )
}

export default ChooseCustomer;
