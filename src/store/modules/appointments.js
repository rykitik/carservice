import api from '@/axios';

export default {
  namespaced: true,
  state: () => ({ list: [] }),
  mutations: {
    SET_APPOINTMENTS(state, appts) { state.list = appts; }
  },
  actions: {
    async fetch({ commit, rootGetters }) {
      if (!rootGetters['auth/isAdmin']) return;
      const { data } = await api.get('/appointments');
      commit('SET_APPOINTMENTS', data);
    },
    async create(_, appt) {
      await api.post('/appointments', appt);
    },
    async remove(_, id) {
      await api.delete(`/appointments/${id}`);
    }
  }
};