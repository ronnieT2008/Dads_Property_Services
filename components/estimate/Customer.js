import { useEffect, useState } from "react";
import Service from "./Service";

const Customer = ({ name, phone, address, services, search }) => {
    const [show, setShow] = useState(true);

    const totalSum = services.reduce((sum, service) => {
        const total = parseFloat(service.total) || 0;
        return sum + total;
    }, 0);

    useEffect(() => {
        if (search !== "" && !name.toLowerCase().includes(search.toLowerCase())) setShow(false);
        if (!search || search === "") setShow(true);
    }, [search]);

    return (
        <div className={`bg-white shadow-md border border-slate-300 rounded-lg p-6 space-y-4 col-span-1 sm:col-span-2 xl:col-span-3 ${!show ? "hidden" : ""}`}>
            <div className="border-b pb-4">
                <p className="text-2xl font-semibold mb-2">🧾 {name}</p>
                <p className="text-base font-medium">📞 Phone: <span className="font-normal">{phone}</span></p>
                <p className="text-base font-medium">🏠 Address: <span className="font-normal">{address}</span></p>
                <p className="text-sm text-green-600 mt-1 font-semibold">💵 Total Amount: ${totalSum.toFixed(2)}</p>
                {/* <p className="text-sm text-slate-500 mt-1">🗂️ Total Services: {services.length}</p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {[...services].reverse().map((service, idx) => (
                    <Service key={idx} {...service} />
                ))}
            </div>
        </div>
    );
};

export default Customer;