import { fetchCompanyList } from "../services/myCompany.js"

export default {
  namespace: "myCompany",

  state: {
    companyList: [],
    total: 0,
    loading: false
  },

  reducers: {
    load (state, action) {
      return {
        ...state,
        loading: true
      }
    },
    companyList (state, action) {
      return {
        ...state,
        companyList: action.list,
        loading: false
      }
    }
  },

  effects: {
    * getCompanyList (action, effects) {
      yield effects.put({ type: "load" })
      const data = yield effects.call(fetchCompanyList, action.payload)
      yield effects.put({
        type: "companyList",
        list: data.data.data.list
      })
    }
  }
}