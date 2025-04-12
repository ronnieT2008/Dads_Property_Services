"use client"
import axios from "axios";
import { useEffect, useState } from "react"

const ChooseCustomer = ({ setOption, setCustomerInfo, setService, service }) => {
    const [customers, setCustomers] = useState({});
    const [loading, setLoading] = useState(true);
    const [customer, setCustomer] = useState();

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const res = await axios.get("/api/customer/get");
            // console.log(res.data.customers);

            if (res.status === 200) setCustomers(res.data.customers);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    const handleNext = () => {
        if (!customer) return;
        setCustomerInfo(customer);
        setService({ ...service, active: true });
    }

    return (
        <div className="w-full h-full px-4 m">
            <h1 className="text-3xl font-medium mb-4">Customer</h1>
            <div className="bg-slate-100 max-h-9/12 h-9/12 rounded-md p-6 overflow-auto">
                {
                    !loading && customers.map((customer, index) => <Customer key={index} {...customer} setCustomer={setCustomer} customers={customers} />)
                }
            </div>
            <div className="w-full mt-5">
                <button className={`w-full bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl mb-2 ${!customer ? "opacity-70 cursor-not-allowed" : ""}`} onClick={() => handleNext()}>Next</button>
                <button className={`w-full bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => setOption({ active: true, quote: false })}>Back</button>
            </div>
        </div>
    )
}

const Customer = (props) => {
    const { name, phone, address, quotes, setCustomer } = props;
    const [active, setActive] = useState(false);

    const handleClick = () => {
        if (active) {
            setActive(false);
            setCustomer();
        } else {
            setCustomer(props);
            setActive(true);
        }
    }

    return (
        <div className={`w-full 4/12 bg-slate-200 hover:bg-slate-300 cursor-pointer p-4 rounded-md grid grid-cols-2 mb-4 ${active ? "bg-slate-300" : ""}`} onClick={() => handleClick()}>
            <div className="grid grid-rows-3">
                <p className="text-md">Name: {name}</p>
                <p className="text-md">Phone: {phone}</p>
                <p className="text-md">Address: {address}</p>
            </div>
            <div className="">
                <p className="font-medium">Latest Quote:</p>
                <div className="ml-4">
                    <p>Name: {quotes[quotes.length - 1].roomName}</p>
                    <p>Total: {quotes[quotes.length - 1].total}</p>
                </div>
            </div>
        </div>
    )
}

export default ChooseCustomer