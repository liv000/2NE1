import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    categoryName: {
      type: String,
      required: true,
    },
    topCategoryCode: {
      type: String,
      required: true,
    },
    topCategoryTitle: {
      type: String,
      required: true,
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
