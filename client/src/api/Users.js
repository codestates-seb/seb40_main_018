// promise 요청 타임아웃 시간 선언
const TIME_OUT = 300 * 1000;

// 에러 처리를 위한 status 선언
const statusError = {
  status: false,
  json: {
    error: ["연결이 원활하지 않습니다. 잠시 후 다시 시도해 주세요"],
  },
};

// 백으로 요청할 promis
// 실질적으로 백으로 로그인 요청을 보내는 함수
export const requestPromise = (url, option) => {
  return fetch(url, option);
};

// promise 타임아웃 처리
// aixos를 사용할 경우 타임아웃을 지정할 수 있으나, fetch의 경우 타임아웃 에러처리를 따로 해 주어야 한다.
const timeoutPromise = () => {
  return new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), TIME_OUT));
};

// promise 요청
const getPromise = async (url, option) => {
  return await Promise.race([requestPromise(url, option), timeoutPromise()]);
};

// 백으로 로그인 요청
// 백으로 유저 정보와 함께 로그인 요청을 보낸다. 받은 응답 코드에 따라 에러 또는 응답 받은 json 정보를 리턴한다.
export const loginUser = async (credentials) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };

  // ^^
  // 실질적으로 백으로 로그인 요청을 보내는 함수
  const data = await getPromise(`${process.env.REACT_APP_API_URL}auth/login`, option).catch(() => {
    return statusError;
  });

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

// 로그아웃 정보 통신

// eslint-disable-next-line no-unused-vars
export const logoutUser = async (credentials, accessToken) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify(credentials),
  };

  const data = await getPromise(`${process.env.REACT_APP_API_URL}auth/login`, option).catch(() => {
    return statusError;
  });

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};

export const requestToken = async (refreshToken) => {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  };

  const data = await getPromise(`${process.env.REACT_APP_API_URL}auth/login`, option).catch(() => {
    return statusError;
  });

  if (parseInt(Number(data.status) / 100) === 2) {
    const status = data.ok;
    const code = data.status;
    const text = await data.text();
    const json = text.length ? JSON.parse(text) : "";

    return {
      status,
      code,
      json,
    };
  } else {
    return statusError;
  }
};
