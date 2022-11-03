import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    summery: {
      type: String,
      required: false,
    },
    topCategoryCode: {
      type: String,
    },
    brandInfo: {
      type: new Schema(
        {
          nickname: String,
          title: String,
          logoUrl: String,
          coverUrl: String,
        },
        {
          _id: false,
        },
      ),
      required: false,
    },
    thumbnail: {
      type: String,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
