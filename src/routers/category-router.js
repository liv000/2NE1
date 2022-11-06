import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired, categoryHandler } from '../middlewares';

import { categoryService } from '../services';
const categoryRouter = Router();
const asyncHandler = require('../utils/async-handler');

// 카테고리 등록
categoryRouter.post(
  '/register',
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
    try {
      const newCategory = await categoryService.getCategoryList();

      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }),
);

categoryRouter.patch(
  '/edit',
  loginRequired,
  asyncHandler(async (req, res) => {
    if (req.role === 0) {
      throw new Error('카테고리 수정은 관리자만 가능합니다. ');
    }
    const newInfo = req.body;
    const updateCategory = await categoryService.updateCategory(newInfo);
    res.status(201).json(updateCategory);
  }),
);

categoryRouter.patch(
  '/drop',
  loginRequired,
  asyncHandler(async (req, res) => {
    if (req.role === 0) {
      throw new Error('카테고리 삭제는 관리자만 가능합니다. ');
    }
    const { categoryCode } = req.body;

    const drop = await categoryService.dropCategory(categoryCode);
    res.status(201).json(drop);
  }),
);
export { categoryRouter };
