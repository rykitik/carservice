import { createStore } from 'vuex';
import axios from '@/axios'; // мы подключим axios глобально

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null,
    services: [],
    clients: [],
    appointments: [],
  },
  mutations: {
    setServices(state, services) {
      state.services = services;
    },
    setClients(state, clients) {
      state.clients = clients;
    },
    setAppointments(state, appointments) {
      state.appointments = appointments;
    },
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
  actions: {
    async fetchServices({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/services');
        commit('setServices', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClients({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/clients');
        commit('setClients', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchAppointments({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments');
        commit('setAppointments', response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createService({ dispatch }, service) {
      try {
        await axios.post('http://localhost:3000/api/services', service, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch('fetchServices');
      } catch (error) {
        console.error(error);
      }
    },
    async createAppointment({ state }, appointment) {
    try {
      await axios.post('http://localhost:3000/api/appointments', appointment, {
        headers: {
          Authorization: `Bearer ${state.token}`
        }
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
    async updateService({ dispatch }, service) {
      try {
        await axios.put(`http://localhost:3000/api/services/${service.id}`, service, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch('fetchServices');
      } catch (error) {
        console.error(error);
      }
    },
    async deleteService({ dispatch }, serviceId) {
      try {
        await axios.delete(`http://localhost:3000/api/services/${serviceId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        dispatch('fetchServices');
      } catch (error) {
        console.error(error);
      }
    },
    async login({ commit, dispatch }, credentials) {
      const res = await axios.post('/auth/login', credentials);
      commit('setToken', res.data.token);
      commit('setUser', res.data.user);
      await dispatch('fetchUser'); // если надо обновить инфу
    },
    async register({ commit }, data) {
      const res = await axios.post('/auth/register', data);
      commit('setToken', res.data.token);
      commit('setUser', res.data.user);
    },
    async fetchUser({ commit, state }) {
      if (!state.token) return;
      try {
        const res = await axios.get('/auth/me');
        commit('setUser', res.data.user);
      } catch (err) {
        commit('clearAuth');
      }
    },
    logout({ commit }) {
      commit('clearAuth');
    }
  }
});

export default store;