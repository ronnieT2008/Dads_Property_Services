"use client";
import Image from "next/image"
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import Link from "next/link";

export const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        src: "/dashboard.svg"
    },
    {
        name: "View Estimates",
        href: "/estimates",
        src: "/history.svg"
    },
    {
        name: "New Estimate",
        href: "/new-estimate",
        src: "/new_outline.svg"
    },
]

const Navbar = ({ isTabletOrMobile }) => {
    const [sideNav, setSideNav] = useState();
    const pathname = usePathname()

    useEffect(() => {
        setSideNav(!isTabletOrMobile);
    }, [])

    return (
        <>
            {/* sidenav */}
            <div className={`absolute z-10 inset-0 h-screen w-full xl:w-2/12 ease-in-out duration-300 shadow-md ${sideNav ? "translate-x-0" : "translate-x-[-100%]"} bg-slate-200 pt-25`}>
                {navLinks.map(({ name, href }, index) => (
                    <div key={index}>
                        <Link href={href} className={`text-xl px-5 py-3 w-full block hover:bg-slate-300 cursor-pointer ${pathname === href ? "bg-slate-300" : ""}`}>
                            <Image src={navLinks[index].src} width={20} height={20} alt={name} className="inline mr-2 mb-1" />
                            {name}
                        </Link>
                    </div>
                ))}
            </div>

            {/* top nav */}
            <nav className="w-full z-20 bg-slate-100 p-4 pr-4 shadow-md h-1.5/12 sticky grid grid-cols-2">
                {/* sidenav button */}
                <div className="inline-block">
                    <button type="button" className="cursor-pointer focus:outline-none h-full xl:hidden" onClick={() => setSideNav(!sideNav)}>
                        <Image src="/burger.svg" width={40} height={40} alt="burger" className="my-auto" />
                    </button>
                    <div className="hidden xl:inline">
                        <Image src="/logo.png" width={80} height={80} alt="logo" className="ml-16" />
                    </div>
                </div>

                {/* add quote button */}
                <div className="inline-block">
                    <Link href="/new-estimate" className="focus:outline-none h-full">
                        <Image src={`${pathname === "/new-estimate" ? "/new_fill.svg" : "/new_outline.svg"}`} width={40} height={40} alt="burger" onMouseOver={(e) => { pathname !== "new_quote" && (e.target.src = "/new_fill.svg") }} className="ml-auto my-auto" />
                    </Link>
                </div>
            </nav >
        </>
    )
}

export default Navbar