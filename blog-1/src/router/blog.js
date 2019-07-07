const { getList, getDetail } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleRouter = (req, res) => {
  const method = req.method;
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  // 博客详情
  if (method === 'GET' && req.path === "/api/blog/detail") {
    const id = req.query.id;
    const data = getDetail(id);
    return new SuccessModel(data);
  }
  // 新建
  if (method === 'POST' && req.path === "/api/blog/new") {
    return {
      msg: "新建接口"
    }
  }
  if (method === 'POST' && req.path === "/api/blog/update") {
    return {
      msg: "跟新接口"
    }
  }
  if (method === 'POST' && req.path === "/api/blog/del") {
    return {
      msg: "删除接口"
    }
  }
}
module.exports = handleRouter;