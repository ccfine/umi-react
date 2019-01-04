import { fetchCompanyList, fetchImg } from "../services/myCompany.js"

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
    addCompanyLogo (state, action) {
      state.companyList.forEach(company => {
        if (company.companyLogo === action.id) {
          company.logo = action.logo
        }
      })
      return {
        ...state,
        companyList: state.companyList,
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
    * getCompanyLogo (action, effects) {
      // yield effects.put({ type: "load" })
      const data = yield effects.call(fetchImg, action.arr)
      yield data.data.forEach(item =>
        effects.put({
          type: "addCompanyLogo",
          logo: item.downloadUrl,
          id: item.fileInfoId
        })
      )
    }
  }
}