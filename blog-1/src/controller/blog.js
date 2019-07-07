const getList = (author, keyword) => {
  // 先返回假数据
  return [
    { id: 1, title: "标题1", content: "内容1" },
    { id: 2, title: "标题2", content: "内容2" },
    { id: 3, title: "标题3", content: "内容3" }
  ]
}
const getDetail = (id) => {
  return [
    { id: 1, title: "标题1", content: "内容1" },
  ]
}
module.exports = {
  getList,
  getDetail
}