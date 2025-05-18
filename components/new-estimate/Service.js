
import Image from "next/image";
import { useEffect, useState } from "react";

const Service = ({ service, setService, serviceInputs, setServiceInputs }) => {
    const [inputs, setInputs] = useState({
        roomName: 'Living Room',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam inventore perspiciatis quae neque sunt corporis blanditiis dolor officiis nam excepturi!',
        ceilingHeight: '8.5',
        walls: [{ length: '12', accent: false }, { length: '15', accent: false }, { length: '12', accent: false }, { length: '15', accent: false }],
        ceilingType: 'Flat Ceiling',
        doorFrames: '2',
        windowFrames: '1',
        trimHeight: '3',
        doorsNum: '2',
        wallsNum: '4',
        wallsLength: '15',
    });

    useEffect(() => {
        if (serviceInputs.roomName !== undefined) {
            setInputs({ ...serviceInputs });
        }
    }, [service]);


    const handleBack = () => {
        setServiceInputs(inputs);
        setService({ ...service, active: false });
    }

    const handleCreate = () => {
        console.log(inputs);
        setServiceInputs(inputs);
        setService({ ...service, active: false, estimate: true });
    }

    return (
        <div className="w-full h-full overflow-auto">
            <div className="px-4">
                <h1 className="text-3xl font-medium mb-8">{service.type[0].toUpperCase() + service.type.slice(1)}</h1>
                <div className="mt-4">
                    <label className="text-xl">Room Name:</label>
                    <input
                        className="rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2 ml-7"
                        value={inputs.roomName}
                        onChange={(e) => setInputs({ ...inputs, roomName: e.target.value })}
                    />
                </div>
                <div className="mt-4">
                    <label className="text-xl">Description:</label>
                    <textarea
                        rows="4"
                        className="rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-4 w-full"
                        value={inputs.description}
                        onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                    />
                </div>
                <div className="mt-1">
                    <label className="text-xl">Ceiling Height:</label>
                    <input
                        className="rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2 ml-4"
                        value={inputs.ceilingHeight}
                        onChange={(e) => setInputs({ ...inputs, ceilingHeight: e.target.value })}
                    />
                </div>
                {/* Walls */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Wall Lengths: </label>
                        <Image src="/new_outline.svg" width={30} height={30} alt="new quote" className="inline mr-2 mb-1 cursor-pointer" onClick={() => setInputs({ ...inputs, walls: [...inputs.walls, ''] })} />
                        <Image src="/delete.svg" width={30} height={30} alt="new quote" className="inline mr-2 mb-1 cursor-pointer" onClick={() => setInputs({ ...inputs, walls: inputs.walls.slice(0, inputs.walls.length - 1) })} />
                    </div>
                    {inputs.walls.map((wall, index) => (
                        <div className="mt-4" key={index}>
                            <label className="text-xl mb-2 inline-block md:mr-20">Wall {index + 1}:</label>
                            <div className="relative inline-block">
                                <input
                                    type="number"
                                    className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 pr-20 w-64"
                                    placeholder="Wall length"
                                    value={wall.length ?? ""}
                                    onChange={(e) => {
                                        const newWalls = [...inputs.walls];
                                        newWalls[index].length = e.target.value;
                                        setInputs({ ...inputs, walls: newWalls });
                                    }}
                                />
                                <button
                                    type="button"
                                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-semibold px-3 py-1 rounded-md cursor-pointer ${wall.accent ? 'bg-blue-900 text-white' : 'bg-slate-200'
                                        }`}
                                    onClick={() => {
                                        const newWalls = [...inputs.walls];
                                        newWalls[index].accent = !newWalls[index].accent;
                                        setInputs({ ...inputs, walls: newWalls });
                                    }}
                                >
                                    Accent
                                </button>
                            </div>
                        </div>
                    ))}

                </div>
                {/* Ceiling Type */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Ceiling: </label>
                    </div>
                    <label className="text-xl mr-23">Type:</label>
                    <select className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" value={inputs.ceilingType} onChange={(e) => setInputs({ ...inputs, ceilingType: e.target.value })}>
                        <option value="Flat Ceiling">Flat Ceiling</option>
                        <option value="Textured Ceiling(primed)">Textured Ceiling(primed)</option>
                        <option value="Textured Ceiling(painted)">Textured Ceiling(painted)</option>
                    </select>
                </div>

                {/* Frames */}
                <div className="mt-6">
                    <label className="text-xl mb-4 mr-4 font-medium">Frames: </label>
                    <div>
                        <label className="text-xl mr-21">Door: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl px-3 py-2 mt-2 " value={inputs.doorFrames}
                            onChange={(e) => setInputs({ ...inputs, doorFrames: e.target.value })}
                        />
                    </div>
                    <div className="mt-2">
                        <label className="text-xl mr-15">Window:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" value={inputs.windowFrames}
                            onChange={(e) => setInputs({ ...inputs, windowFrames: e.target.value })}
                        />
                    </div>
                </div>
                {/* Trim */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Trim: </label>
                    </div>
                    <div>
                        <label className="text-xl mr-7">Height: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-10 py-2 mt-2" value={inputs.trimHeight}
                            onChange={(e) => setInputs({ ...inputs, trimHeight: e.target.value })}
                        />
                    </div>
                </div>
                {/* Doors */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Doors: </label>
                    </div>
                    <div>
                        <label className="text-xl mr-16">Amount:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" value={inputs.doorsNum}
                            onChange={(e) => setInputs({ ...inputs, doorsNum: e.target.value })}
                        />
                    </div>
                </div>
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Measurements: </label>
                    </div>
                    <div>
                        <label className="text-xl mr-11"># of Walls: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" value={inputs.wallsNum}
                            onChange={(e) => setInputs({ ...inputs, wallsNum: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl">Length:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-19 py-2 mt-2" value={inputs.wallsLength}
                            onChange={(e) => setInputs({ ...inputs, wallsLength: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 grid gap-2">
                <button className={`bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => handleCreate()}>View Estimates</button>
                <button className={`bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => handleBack()}>Back</button>
            </div>
        </div>
    )
}

export default Service;