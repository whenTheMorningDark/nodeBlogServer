const { getList, getDetail, newBlog, updateBlog, delBlog } = require("../controller/blog");
const { SuccessModel, ErrorModel } = require("../model/resModel");
const handleRouter = (req, res) => {
  const method = req.method;
  const id = req.query.id;
  if (method === 'GET' && req.path === '/api/blog/list') {
    const author = req.query.author || "";
    const keyword = req.query.keyword || "";
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
    const result = getList(author, keyword)
    return result.then((listData) => {
      return new SuccessModel(listData);
    })
  }
  // 博客详情
  if (method === 'GET' && req.path === "/api/blog/detail") {
    const result = getDetail(id);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }
  // 新建
  if (method === 'POST' && req.path === "/api/blog/new") {
    const author = "咖啡";
    req.body.author = author;
    const blogData = req.body;
    // console.log(1)
    const result = newBlog(blogData);
    return result.then(data => {
      return new SuccessModel(data);
    })
  }
  // 更新
  if (method === 'POST' && req.path === "/api/blog/update") {
    const result = updateBlog(id, req.body);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("更新失败!");
      }
    })
  }
  if (method === 'POST' && req.path === "/api/blog/del") {
    const author = "咖啡";
    const result = delBlog(id, author);
    return result.then(val => {
      if (val) {
        return new SuccessModel();
      } else {
        return new ErrorModel("删除失败!");
      }
    })
  }
}
module.exports = handleRouter;