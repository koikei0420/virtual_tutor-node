import Vue from 'vue'
import Router from 'vue-router'
import Top from './views/top.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'top',
      component: Top
    },
    {
      path: '/questions/input',
      name: 'questions_input',
      component: () => import('./views/input.vue')
    },
    {
      path: '/questions/:id',
      name: 'questions',
      component: () => import('./views/question_detail.vue')
    },
    {
      path: '/questions/:id/answer',
      name: 'answer_input',
      component: () => import('./views/input_answer.vue')
    },
    {
      path: '/handwrite',
      name: 'handwrite',
      component: () => import('./views/handwrite.vue')
    },
  ]
})
