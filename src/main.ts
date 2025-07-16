import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import routeCollection from './router-collection'

createApp(App).use(routeCollection).mount('#app')
