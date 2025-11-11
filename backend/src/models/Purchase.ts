import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPurchase extends Document {
  userId: Types.ObjectId;
  amount: number;
  isFirstPurchase: boolean;
  createdAt?: Date;
}

const purchaseSchema: Schema<IPurchase> = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    isFirstPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IPurchase>("Purchase", purchaseSchema);
