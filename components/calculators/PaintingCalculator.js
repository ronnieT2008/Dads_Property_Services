const PaintingCalculator = ({ estimate, setEstimate }) => {
    if (estimate) {
        const {
            roomName,
            description,
            ceilingHeight,
            walls,
            trimHeight,
            ceilingType,
            doorFrames,
            windowFrames,
            doorsNum,
        } = estimate;

        const parsedHeight = parseFloat(ceilingHeight) || 0;

        // Parse walls into { length, accent }
        const parsedWalls = walls.map(w => ({
            length: parseFloat(w.length) || 0,
            accent: Boolean(w.accent),
        }));

        const totalWallLength = parsedWalls.reduce((sum, w) => sum + w.length, 0);
        const wallArea = totalWallLength * parsedHeight;

        // 🎨 Wall paint: 2 coats, 350 sq ft per gallon, $60 per gallon
        const totalWallSqft = wallArea * 2;
        const wallGallons = Math.ceil(totalWallSqft / 350);
        const wallPaintCost = wallGallons * 60;

        // 🪞 Trim paint: based on total wall length x trim height, $25 per quart
        const parsedTrimHeight = parseFloat(trimHeight) || 0;
        const trimSqFt = totalWallLength * parsedTrimHeight;
        const trimQuarts = Math.ceil(trimSqFt / 100);
        const trimPaintCost = trimQuarts * 25;


        // 🚪 Doors: $200 per painted door
        const numDoors = parseInt(doorsNum) || 0;
        const doorCost = numDoors * 200;

        // 🚪🪟 Frames: $100 each for windows & doors
        const doorFrameCount = parseInt(doorFrames) || 0;
        const windowFrameCount = parseInt(windowFrames) || 0;
        const frameCount = doorFrameCount + windowFrameCount;
        const frameCost = frameCount * 100;

        // 🎨 Accent walls: $3.5 per sq ft, only if accent is true
        const accentWallArea = parsedWalls
            .filter(w => w.accent)
            .reduce((sum, w) => sum + (w.length * parsedHeight), 0);
        const accentWallCost = accentWallArea * 3.5;

        // 🧱 Ceiling area (assumes rectangular shape from first 2 walls)
        let ceilingArea = 0;
        if (parsedWalls.length >= 2) {
            ceilingArea = parsedWalls[0].length * parsedWalls[1].length;
        }

        // 🎨 Ceiling paint: 2 coats, 350 sq ft per gallon, $60 per gallon
        const ceilingGallons = Math.ceil((ceilingArea * 2) / 350);
        const ceilingPaintCost = ceilingGallons * 60;

        // 💰 Total cost
        const total = wallPaintCost + trimPaintCost + doorCost + frameCost + accentWallCost + ceilingPaintCost;

        setEstimate({
            ...estimate,
            roomName,
            description,
            ceilingHeight: parsedHeight,
            ceilingType,
            trimHeight: parsedTrimHeight,
            doorFrames: doorFrameCount,
            windowFrames: windowFrameCount,
            doorsNum: numDoors,
            walls,
            wallsNum: parsedWalls.length,
            wallsLength: totalWallLength.toFixed(2),
            wallArea: wallArea.toFixed(2),
            wallGallons,
            trimSqFt: trimSqFt.toFixed(2),
            trimQuarts,
            accentWallArea: accentWallArea.toFixed(2),
            ceilingArea: ceilingArea.toFixed(2),
            ceilingGallons,
            total: total.toFixed(2),
        });
    }
}

export default PaintingCalculator