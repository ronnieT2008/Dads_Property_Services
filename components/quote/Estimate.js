import { useEffect, useState } from "react";

const Estimate = (props) => {
    const [show, setShow] = useState(true);
    console.log(props);

    const { name, address, status, search } = props;

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
        <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 select-none">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">👤 {name}</h2>
                <span className="text-sm text-white bg-blue-600 px-3 py-1 rounded-full">
                    {status}
                </span>
            </div>
            <p className="text-gray-700 mb-1">📍 Address: <span className="font-medium">{address}</span></p>
        </div>
    );
};

export default Estimate;
