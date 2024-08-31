import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true, min: 3, max: 20 },
  email: { type: String, required: true, unique: true, max: 50 },
  password: { type: String, required: true, min: 8 },
});

export default mongoose.model<IUser>("User", UserSchema);
