"use client";
import Image from "next/image"
import { useState } from "react";

const Navbar = () => {
    const [sideNav, setSideNav] = useState(false);

    return (
        <nav className="w-full bg-slate-100 fixed flex p-4">
            {/* sidebar */}
            <div className="">
                <button type="button" className="cursor-pointer focus:outline-none">
                    <Image src="/burger.svg" width={40} height={40} alt="burger" />
                </button>
            </div>
            {/* add quote */}
            <div className="ml-auto">
                <button type="button" className="cursor-pointer float-right focus:outline-none">
                    <Image src="/add_outline.svg" width={40} height={40} alt="burger" onMouseOver={e => e.target.src = "/add_fill.svg"} onMouseOut={e => e.target.src = "/add_outline.svg"} />
                </button>
            </div>
        </nav>
    )
}

export default Navbar