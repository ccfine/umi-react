import { fetchCompanyInformation, fetchAuditResult } from "../services/viewCompany.js"

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
      yield effects.put({
        type: "companyInformation",
        information: data.data.data
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