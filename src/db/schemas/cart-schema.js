import { Schema } from "mongoose";

const CartSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "products",
      require: true,
    },
    count: {
      type: Number,
      require: true,
      default: 1,
    },
  },
  {
    collection: "carts",
    timestamps: true,
  }
);
