import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    customers: Array
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;