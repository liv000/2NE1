const validCallNumberCheck = (req, res, next) => {
  // - 삭제
  // const number =
  const callNumber = req.body.phoneNumber;

  //유효성 검사
  const pattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}/;
  const result = pattern.test(callNumber);

  if (!result) {
    res.status(403).json({
      result: 'validCallNumberCheck',
      reason: '정상적인 연락처가 아닙니다',
    });
    return;
  }
  next();
};

export { validCallNumberCheck };
