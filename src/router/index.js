import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Bookmark from '@/components/Bookmark'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/bookmark',
      name: 'Bookmark',
      component: Bookmark
    }
  ]
});