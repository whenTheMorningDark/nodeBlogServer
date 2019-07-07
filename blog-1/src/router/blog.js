const { getList, getDetail, newBlog, updateBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    const listData = getList(author, keyword);
    return new SuccessModel(listData);
  }
  // 博客详情
  if (method === 'GET' && req.path === "/api/blog/detail") {
    const data = getDetail(id);
    return new SuccessModel(data);
  }
  // 新建
  if (method === 'POST' && req.path === "/api/blog/new") {
    const blogData = req.body;
    // console.log(1)
    const data = newBlog(blogData);
    return new SuccessModel(data);
  }
  // 更新
  if (method === 'POST' && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    if (result) {
      return new SuccessModel();
    } else {
      return new ErrorModel("更新失败!");
    }
  }
  if (method === 'POST' && req.path === "/api/blog/del") {
    return {
      msg: "删除接口"
    }
  }
}
module.exports = handleRouter;