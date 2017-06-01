import Vue from 'vue'
import Router from 'vue-router'
import MainContainer from '@/components/MainContainer'
import Home from '@/components/Home'
import ArticleList from '@/components/ArticleList'
import ArticleContent from '@/components/ArticleContent'
import WorklogList from '@/components/WorklogList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'home',
          component: Home
        }
      ]
    },
    {
      path: '/article',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'article-list',
          component: ArticleList
        },
        {
          path: ':number',
          name: 'article-content',
          component: ArticleContent
        }
      ]
    },
    {
      path: '/worklog',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'worklog-timeline',
          component: WorklogList
        }
      ]
    }
  ]
})
