import { createRouter, createWebHistory} from 'vue-router';


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'articles',
        component: () => import('../views/ArticleView.vue')
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('../views/ContactView.vue')
      },
      {
        path: '/about',
        name: 'aboutus',
        component: () => import('../views/AboutUsView.vue')
      }
    ]})


    export default router