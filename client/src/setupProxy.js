const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    ['/api/*'],
    createProxyMiddleware({
      // target: 'https://vast-depths-15917.herokuapp.com'
      target: 'http://localhost:5000'
    })
  );
};
