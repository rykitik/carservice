import { createStore } from 'vuex';
import auth from './modules/auth';
import services from './modules/services';
import appointments from './modules/appointments';
import clients from './modules/clients';

export default createStore({
  modules: {
    auth,
    services,
    appointments,
    clients
  }
});