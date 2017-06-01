import axios from 'axios'

const ORIGIN = 'https://api.github.com'
const OWNER = 'monine'
const BLOG_REPO = 'monine.github.io'
const WORKLOG_REPO = 'worklog'
const ACCESS_TOKEN = 'b2f811c8b61b55743e97' + '4643f20d98956812c71b'

export function getArticleList ({ page, size }) {
  const params = {
    filter: 'created',
    page: page,
    per_page: size,
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + BLOG_REPO + '/issues', { params })
}

export function getWorklogList ({ page, size }) {
  const params = {
    filter: 'created',
    page: page,
    per_page: size,
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + WORKLOG_REPO + '/issues', { params })
}

export function getArticleByNumber (num) {
  const params = {
    access_token: ACCESS_TOKEN
  }
  return axios.get(ORIGIN + '/repos/' + OWNER + '/' + BLOG_REPO + '/issues/' + num, { params })
}
