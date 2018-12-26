import axios from "axios"

export const fetchCompanyList = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/selectMy",
      baseURL: "http://192.168.6.11:8082/",
      params: payload,
      headers: {
        token: "098a21d6e1af4d71a5285cd95ae4c9c6"
      }   
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}