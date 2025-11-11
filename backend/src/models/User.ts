import mongoose from "mongoose";

interface IReferredUser {
  user: mongoose.Types.ObjectId;
  status: "pending" | "converted";
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  referralCode: string;
  referredUsers?: IReferredUser[];
  credits?: number;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    referralCode: { type: String, required: true, unique: true },
    credits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);
export default User;
