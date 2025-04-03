import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI);
        const connect = mongoose.connection;

        connect.on('connected', () => console.log("Connected to MongoDB"));
        connect.on('error', (err) => {
            console.log(err);
            process.exit();
        });
    } catch (err) {
        console.log(err);
    }
}