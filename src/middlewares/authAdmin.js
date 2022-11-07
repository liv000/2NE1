const authAdmin = async (req, res, next) => {
  const role = req.role;

  if (role === 0) {
    res.status(403).json({
      result: 'onlyAdmin',
      reason: '관리자만 접근이 가능한 페이지입니다.',
    });
    return;
  }
  next();
};

export { authAdmin };
