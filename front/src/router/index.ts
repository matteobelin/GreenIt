import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'articles',
      component: () => import(/* webpackChunkName: "articles" */ '../views/ArticleView.vue'),
      meta: {
        description: "Page d'acceuil avec tout les articles."
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
      meta: {
        description: "Page de contact permet de nous contacter"
      }
    },
    {
      path: '/about',
      name: 'aboutus',
      component: () => import(/* webpackChunkName: "aboutus" */ '../views/AboutUsView.vue'),
      meta: {
        description: "Page a propos de nous pour mieux nous connaitre."
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import(/* webpackChunkName: "not-found" */ "../views/NotFoundView.vue"),
      meta: {
        description: "Page pour les erreurs 404."
      }
    }
  ]
});

export default router;