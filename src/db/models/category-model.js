import { model } from 'mongoose';
import { CategorySchema } from '../schemas/category-schema';

const Category = model('categories', CategorySchema);

export class CategoryModel {
    // 카테고리 추가
    async create(categoryName) {

        const category = await Category.create(categoryName);

        return category;
    }

    // 모든 카테고리 출력
    async getCategoryList() {
        const categories = await Category.find();

        return categories;
    }
}

const categoryModel = new CategoryModel();

export { categoryModel };
