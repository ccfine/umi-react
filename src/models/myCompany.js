import { fetchCompanyList } from "services/myCompany.js"
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
    }
  },

  effects: {
    * getCompanyList (action, effects) {
      yield effects.put({ type: "load" })
      const data = yield effects.call(fetchCompanyList, action.payload)
      let list = data.data.data.list
      const arr = list.map(item => ({
        companyId: item.id,
        fileInfoId: item.companyLogo,
        moduleCode: "default",
        productLineId: 1,
        userId: 1
      }))
      const logoData = yield effects.call(fetchImg, arr)
      for (let logo of logoData.data.data) {
        for (let i = 0; i < list.length; i++) {
          if (list[i].companyLogo == logo.fileInfoId) {
            list[i].logo = logo.downloadUrl
          }
        }
      }
      yield effects.put({
        type: "companyList",
        list,
        total: data.data.data.total
      })
    }
  }
}