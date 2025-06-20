"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { Estimate } from "@/components/estimate";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    const [estimates, setEstimates] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        getEstimates();
    }, [])

    const getEstimates = async () => {
        try {
            const res = await axios.get(`/api/estimate/getAll`);
            console.log(res.data);

            setEstimates(res.data.estimates);
            setLoading(false);
        } catch (err) {
            if (err.status === 500 || err.status === 400) await axios.post("/api/logout");
            router.refresh();
            console.log(err);
        }
    }

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-10 xl:pl-14 px-5 md:px-10 overflow-auto">
                <h1 className="text-3xl font-medium mb-10">Welcome Back 👋</h1>
                {
                    loading ?
                        <div className="w-full h-9/12 flex items-center justify-center">
                            <span className="loader block"></span>
                        </div>
                        :
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pb-10">
                            {[...estimates].reverse().map((estimate, index) => index <= 5 && <Estimate key={index} {...estimate} />)}
                        </div>
                }
            </main>
        </>
    )
}