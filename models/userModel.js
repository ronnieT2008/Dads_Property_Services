import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    phone: { type: String, default: "" },
    quotes: { type: [mongoose.Schema.Types.Mixed], default: [] }
}, { _id: false });

const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    customers: { type: [customerSchema], default: [] },
    quotes: { type: [mongoose.Schema.Types.Mixed], default: [] }
});

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
