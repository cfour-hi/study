// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import marked from 'Marked'
import hljs from 'highlight.js'

Vue.config.productionTip = false

axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  store.commit('modifyProgress', { progress: 70 })
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  store.commit('modifyProgress', { progress: 100 })
  return response.data
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

// 代码高亮
marked.setOptions({
  highlight (code) {
    return hljs.highlightAuto(code).value
  },
  breaks: true
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
