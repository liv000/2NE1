import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
  async create(categoryName) {
    const category = await Category.create(categoryName);

    return category;
  }

  async getCategoryList(page, perPage) {
    const [total, categories] = await Promise.all([
      Category.countDocuments({}),
      Category.find({ stats: 1 })
        .skip(perPage * (page - 1))
        .limit(perPage)
        .sort({ createdAt: 1 }),
    ]);
    const totalPage = Math.ceil(total / perPage);

    return { totalPage, page, perPage, categories };
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
