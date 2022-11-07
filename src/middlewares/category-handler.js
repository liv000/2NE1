const categoryHandler = (req, res, next) => {
  let { categoryId } = req.body;

  if (!categoryId) {
    categoryId = 'all';
  }
  req.categoryId = categoryId;
  next();
};

export { categoryHandler };
