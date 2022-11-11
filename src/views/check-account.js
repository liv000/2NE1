import * as Api from '/api.js';

async function checkAccount() {
  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');
  // const userId = localStorage.getItem('userId');

  if (!token) {
    localStorage.clear();
    return { isLogined: false, isAdmin: false };
  }

  if (admin) {
    try {
      //   await Api.get(`/api/admin/users/${userId}/orders`);
      return { isLogined: true, isAdmin: true };
    } catch (error) {
      alert('관리자 접속에 실패했습니다.. 다시 로그인 해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
  } else {
    try {
      //   await Api.get('/api/auth');
      return { isLogined: true, isAdmin: false };
    } catch (error) {
      alert('유저 접속에 실패했습니다.. 다시 로그인 해주세요.');
      localStorage.clear();
      window.location.href = '/';
    }
  }
}

export { checkAccount };
