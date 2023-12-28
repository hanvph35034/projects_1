import { array } from "joi";
import mongoose from "mongoose";
const imageProductSchema = new mongoose.Schema(
  {
    image: {
      type: Array,
    },
    trang_thai: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    products: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  {
    timestamps: { currentTime: () => Date.now() + 7 * 60 * 60 * 1000 },
    versionKey: false,
  }
);

export default mongoose.model("imageProduct", imageProductSchema);
