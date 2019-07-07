const fs = require("fs");
const path = require("path");
// callback方式获取文件的内容
// function getFileContent(fileName, callBack) {
//   const fullFileName = path.resolve(__dirname, "files", fileName);
//   fs.readFile(fullFileName, (err, data) => {
//     if (err) {
//       console.log(err);
//       return
//     }
//     callBack(JSON.parse(data.toString()));
//     // console.log();
//   })
// }
// getFileContent("a.json", aData => {
//   console.log(aData);
//   getFileContent(aData.next, bData => {
//     console.log(bData);
//     getFileContent(bData.next, cData => {
//       console.log(cData);
//     })
//   })
// })

function getFileContent(fileName) {
  const promise = new Promise((resolve, reject) => {
    const fullFileName = path.resolve(__dirname, "files", fileName);
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err);
        return
      }
      resolve(JSON.parse(data.toString()));
      // console.log();
    })
  })
  return promise;
}
getFileContent("a.json").then(aData => {
  console.log(aData);
  return getFileContent(aData.next);
}).then(bData => {
  console.log(bData);
  return getFileContent(bData.next);
}).then(cData => {
  console.log(cData);
})