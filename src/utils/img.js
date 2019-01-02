import axios from "axios"

export const fetchImg = (companyId, fileInfoId) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: "/ms/api/v1/file/getFileDownloadUrl",
      baseURL: "http://file-dev.devops.servingcloud.com/",
      data: {
        companyId,
        fileInfoId,
        moduleCode: "company",
        productLineId: 1
      }
    })
    .then(res => resolve(res.data.data.downloadUrl))
    .catch(err => reject(err))
  })
}