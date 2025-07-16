import { createRouter, createWebHistory } from 'vue-router'

import LoginView from './page/LoginView.vue'
import RegisterView from './page/RegisterView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
]

const routeCollection = createRouter({
  history: createWebHistory(),
  routes,
})

export default routeCollection