import { fetchCompanyList } from "../services/myCompany.js"
import { fetchImg } from "utils/img.js"

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
        total: action.total,
        loading: false
      }
    },
    companyLogo (state, action) {
      state.companyList[action.index].logo = action.logo
      return {
        ...state,
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
        list: data.data.data.list,
        total: data.data.data.total
      })
    },
    * addCompanyLogo (action, effects) {
      yield effects.put({ type: "load" })
      yield effects.put({
        type: "companyLogo",
        index: action.index,
        logo: action.src
      })
    }
  }
}