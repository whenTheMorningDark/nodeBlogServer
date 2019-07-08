const { exec } = require("../db/mysql");


const getList = (author, keyword) => {
  // 先返回假数据
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc`
  return exec(sql);
}
const getDetail = (id) => {
  const sql = `select * from blogs where id='${id}'`;
  return exec(sql).then(rows => {
    return rows[0];
  })
}
const newBlog = (blogData = {}) => {
  // blogData博客对象
  // console.log(blogData);
  const { title, content, author } = blogData;
  const createtime = Date.now();
  const sql = `insert into blogs(title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}')`;
  return exec(sql).then(insertData => {
    console.log(insertData);
    return {
      id: insertData.insertId
    }
  })
}
const updateBlog = (id, blogData = {}) => {
  // console.log(id, blogData);
  const { title, content } = blogData;
  const sql = `update blogs set title='${title}',content='${content}' where id='${id}'`;
  return exec(sql).then(updateData => {
    // console.log(updateData);
    if (updateData.affectedRows > 0) {
      return true;
    }
    return false;
  });
}
const delBlog = (id, author) => {
  // return true;
  const sql = `delete from blogs where id='${id}' and author='${author}'`;
  return exec(sql).then(delData => {
    // console.log(delData)
    if (delData.affectedRows > 0) {
      return true;
    }
    return false;
  })
}
module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}