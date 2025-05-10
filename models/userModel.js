import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    estimates: { type: [mongoose.Schema.Types.Mixed], default: [] }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
