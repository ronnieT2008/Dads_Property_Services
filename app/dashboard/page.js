"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Quote } from "@/components/quote";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [quotes, setQuotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getQuotes();
    }, [])

    const getQuotes = async () => {
        try {
            const res = await axios.get(`/api/quotes/getAll`);

            if (res.status !== 200) await axios.post("/api/logout");

            setQuotes(res.data.quotes);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-10 xl:pl-14 px-10 overflow-auto">
                <h1 className="text-3xl font-medium mb-10">Welcome Back 👋</h1>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                            {quotes.map((quote, index) => index <= 5 && <Quote key={index} {...quote} />)}
                        </div>
                }
            </main>
        </>
    )
}