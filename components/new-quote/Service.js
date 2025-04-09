
import Image from "next/image";
import { useEffect, useState } from "react";

const Service = ({ service, setService, serviceInputs, setServiceInputs }) => {
    const [inputs, setInputs] = useState({
        roomName: '',
        ceilingHeight: '',
        walls: ['', '', '', ''],
        ceilingType: 'None',
        doorFrames: '',
        windowFrames: '',
        doorsNum: '',
        wallsNum: '',
        wallsLength: '',
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
        setServiceInputs(inputs);
        setService({ ...service, active: false, quote: true });
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
                        <div key={index}>
                            <label className="text-xl">Wall {index + 1}:</label>
                            <input
                                type="number"
                                className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2 ml-6"
                                value={wall ?? ""}
                                onChange={(e) => {
                                    const newWalls = [...inputs.walls];
                                    newWalls[index] = e.target.value;
                                    setInputs({ ...inputs, walls: newWalls });
                                }}
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
                    <select className="rounded-md bg-white focus:outline-none text-xl p-3 py-2 mt-2" value={inputs.ceilingType} onChange={(e) => setInputs({ ...inputs, ceilingType: e.target.value })}>
                        <option value="none">None</option>
                        <option value="Flat Ceiling">Flat Ceiling</option>
                        <option value="Cathedral Ceiling">Cathedral Ceiling</option>
                        <option value="Vaulted Ceiling">Vaulted Ceiling</option>
                        <option value="Tray Ceiling">Tray Ceiling</option>
                        <option value="Coffered Ceiling">Coffered Ceiling</option>
                        <option value="Exposed Beam Ceiling">Exposed Beam Ceiling</option>
                    </select>
                </div>

                {/* Trim */}
                <div className="mt-6">
                    <div>
                        <label className="text-xl mb-4 mr-4 font-medium">Trim: </label>
                    </div>
                    <div>
                        <label className="text-xl">Door Frames: </label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-10 py-2 mt-2" value={inputs.doorFrames}
                            onChange={(e) => setInputs({ ...inputs, doorFrames: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl">Window Frames:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-4 py-2 mt-2" value={inputs.windowFrames}
                            onChange={(e) => setInputs({ ...inputs, windowFrames: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl"># of Doors:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-16 py-2 mt-2" value={inputs.doorsNum}
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
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-12 py-2 mt-2" value={inputs.wallsNum}
                            onChange={(e) => setInputs({ ...inputs, wallsNum: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="text-xl">Length:</label>
                        <input type="number" className="rounded-md bg-white focus:outline-none text-xl p-3 ml-20 py-2 mt-2" value={inputs.wallsLength}
                            onChange={(e) => setInputs({ ...inputs, wallsLength: e.target.value })}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 grid gap-2">
                <button className={`bg-blue-900 hover:bg-blue-950 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => handleCreate()}>View Quote</button>
                <button className={`bg-slate-600 hover:bg-slate-800 text-white py-2 px-4 rounded-md cursor-pointer float-right text-xl`} onClick={() => handleBack()}>Back</button>
            </div>
        </div>
    )
}

export default Service;