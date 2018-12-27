import axios from "axios"

export const fetchCompanyList = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/selectMy",
      baseURL: "http://user-app-dev.devops.servingcloud.com/",
      params: payload,
      headers: {
        token: "c183399ba14943f5befec9ba183ba495"
      }   
    }).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}