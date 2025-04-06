"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })

    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="xl:w-10/12 ml-auto h-11/12 pt-20 xl:pl-20">
                <div className="w-full h-7/12 grid grid-rows-2 gap-15">
                    <div className="grid w-full h-fuill grid-cols-3 gap-15">
                        <div className="w-full h-full bg-slate-100 rounded-xl"></div>
                        <div className="w-full h-full bg-slate-100 rounded-xl"></div>
                        <div className="xl:w-10/12 h-full bg-slate-100 rounded-xl"></div>
                    </div>
                    <div className="grid w-full h-fuill grid-cols-3 gap-15">
                        <div className="w-full h-full bg-slate-100 rounded-xl"></div>
                        <div className="w-full h-full bg-slate-100 rounded-xl"></div>
                        <div className="xl:w-10/12 h-full bg-slate-100 rounded-xl"></div>
                    </div>
                </div>
            </main>
        </>
    )
}