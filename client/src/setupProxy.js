// 주석처리하면 에러남
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/auth", "/diary", "/check-list", "/bucket-list"],
    createProxyMiddleware({
      target: `${process.env.REACT_APP_API_URL}`,
      changeOrigin: true,
    }),
  );
};

// 기존의 fetch, 혹은 axios를 통해 요청하던 부분에서 도메인 부분을 제거합니다. 밑의 부분은 webpack dev server 에서 제공하는 proxy 기능을 사용할 때와 동일합니다.

//     const response = await fetch('우회할 api주소/params');

//     const response = await fetch('/params');
