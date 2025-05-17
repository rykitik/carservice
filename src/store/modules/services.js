import api from '@/axios';

export default {
  namespaced: true,
  state: () => ({ list: [] }),
  mutations: {
    SET_SERVICES(state, services) { state.list = services; }
  },
  actions: {
    async fetch({ commit }) {
      const { data } = await api.get('/services');
      commit('SET_SERVICES', data);
    },
    async create(_, service) {
      await api.post('/services', service);
    },
    async update(_, service) {
      await api.put(`/services/${service.id}`, service);
    },
    async remove(_, id) {
      await api.delete(`/services/${id}`);
    }
  }
};