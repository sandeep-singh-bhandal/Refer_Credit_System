import mongoose, { Schema, Document, Types } from "mongoose";

export interface IReferral extends Document {
  referrerId: Types.ObjectId;
  referredId: Types.ObjectId;
  status: "pending" | "converted";
  creditAwarded: boolean;
  convertedAt?: Date;
}

const referralSchema: Schema<IReferral> = new Schema(
  {
    referrerId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    referredId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
      enum: ["pending", "converted"],
      default: "pending",
    },
    creditAwarded: { type: Boolean, default: false },
    convertedAt: { type: Date },
  },
  { timestamps: true } 
);

referralSchema.index({ referrerId: 1, referredId: 1 }, { unique: true });

export default mongoose.model<IReferral>("Referral", referralSchema);
