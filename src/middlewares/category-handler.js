const categoryHandler = (req, res, next) => {
  const { categoryCode } = req.body;

  if (!categoryCode) {
    categoryCode = 'all';
    req.categoryCode = categoryCode;
    next();
    return;
  }
  next();
};

export { categoryHandler };
// todo 수정
