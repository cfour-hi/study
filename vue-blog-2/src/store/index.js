import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progress: 0,
    articleList: [],
    worklogList: []
  },
  mutations: {
    concatArticleList (state, payload) {
      state.articleList = state.articleList.concat(payload.list)
    },
    concatWorklogList (state, payload) {
      state.worklogList = state.worklogList.concat(payload.list)
    },
    modifyProgress (state, payload) {
      state.progress = payload.progress
    }
  }
})
