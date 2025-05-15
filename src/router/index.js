import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import MakeAppointment from '../views/MakeAppointment.vue';
import AdminPanel from '../views/AdminPanel.vue';
import store from '../store';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/make-appointment', component: MakeAppointment, meta: { requiresAuth: true } },
  { path: '/admin', component: AdminPanel, meta: { requiresAuth: true, isAdmin: true } }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const { requiresAuth, isAdmin } = to.meta;
  const user = store.state.user;

  if (requiresAuth && !user) {
    next('/login');
  } else if (isAdmin && user && user.role !== 'admin') {
    next('/');
  } else {
    next();
  }
});

export default router;
