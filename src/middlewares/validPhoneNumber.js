const validCallNumberCheck = (req, res, next) => {
  // - 삭제
  const number = req.body.phoneNumber;
  const callNumber = number.replace(/[^0-9]/g, '');

  //유효성 검사
  const pattern =
    /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
  const result = pattern.test(callNumber);
  console.log(result);
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
