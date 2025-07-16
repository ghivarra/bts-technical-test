import { createRouter, createWebHistory } from 'vue-router'

import LoginView from './page/LoginView.vue'
import RegisterView from './page/RegisterView.vue'
import DashboardView from './page/DashboardView.vue'

const routes = [
  { path: '/', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/admin/dashboard', component: DashboardView },
]

const routeCollection = createRouter({
  history: createWebHistory(),
  routes,
})

export default routeCollection