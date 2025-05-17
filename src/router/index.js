import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
  { path: '/', component: () => import('@/pages/Home/HomePage.vue') },
  { path: '/login', component: () => import('@/pages/Auth/LoginPage.vue') },
  { path: '/register', component: () => import('@/pages/Auth/RegisterPage.vue') },
  { path: '/services', component: () => import('@/pages/Services/ServicesPage.vue') },
  // { 
  //   path: '/appointments', 
  //   component: () => import('@/pages/Appointments/MakeAppointment.vue'),
  //   meta: { requiresAuth: true } 
  // },
  {
    path: '/appointments',
    component: () => import('@/pages/Appointments/AppointmentsPage.vue'),
    meta: { requiresAuth: true }
  },
  { path: '/clients', component: () => import('@/pages/Clients/ClientsPage.vue'), meta: { requiresAuth: true, isAdmin: true } },
  { path: '/admin', component: () => import('@/pages/Admin/AdminPanel.vue'), meta: { requiresAuth: true, isAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const { requiresAuth, isAdmin } = to.meta;
  const isAuth   = store.getters['auth/isAuth'];
  const userIsAdmin = store.getters['auth/isAdmin'];
  if (requiresAuth && !isAuth) return next('/login');
  if (isAdmin && !userIsAdmin) return next('/');
  next();
});

export default router;