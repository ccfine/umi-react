import { fetchCompanyInformation, fetchAuditResult } from "services/viewCompany.js"
import { fetchImg } from "utils/img.js"

export default {
  namespace: "viewCompany",

  state: {
    companyInformation: {},
    auditResult: {},
    loading: false
  },

  reducers: {
    load (state, action) {
      return {
        ...state,
        loading: true
      }
    },
    companyInformation (state, action) {
      return {
        ...state,
        companyInformation: action.information,
        loading: false
      }
    },
    auditResult (state, action) {
      return {
        ...state,
        auditResult: action.result,
        loading: false
      }
    }
  },

  effects: {
    * getCompanyInformation (action, effects) {
      yield effects.put({ type: "load" })
      const data = yield effects.call(fetchCompanyInformation, action.payload)
      let obj = data.data.data,
          arr = []
      for (let key in obj) {
        if (key === "authorizationId" || key === "businessLicenceId" || key === "companyLogo" || key === "legalPerBackPhoto" || key === "legalPerFacePhoto") {
          arr.push({
            companyId: obj.id,
            fileInfoId: obj[key],
            moduleCode: "default",
            productLineId: 1,
            userId: 1
          })
        }
      }
      const logoData = yield effects.call(fetchImg, arr)
      for (let logo of logoData.data.data) {
        for (let key in obj) {
          if (obj[key] == logo.fileInfoId) {
            const url = `${key}URL`
            obj[url] = logo.downloadUrl
          }
        }
      }
      yield effects.put({
        type: "companyInformation",
        information: obj
      })
    },
    * getAuditResult (action, effects) {
      yield effects.put({ type: "load" })
      const data = yield effects.call(fetchAuditResult, action.id)
      yield effects.put({
        type: "auditResult",
        result: data.data.data
      })
    }
  }
}