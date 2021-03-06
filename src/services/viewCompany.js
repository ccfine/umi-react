import axios from "axios"

export const fetchCompanyInformation = payload => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/company/query",
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

export const fetchAuditResult = id => {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: "/ms/api/v1/uc/companyApply/select",
      baseURL: "http://user-app-dev.devops.servingcloud.com/",
      params: { 
        companyId: id
      },
      headers: {
        token: "23e00b919b6c4ccbbdd6625f33a4571e"
      }   
    })
    .then(res => resolve(res))
    .catch(err => reject(err))
  })
}