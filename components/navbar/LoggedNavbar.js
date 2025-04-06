"use client";
import Image from "next/image"
import { useState } from "react";
import { usePathname } from 'next/navigation'

export const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        src: "/dashboard.svg"
    },
    {
        name: "View Quotes",
        href: "/quotes",
        src: "/history.svg"
    },
    {
        name: "New Quote",
        href: "/new-quote",
        src: "/new_outline.svg"
    },
]

const Navbar = () => {
    const [sideNav, setSideNav] = useState(true);
    const pathname = usePathname()

    return (
        <>
            {/* sidenav */}
            <div className={`absolute inset-0 h-screen md:w-2/12 w-full ease-in-out duration-300 shadow-md ${sideNav ? "translate-x-0" : "translate-x-[-100%]"} bg-slate-200 pt-25`}>
                {navLinks.map(({ name, href }, index) => (
                    <div key={index}>
                        <a href={href} className={`text-xl px-5 py-3 w-full block hover:bg-slate-300 cursor-pointer ${pathname === href ? "bg-slate-300" : ""}`}>
                            <Image src={navLinks[index].src} width={20} height={20} alt={name} className="inline mr-2 mb-1" />
                            {name}
                        </a>
                    </div>
                ))}
            </div>

            {/* top nav */}
            <nav className="w-full bg-slate-100 p-4 shadow-md h-1.5/12 sticky">
                {/* sidenav button */}
                <div className="inline">
                    <button type="button" className="cursor-pointer focus:outline-none h-full" onClick={() => setSideNav(!sideNav)}>
                        <Image src="/burger.svg" width={40} height={40} alt="burger" className="my-auto" />
                    </button>
                </div>

                {/* add quote button */}
                <div className="inline ml-auto">
                    <a href="/new-quote" className="float-right focus:outline-none h-full">
                        <Image src={`${pathname === "/new-quote" ? "/new_fill.svg" : "/new_outline.svg"}`} width={40} height={40} alt="burger" onMouseOver={(e) => { pathname !== "new_quote" && (e.target.src = "/new_fill.svg") }} className="my-auto" />
                    </a>
                </div>
            </nav >
        </>
    )
}

export default Navbar