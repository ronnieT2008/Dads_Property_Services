import Link from "next/link";
import { useEffect, useState } from "react";

const Estimate = (props) => {
    const [show, setShow] = useState(true);

    const { name, address, status, id, search } = props;

    useEffect(() => {
        if (!search) {
            setShow(true);
            return;
        }

        const lowerSearch = search.toLowerCase();

        const allValues = Object.entries(props)
            .filter(([key]) => key !== "search")
            .map(([_, value]) => String(value).toLowerCase());

        const matched = allValues.some(val => val.includes(lowerSearch));
        setShow(matched);
    }, [search, props]);

    if (!show) return null;

    return (
        <Link href={`/estimate/${id}`} className="bg-white shadow-md border border-slate-300 rounded-lg p-6 select-none cursor-pointer hover:border-blue-500 hover:ring-1 hover:ring-blue-500 transition-all">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">👤 {name}</h2>
                <span className="text-sm text-white bg-blue-900 px-3 py-1 rounded-full">
                    {status}
                </span>
            </div>
            <p className="text-gray-700 mb-1">📍 Address: <span className="font-medium">{address}</span></p>
        </Link>
    );
};

export default Estimate;
