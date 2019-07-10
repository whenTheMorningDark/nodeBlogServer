const handleRouter = require("./src/router/blog");
const handleUserRouter = require("./src/router/user");
const querystring = require("querystring");
// 获取cookie的过期时间
const getCookieExpires = () => {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  return d.toGMTString();
}
// session数据
const SESSION_DATA = {};


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
      req.cookie[key] = val;
    }
  })

  // 解析session
  let needSetCookie = false;
  let userId = req.cookie.userid;
  if (userId) {
    if (!SESSION_DATA[userId]) {
      SESSION_DATA[userId] = {};
    }
    // console.log("bbb", SESSION_DATA[userId])
  } else {
    needSetCookie = true;
    userId = `${Date.now()}_${Math.random()}`;
    SESSION_DATA[userId] = {};
  }
  // console.log("aaa", SESSION_DATA[userId]);
  req.session = SESSION_DATA[userId];
  // 处理postdata
  getPostData(req).then(postData => {
    req.body = postData;
    const blogResult = handleRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }
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
        if (needSetCookie) {
          res.setHeader("Set-Cookie", `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
        }

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