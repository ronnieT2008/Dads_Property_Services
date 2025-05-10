"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Estimate, Customer } from "@/components/quote";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [estimates, setEstimates] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [orderBy, setOrderBy] = useState("most recent");

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const quotesRes = await axios.get(`/api/estimate/getAll`);

            if (quotesRes.status !== 200) await axios.post("/api/logout");

            setEstimates(quotesRes.data.estimates);
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
                            {orderBy === "oldest" && estimates.map((quote, index) => <Estimate key={index} {...quote} search={search} />)}
                            {orderBy === "most recent" && [...estimates].reverse().map((quote, index) => <Estimate key={index} {...quote} search={search} />)}
                            {orderBy === "customers" && [...estimates].reverse().map((estimates, index) => <Customer key={index} {...estimates} search={search} />)}
                        </div>
                }
            </main>
        </>
    )
}