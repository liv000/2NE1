import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      require: true,
    },
    stock: {
      type: Number,
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
          regTsp: Date,
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
    status: {
      // 0 이면 삭제된 상품
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
