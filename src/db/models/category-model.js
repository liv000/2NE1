import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async create(categoryName) {
    const category = await Category.create(categoryName);

    return category;
  }

  async getCategoryList() {
    const categories = await Category.find({ status: 1 });
    return categories;
  }

  async updateCategory(newInfo) {
    const { categoryId, ...rest } = newInfo;

    return await Category.findOneAndUpdate({ _id: categoryId }, rest);
  }
  async getCategory(categoryCode) {
    return await Category.find({ categoryCode, status: 1 });
  }

  async hasCategory(categoryName, categoryCode, categoryId) {
    return await Category.find({
      $and: [
        {
          $or: [{ categoryName }, { categoryCode }],
        },
        { status: 1 },
        { _id: { $ne: categoryId } },
      ],
    });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
