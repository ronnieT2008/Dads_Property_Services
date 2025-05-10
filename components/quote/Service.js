import { useEffect, useState } from "react";

const Service = (props) => {
    const [show, setShow] = useState(true);
    console.log(props);

    const { roomName, serviceType, status, search } = props;

    if (!show) return null;

    return (
        <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 select-none">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold">🏠 {roomName}</h2>
                <span className="text-sm text-white bg-blue-500 px-3 py-1 rounded-md">
                    👷 {serviceType}
                </span>
            </div>
        </div>
    );
};

export default Service;
