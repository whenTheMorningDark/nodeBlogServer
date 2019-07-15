const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");




const handleUserRouter = (req, res) => {
  const method = req.method;

  if (method === 'POST' && req.path === "/api/user/login") {
    const { username, password } = req.body;
    // const { username, password } = req.query;
    const result = login(username, password);
    // console.log(result);
    return result.then(data => {
      if (data.username) {
        // 设置session
        // console.log(req.session);
        req.session.username = data.username;
        req.session.realname = data.realname;
        // console.log(req.session);
        // 操作cookies

        // res.setHeader("Set-Cookie", `username=${data.username}; path=/; httpOnly; expires=${getCookieExpires()}`);
        return new SuccessModel();
      }
      return new ErrorModel("登录失败!");
    })
  }
  // 登录测试
  // if (method === "GET" && req.path === "/api/user/login-test") {
  //   // console.log(req.session)
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel({
  //       session: req.session
  //     }));
  //   }
  //   return Promise.resolve(new ErrorModel("登录失败!"));
  // }
}
module.exports = handleUserRouter;