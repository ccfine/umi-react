import axios from "axios"

export const fetchCompanyInformation = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/query",
      baseURL: "http://user-app-dev.devops.servingcloud.com/",
      params: payload,
      headers: {
        token: "729ef4137f024824855f3679c1a46004"
      }   
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}