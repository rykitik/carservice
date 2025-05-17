import api from '@/axios';

export default {
  namespaced: true,
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  mutations: {
    SET_USER(state, user) { state.user = user; },
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async login({ commit }, creds) {
      const { data } = await api.post('/auth/login', creds);
      commit('SET_TOKEN', data.token);
      commit('SET_USER', data.user);
    },
    async register({ commit }, payload) {
      const { data } = await api.post('/auth/register', payload);
      commit('SET_TOKEN', data.token);
      commit('SET_USER', data.user);
    },
    async fetchMe({ commit, state }) {
      if (!state.token) return;
      const { data } = await api.get('/auth/me');
      commit('SET_USER', data.user);
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
    }
  },
  getters: {
    isAuth: state => !!state.token,
    isAdmin: state => state.user?.role === 'admin'
  }
};