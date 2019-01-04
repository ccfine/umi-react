import axios from "axios"

export const fetchCompanyList = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/selectMy",
      baseURL: "http://user-app-dev.devops.servingcloud.com/",
      params: payload,
      headers: {
        token: "23e00b919b6c4ccbbdd6625f33a4571e"
      }   
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}

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