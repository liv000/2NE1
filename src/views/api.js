// api 로 GET 요청 (/endpoint/params 형태로 요청함)
async function get(endpoint, params = '') {
  const apiUrl = `${endpoint}/${params}`;
  console.log(`%cGET 요청: ${apiUrl} `, 'color: #a25cd1;');

  const res = await fetch(apiUrl, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY5ZjUwNzI3YjkyNTEyYWI1MjgyYTkiLCJyb2xlIjowLCJpYXQiOjE2Njc4ODgzOTl9.STJ5OF4WJuVnvamz0RC--ioDW_lgl2-RghzNyZhA43k',
    },
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// api 로 POST 요청 (/endpoint 로, JSON 데이터 형태로 요청함)
async function post(endpoint, data) {
  const apiUrl = endpoint;
  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPOST 요청: ${apiUrl}`, 'color: #296aba;');
  console.log(`%cPOST 요청 데이터: ${bodyData}`, 'color: #296aba;');
  const auth =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzY5ZjUwNzI3YjkyNTEyYWI1MjgyYTkiLCJyb2xlIjowLCJpYXQiOjE2Njc4ODgzOTl9.STJ5OF4WJuVnvamz0RC--ioDW_lgl2-RghzNyZhA43k';
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// api 로 PATCH 요청 (/endpoint/params 로, JSON 데이터 형태로 요청함)
async function patch(endpoint, params = '', data) {
  let apiUrl = '';
  if (params === null) {
    apiUrl = `${endpoint}`;
  } else {
    apiUrl = `${endpoint}/${params}`;
  }

  // JSON.stringify 함수: Javascript 객체를 JSON 형태로 변환함.
  // 예시: {name: "Kim"} => {"name": "Kim"}
  const bodyData = JSON.stringify(data);
  console.log(`%cPATCH 요청: ${apiUrl}`, 'color: #059c4b;');
  console.log(`%cPATCH 요청 데이터: ${bodyData}`, 'color: #059c4b;');

  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYxZjQ1ZDc4YTcwNWI2NjQ4ZTE1ZDgiLCJyb2xlIjoxLCJpYXQiOjE2NjczNjM5ODd9.3N8s9wjh-QpD9BK2kDeV0g2QVgO5vXovvjtx_a7VSqg',
    },
    body: bodyData,
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// 아래 함수명에 관해, delete 단어는 자바스크립트의 reserved 단어이기에,
// 여기서는 우선 delete 대신 del로 쓰고 아래 export 시에 delete로 alias 함.
async function del(endpoint, params = '', bodyData) {
  let apiUrl = '';
  if (params === null) {
    apiUrl = `${endpoint}`;
  } else {
    apiUrl = `${endpoint}/${params}`;
  }
  console.log(JSON.stringify(bodyData));
  console.log(`DELETE 요청 ${apiUrl}`);
  console.log(`DELETE 요청 데이터: ${bodyData}`);

  const res = await fetch(apiUrl, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MzYzYmYzYmFlNGYyY2ZhNDZmMWE3NTMiLCJyb2xlIjowLCJpYXQiOjE2Njc0ODU5MTR9.jkFftJfirD90prlHUo9MHIBtnB2WHKuX_zqyXgOkpvU',
    },
    body: JSON.stringify(bodyData),
  });

  // 응답 코드가 4XX 계열일 때 (400, 403 등)
  if (!res.ok) {
    const errorContent = await res.json();
    const { reason } = errorContent;

    throw new Error(reason);
  }

  const result = await res.json();

  return result;
}

// 아래처럼 export하면, import * as Api 로 할 시 Api.get, Api.post 등으로 쓸 수 있음.
export { get, post, patch, del as delete };
