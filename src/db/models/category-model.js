import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async create(categoryName) {
    const category = await Category.create(categoryName);

    return category;
  }

  async getCategoryList() {
    const categories = await Category.find();
    return categories;
  }

  async hasCategory(categoryName, categoryCode) {
    return await Category.find({ $or: [{ categoryName }, { categoryCode }] });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
