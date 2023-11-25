import mongoose from "mongoose";
const { Schema } = mongoose;

const KosSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  facility: {
    type: [String],
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("Kos", KosSchema);
