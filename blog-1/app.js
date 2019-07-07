const handleRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");
const serverHandler = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json;charset=utf-8');
  // 处理blog路由
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);
  const blogData = handleRouter(req, res);
  if (blogData) {
    res.end(JSON.stringify(blogData))
    return
  }
  // 处理user路由
  const userData = handleUserRouter(req, res);
  if (userData) {
    res.end(JSON.stringify(userData))
    return
  }
  // 404
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("404 not found");
  res.end();
};
module.exports = serverHandler;