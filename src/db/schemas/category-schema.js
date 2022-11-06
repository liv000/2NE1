import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    categoryCode: {
      type: String,
      required: true,
    },
    categoryImg: {
      type: String,
    },
    status: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  },
);

export { CategorySchema };
