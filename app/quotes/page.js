"use client";

import Navbar from "@/components/navbar/LoggedNavbar";
import { useMediaQuery } from "react-responsive";

export default function Page() {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1279px)' })
    return (
        <>
            <Navbar isTabletOrMobile={isTabletOrMobile} />
            <main className="w-10/12 ml-auto h-11/12 pt-20 pl-20 ">
                <h1>Quotes</h1>
            </main>
        </>
    )
}