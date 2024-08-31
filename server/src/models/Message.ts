import mongoose, { Document, Schema, Types } from "mongoose";

export interface IMessage extends Document {
  message: { text: string };
  users: Types.ObjectId[];
  sender: Types.ObjectId;
}

const MessageSchema: Schema = new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMessage>("Message", MessageSchema);
