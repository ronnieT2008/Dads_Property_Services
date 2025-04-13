"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Quote, Customer } from "@/components/quote";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [recentQuotes, setRecentQuotes] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState("most recent");

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const quotesRes = await axios.get(`/api/quotes/getAll`);
            const customersRes = await axios.get(`/api/customer/get`);

            if (quotesRes.status !== 200 || customersRes.status !== 200) await axios.post("/api/logout");

            setRecentQuotes(quotesRes.data.quotes);
            setCustomers(customersRes.data.customers);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-10 xl:pl-14 px-10 overflow-auto">
                <h1 className="text-3xl font-medium mb-6">View Quotes</h1>
                <div className="w-full bg-slate-100 shadow mb-6 p-3 px-6 rounded">
                    <label className="text-xl mr-5">Order By:</label>
                    <select className="rounded-md bg-white focus:outline-none text-xl p-3 py-2" value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
                        <option value="most recent">Most Recent</option>
                        <option value="oldest">Oldest</option>
                        <option value="customers">Customer&apos;s</option>
                    </select>
                    <label className="text-xl ml-8 mr-3">Search: </label>
                    <input type="text" placeholder={`${orderBy === "customers" ? "Customer Name" : "Search"}`} className="rounded-md bg-white focus:outline-none text-xl p-3 py-2" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                            {orderBy === "most recent" && recentQuotes.map((quote, index) => <Quote key={index} {...quote} search={search} />)}
                            {orderBy === "oldest" && [...recentQuotes].reverse().map((quote, index) => <Quote key={index} {...quote} search={search} />)}
                            {orderBy === "customers" && [...customers].reverse().map((customer, index) => <Customer key={index} {...customer} search={search} />)}
                        </div>
                }
            </main>
        </>
    )
}