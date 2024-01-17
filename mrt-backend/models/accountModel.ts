import mongoose, { Schema, Document } from "mongoose";

interface Account extends Document {
  uid: number;
  username: string;
  password: string;
}

const accountSchema: Schema = new Schema(
  {
    uid: {
      type: Number,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Account>("Account", accountSchema);
