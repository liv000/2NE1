import { Router } from 'express';
import is from '@sindresorhus/is';
// 폴더에서 import하면, 자동으로 폴더의 index.js에서 가져옴
import { loginRequired } from '../middlewares';

import { categoryService } from '../services';
const categoryRouter = Router();
const asyncHandler = require('../utils/async-handler');


// 카테고리 등록
categoryRouter.post(
  '/register',
  loginRequired,
  async (req, res, next) => {
    try {
        // req의 body 에서 데이터 가져옴
        const newCategoryInfo = req.body;

        // 위 데이터를 카테고리 db에 추가
    
        const newCategory = await categoryService.addCategory(newCategoryInfo);

        // 추가된 카테고리의 db 데이터를 프론트에 다시 보내줌
        res.status(201).json(newCategory);
    } catch (error) {
        next(error);
    }
}
);


// 전체 카테고리 조회
categoryRouter.get(
  '/categorylist', 
  async function (req, res, next) {
  try {

    const newcategory = await categoryService.getcategoryList(categoryCode);

    res.status(201).json(newcategory);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };