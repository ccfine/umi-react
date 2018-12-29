import axios from "axios"

export async function getImg (companyId, fileInfoId) {
  const data = await axios({
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
  const src = data.data.data.downloadUrl
  return src
}