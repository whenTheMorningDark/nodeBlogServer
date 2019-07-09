const handleRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");

//处理postData
const getPostData = (req) => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({});
      return;
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({});
      return;
    }
    let postData = "";
    req.on("data", (chunk) => {
      postData += chunk;
    })
    req.on("end", () => {
      if (!postData) {
        resolve({});
        return;
      }
      resolve(JSON.parse(postData));
    })
  })
  return promise;
}


const serverHandler = (req, res) => {
  // 设置返回格式
  res.setHeader('Content-type', 'application/json;charset=utf-8');
  // 处理blog路由
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // 解析cookies 转换成对象
  req.cookie = {};
  const cookieStr = req.headers.cookie || "";
  cookieStr.split(":").forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split(";");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].trim(); // 去除两边的空格
      const arrKey = arr[i].split("=");
      const key = arrKey[0];
      const val = arrKey[1];
      // console.log(key);
      req.cookie[key] = val;
      // console.log(val);
    }
    // console.log(req.cookie);
  })


  // 处理postdata
  getPostData(req).then(postData => {
    req.body = postData;
    // const blogData = handleRouter(req, res);
    const blogResult = handleRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(
          JSON.stringify(blogData)
        )
      })
      return;
    }
    // 处理user路由
    const userData = handleUserRouter(req, res);
    // console.log(userData);
    if (userData) {
      userData.then(userData => {
        res.end(
          JSON.stringify(userData)
        )
      })
      return;
    }
    // 404
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("404 not found");
    res.end();
  })
};
module.exports = serverHandler;