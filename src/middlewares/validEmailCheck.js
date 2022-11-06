const validEmailCheck = (req, res, next) => {
  const email = req.body.email;
  const pattern =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const result = pattern.test(email);
  if (!result) {
    res.status(403).json({
      result: 'validEmailCheck',
      reason: '정상적인 이메일이 아닙니다.',
    });
    return;
  }
  next();
};

export { validEmailCheck };
