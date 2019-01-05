import axios from "axios"

export const fetchImg = arr => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "/ms/api/v1/file/getFileDownloadUrl",
      baseURL: "http://file-dev.devops.servingcloud.com/",
      data: arr
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}