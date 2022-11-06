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

  async hasCategory(categoryName, categoryCode) {
    const a = await Category.find({
      $and: [
        {
          $or: [{ categoryName }, { categoryCode }],
        },
        { status: 1 },
      ],
    });
    console.log(a);
    return a;
  }
  async updateCategory(newInfo) {
    const { categoryCode } = newInfo;
    return await Category.findOneAndUpdate({ categoryCode }, newInfo);
  }
  async getCategory(categoryCode) {
    return await Category.find({ categoryCode, status: 1 });
  }
}

const categoryModel = new CategoryModel();

export { categoryModel };
