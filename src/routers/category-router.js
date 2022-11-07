import { Router } from 'express';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import {
  loginRequired,
  categoryHandler,
  authAdmin,
  categoryProducts,
} from '../middlewares';

import { categoryService } from '../services';
const categoryRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 카테고리 등록
categoryRouter.post(
  '/admin/register',
  loginRequired,
  asyncHandler(async (req, res, next) => {
    const newCategoryInfo = req.body;

    const newCategory = await categoryService.addCategory(newCategoryInfo);

    res.status(201).json(newCategory);
  }),
);
// 전체 카테고리 조회
categoryRouter.get(
  '/list',
  asyncHandler(async (req, res, next) => {
    const newCategory = await categoryService.getCategoryList();
    res.status(201).json(newCategory);
  }),
);

categoryRouter.patch(
  '/admin/edit',
  loginRequired,
  authAdmin,
  asyncHandler(async (req, res) => {
    const newInfo = req.body;
    const updateCategory = await categoryService.updateCategory(newInfo);
    res.status(201).json({ '수정 완료': updateCategory });
  }),
);

categoryRouter.patch(
  '/admin/drop',
  loginRequired,
  authAdmin,
  categoryProducts,
  asyncHandler(async (req, res) => {
    const { categoryId } = req.body;

    const drop = await categoryService.dropCategory(categoryId);
    res.status(201).json({ '삭제 완료': drop });
  }),
);
export { categoryRouter };
