import { Schema } from 'mongoose';
import { CommentSchema } from './comment-schema';
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
    content: {
      type: new Schema({
        contentImg: [],
        description: String,
      }),
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
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
    comments: [CommentSchema],
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export { ProductSchema };
