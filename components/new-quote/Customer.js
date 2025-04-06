const Customer = ({ service, setService, inputs, setInputs }) => {
    return (
        <div className="w-full h-full grid grid-rows-2">
            <div className="px-4">
                <h1 className="text-3xl font-medium">Customer</h1>
                <div className="mt-8">
                    <label className="text-xl">Name</label>
                    <input type="text" className="w-full rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2"
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                    />
                </div>
                <div className="mt-6">
                    <label className="text-xl">Address</label>
                    <input type="text" className="w-full rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2"
                        onChange={(e) => setInputs({ ...inputs, address: e.target.value })}
                    />
                </div>
                <div className="mt-6">
                    <label className="text-xl">Phone</label>
                    <input type="number" className="w-full rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2"
                        onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                    />
                </div>
            </div>
            <div className="px-4 mt-20">
                <h1 className="text-3xl font-medium">Customer</h1>
                <div className="grid grid-cols-3 h-4/12 gap-5">
                    <div className={`mt-8 w-full rounded-md grid place-items-center cursor-pointer py-2 ${service.type === "painting" ? "bg-blue-950 text-white" : "bg-slate-50"}`}>
                        <h1 className="text-2xl font-medium mb-1" id="painting" onClick={() => setService({ ...service, service: "painting" })}>Painting</h1>
                    </div>
                    <div className="mt-8 w-full bg-slate-50 rounded-md grid place-items-center cursor-pointer">
                        <h1 className="text-2xl font-medium mb-1" id="">Painting</h1>
                    </div>
                    <div className="mt-8 w-full bg-slate-50 rounded-md grid place-items-center cursor-pointer">
                        <h1 className="text-2xl font-medium mb-1" id="">Painting</h1>
                    </div>
                </div>
            </div>
            <div className="px-4">
                <button className={`bg-slate-600 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl ${inputs.name && inputs.address && inputs.phone ? "" : "opacity-70"}`}
                    onClick={() => {
                        inputs.name && inputs.address && inputs.phone && service && setService({ ...service, active: true })
                    }}>Next</button>
            </div>
        </div>
    )
}

export default Customer;