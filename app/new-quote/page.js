"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Customer, Service, ViewQuote } from "@/components/new-quote";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [service, setService] = useState({ type: "painting", active: true, quote: false });
    const [customerInputs, setCustomerInputs] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [serviceInputs, setServiceInputs] = useState({});

    const customerProps = { service, setService, customerInputs, setCustomerInputs };
    const serviceProps = { service, setService, serviceInputs, setServiceInputs };
    const quoteProps = { customerInputs, serviceInputs, service, setService };

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 max-h-11/12 grid place-items-center overflow-auto">
                <div className="xl:w-5/12 w-10/12 max-h-10/12 p-4 py-8 pb-4 rounded-md bg-slate-200 shadow-xl overflow-y-auto">
                    {!service.active && !service.quote && <Customer {...customerProps} />}
                    {service.active && <Service {...serviceProps} />}
                    {service.quote && <ViewQuote {...quoteProps} />}
                </div>
            </main>
        </>
    )
}