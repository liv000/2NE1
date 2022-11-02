import { Schema } from "mongoose";
import { CartSchema } from "./cart-schema";
const OrderSchema = new Schema(
  {
    products: [CartSchema],
    fullName: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        }
      ),
      required: false,
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

export { OrderSchema };
