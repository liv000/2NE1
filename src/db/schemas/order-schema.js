import { Schema } from 'mongoose';
const constants = require('../../constraint/shippingStatus');
const ProductSchema = new Schema({
  productId: { type: String, required: true },
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
});
const SHIPPING_STATUS = [
  constants.PENDING,
  constants.SHIPPING,
  constants.SHIPPED,
  constants.CANCELED,
];

const OrderSchema = new Schema(
  {
    products: {
      type: [ProductSchema],
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },

    name: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    shipping: {
      type: String,
      required: true,
      enum: SHIPPING_STATUS,
      default: constants.PENDING,
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
        },
      ),
      required: false,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      // 0이면 취소한 주문
      type: Number,
      required: true,
      default: 1,
    },
  },

  {
    collection: 'orders',
    timestamps: true,
  },
);

export { OrderSchema };
