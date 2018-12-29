import axios from "axios"

export const fetchCompanyInformation = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/query",
      baseURL: "http://user-app-dev.devops.servingcloud.com/",
      params: payload,
      headers: {
        token: "75f0b70c06f34c24a21f4d040a6d7e8a"
      }   
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}