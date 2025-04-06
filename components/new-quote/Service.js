
import Image from "next/image";
import { useState } from "react";

const paintingForm = [
    {
        label: "Room Name",
        type: "text",
        hook: "roomName",
    },
    {
        label: "Ceiling Height",
        type: "number",
        hook: "ceilingHeight",
    },
]

const Service = ({ service, setService, inputs, setInputs }) => {
    const [walls, setWalls] = useState(['', '', '', '']);

    return (
        <div className="w-full h-full overflow-auto">
            <div className="px-4 ">
                <h1 className="text-3xl font-medium mb-8">{service.type[0].toUpperCase() + service.type.slice(1)}</h1>
                { // First 2 inputs
                    paintingForm.map(({ label, type, hook }, index) => (
                        <div className="mt-4" key={index}>
                            <label className="text-xl">{label}:</label>
                            <input type={type} className={`rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2 ${index === 0 ? "ml-9" : "ml-6"}`}
                                onChange={(e) => setInputs({ ...inputs, [hook]: e.target.value })}
                            />
                        </div>
                    ))
                }
                {/* Walls */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Wall Lengths: </label>
                        <Image src="/new_outline.svg" width={30} height={30} alt="new quote" className="inline mr-2 mb-1 cursor-pointer" onClick={() => setWalls([...walls, ''])} />
                        <Image src="/delete.svg" width={30} height={30} alt="new quote" className="inline mr-2 mb-1 cursor-pointer" onClick={() => setWalls(walls.slice(0, walls.length - 1))} />
                    </div>
                    {walls.map((wall, index) => (
                        <div key={index}>
                            <label className="text-xl">Wall {index + 1}:</label>
                            <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-6 py-2 mt-2"
                                onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
                            />
                        </div>
                    ))}
                </div>
                {/* Ceiling Type */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Ceiling: </label>
                    </div>
                    <label className="text-xl mr-5">Ceiling Type:</label>
                    <select className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" onChange={(e) => setInputs({ ...inputs, ceiling: e.target.value })}>
                        <option value="none">None</option>
                        <option value="volvo">Volvo</option>
                        <option value="saab">Saab</option>
                        <option value="mercedes">Mercedes</option>
                        <option value="audi">Audi</option>
                    </select>
                </div>

                {/* Trim */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Trim: </label>
                    </div>
                    <div>
                        <label className="text-xl">Door Frames: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-12 py-2 mt-2"
                            onChange={(e) => setInputs({ ...inputs, doorFrames: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl">Window Frames:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-6 py-2 mt-2"
                            onChange={(e) => setInputs({ ...inputs, windowFrames: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl"># of Doors:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-18 py-2 mt-2"
                            onChange={(e) => setInputs({ ...inputs, doorsNum: e.target.value })}
                        />
                    </div>
                </div>
                {/* Accent Walls */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Accent Walls: </label>
                    </div>
                    <div>
                        <label className="text-xl"># of Walls: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-12 py-2 mt-2"
                            onChange={(e) => setInputs({ ...inputs, doorFrames: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl">Length:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-20 py-2 mt-2"
                            onChange={(e) => setInputs({ ...inputs, windowFrames: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4">
                <button className={`bg-slate-600 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl ${inputs.name && inputs.address && inputs.phone ? "" : "opacity-70"}`} >Next</button>
            </div>
        </div>
    )
}

export default Service;