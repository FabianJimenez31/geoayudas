const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      // target: 'http://192.99.63.194:8001/',
      target: 'http://127.0.0.1:8000/',
      changeOrigin: true,
    })
  );
};

