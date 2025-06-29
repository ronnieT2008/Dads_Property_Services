"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Customer, ChooseCustomer, Service, ViewEstimate } from "@/components/new-estimate";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })

    const [service, setService] = useState({ type: "painting", active: false, estimate: false });
    const [option, setOption] = useState({ active: true, estimate: false });

    const [customerInputs, setCustomerInputs] = useState({
        name: '',
        phone: '',
        address: '',
        id: '',
    });

    const [serviceInputs, setServiceInputs] = useState({});
    const customerProps = { setOption, service, setService, customerInputs, setCustomerInputs };

    const serviceProps = { service, setService, serviceInputs, setServiceInputs };
    const estimateProps = { customerInputs, serviceInputs, service, setService };

    const [customers, setCustomers] = useState([]);

    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get("/api/estimate/customer/get");
            if (res.status === 200) setCustomers(res.data.customers);
        } catch (err) {
            console.log(err);
            if (err.status === 500 || err.status === 400) await axios.post("/api/logout");
            router.refresh();
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="grid place-items-center h-full max-h-10/12 md:max-h-11/12 overflow-auto pt-4 md:pb-4 w-full xl:w-10/12 lg:ml-auto">
                <div className={`w-11/12 xl:w-5/12 h-full pb-4 rounded-md bg-slate-200 shadow-xl overflow-y-auto ${option.active || option.estimate === true ? "h-10/12" : ""}`}>
                    {option.active ?
                        <div className="h-full grid grid-rows-2 gap-4 px-4 pt-4">
                            <button className="w-full rounded-md bg-slate-50 hover:bg-slate-100 h-full cursor-pointer text-3xl font-medium" onClick={() => setOption({ active: false, estimate: false })}
                            >New Customer</button>
                            <button className="w-full rounded-md bg-slate-50 hover:bg-slate-100 h-full cursor-pointer text-3xl font-medium" onClick={() => setOption({ active: false, estimate: true })}>Add Estimate To Existing Customer</button>
                        </div>
                        :
                        <>
                            {!option.estimate ?
                                <div className="w-full h-full py-4 md:pt-6 md:pb-0 md:px-4">
                                    {!service.active && !service.estimate && <Customer {...customerProps} />}
                                    {service.active && <Service {...serviceProps} />}
                                    {service.estimate && <ViewEstimate {...estimateProps} existingCustomer={false} />}
                                </div> :
                                <div className={`w-full h-full ${service.active ? "md:pt-4 md:px-2" : "p-4 pb-0"}`}>
                                    {!service.active && !service.estimate && <ChooseCustomer setOption={setOption} setCustomerInfo={setCustomerInputs} setService={setService} service={service} customers={customers} />}
                                    {service.active && customerInputs.id && <Service {...serviceProps} />}
                                    {service.estimate && <ViewEstimate {...estimateProps} existingCustomer={true} />}
                                </div>
                            }
                        </>
                    }
                </div>
            </main>
        </>
    )
}