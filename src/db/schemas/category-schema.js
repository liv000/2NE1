import { Schema } from 'mongoose';
import { ProductSchema } from './product-schema';

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
      products: {
        type: [ProductSchema]
      },
      status: {
        type: Number,
        required: true,
        default: 1,
      }
    },
    {
      collection: 'categories',
      timestamps: true,
    },
  );

export { CategorySchema };
