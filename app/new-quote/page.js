"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Customer, ChooseCustomer, Service, ViewQuote } from "@/components/new-quote";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [service, setService] = useState({ type: "painting", active: false, quote: false });
    const [customerInputs, setCustomerInputs] = useState({
        name: '',
        phone: '',
        address: ''
    });
    const [option, setOption] = useState({ active: true, quote: false });
    const [serviceInputs, setServiceInputs] = useState({});

    const customerProps = { setOption, service, setService, customerInputs, setCustomerInputs };
    const serviceProps = { service, setService, serviceInputs, setServiceInputs };
    const quoteProps = { customerInputs, serviceInputs, service, setService };

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 max-h-11/12 grid place-items-center overflow-auto">
                <div className={`xl:w-5/12 w-10/12 max-h-10/12 p-4 pb-4 rounded-md bg-slate-200 shadow-xl overflow-y-auto ${option.active || option.quote === true ? "h-10/12" : ""}`}>
                    {option.active ?
                        <>
                            <div className="h-full grid grid-rows-2 gap-4">
                                <button className="w-full rounded-md bg-slate-50 hover:bg-slate-100 h-full cursor-pointer text-3xl font-medium" onClick={() => setOption({ active: false, quote: false })}
                                >New Customer</button>
                                <button className="w-full rounded-md bg-slate-50 hover:bg-slate-100 h-full cursor-pointer text-3xl font-medium" onClick={() => setOption({ active: false, quote: true })}>Add Quote To Existing Customer</button>
                            </div>
                        </>
                        :
                        <>
                            {!option.quote ?
                                <>
                                    {!service.active && !service.quote && <Customer {...customerProps} />}
                                    {service.active && <Service {...serviceProps} />}
                                    {service.quote && <ViewQuote {...quoteProps} />}
                                </> :
                                <>
                                    {!service.active && !service.quote && <ChooseCustomer setOption={setOption} />}
                                    {/* {service.active && <Service {...serviceProps} />}
                                    {service.quote && <ViewQuote {...quoteProps} />} */}
                                </>
                            }
                        </>
                    }
                </div>
            </main>
        </>
    )
}