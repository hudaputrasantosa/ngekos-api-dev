import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  photos: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("User", UserSchema);
