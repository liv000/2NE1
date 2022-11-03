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
    
    //추가
    topCategoryCode: {
      type: String,
      required: true,
    },
    topCategoryTitle: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    brandInfo: {
      type: new Schema(
        {
          nickname: String,
          title: String,
          slogan: String,
          logoUrl: String,
          coverUrl: String,
          modTsp: Date,
          regTsp: Date
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
