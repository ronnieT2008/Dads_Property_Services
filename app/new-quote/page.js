"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Customer, Service } from "@/components/new-quote";
import { useState } from "react";

export default function Page() {
    const [service, setService] = useState({ type: "painting", active: false });
    const [customerInputs, setCustomerInputs] = useState({
        name: null,
        phone: null,
        address: null
    });
    const [serviceInputs, setServiceInputs] = useState({});

    const customerProps = { service, setService, inputs: customerInputs, setInputs: setCustomerInputs };
    const serviceProps = { service, setService, inputs: serviceInputs, setInputs: setServiceInputs };

    console.log(serviceInputs);


    return (
        <>
            <Navbar />
            <main className="w-10/12 ml-auto h-11/12 max-h-11/12 grid place-items-center overflow-auto">
                <div className="w-5/12 h-10/12 p-4 py-8 rounded-md bg-slate-200 shadow-xl overflow-y-auto">
                    {service.active ?
                        <Service {...serviceProps} />
                        :
                        <Customer {...customerProps} />
                    }
                </div>
            </main>
        </>
    )
}