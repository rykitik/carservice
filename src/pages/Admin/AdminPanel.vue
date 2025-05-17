<template>
  <div class="admin-panel">
    <h2>Услуги</h2>
    <ServiceForm @create="createService" />
    <ServiceTable :services="services" @delete="deleteService" @updated="fetchServices" />

    <h2>Клиенты</h2>
    <ClientForm @create="createClient" />
    <ClientTable :clients="clients" @delete="deleteClient" @updated="fetchClients" />

    <h2>Записи</h2>
    <AppointmentTable
      :appointments="appointments"
      :services="services"
      :clients="clients"
      @delete="deleteAppointment"
      @updated="fetchAppointments"
    />
  </div>
</template>

<script>
import ServiceForm from '@/components/Service/ServiceForm.vue';
import ClientForm from '@/components/Client/ClientForm.vue';
import ServiceTable from '@/components/Service/ServiceTable.vue';
import ClientTable from '@/components/Client/ClientTable.vue';
import AppointmentTable from '@/components/Appointment/AppointmentTable.vue';
import axios from '@/axios';

export default {
  components: {
    ServiceForm,
    ClientForm,
    ServiceTable,
    ClientTable,
    AppointmentTable
  },
  data() {
    return {
      services: [],
      clients: [],
      appointments: []
    };
  },
  async created() {
    await Promise.all([
      this.fetchServices(),
      this.fetchClients(),
      this.fetchAppointments()
    ]);
  },
  methods: {
    async fetchServices() {
      try {
        const response = await axios.get('/services');
        this.services = response.data;
      } catch (error) {
        console.error('Ошибка загрузки услуг:', error);
      }
    },
    async fetchClients() {
      try {
        const response = await axios.get('/clients');
        this.clients = response.data;
      } catch (error) {
        console.error('Ошибка загрузки клиентов:', error);
      }
    },
    async fetchAppointments() {
      try {
        const response = await axios.get('/appointments');
        this.appointments = response.data;
      } catch (error) {
        console.error('Ошибка загрузки записей:', error);
      }
    },
    async createService(service) {
      try {
        await axios.post('/services', service);
        this.fetchServices();
      } catch (error) {
        console.error('Ошибка создания услуги:', error);
      }
    },
    async deleteService(id) {
      try {
        await axios.delete(`/services/${id}`);
        this.fetchServices();
      } catch (error) {
        console.error('Ошибка удаления услуги:', error);
      }
    },
    async createClient(client) {
      try {
        await axios.post('/clients', client);
        this.fetchClients();
      } catch (error) {
        console.error('Ошибка создания клиента:', error);
      }
    },
    async deleteClient(id) {
      try {
        await axios.delete(`/clients/${id}`);
        this.fetchClients();
      } catch (error) {
        console.error('Ошибка удаления клиента:', error);
      }
    },
    async deleteAppointment(id) {
      try {
        await axios.delete(`/appointments/${id}`);
        this.fetchAppointments();
      } catch (error) {
        console.error('Ошибка удаления записи:', error);
      }
    }
  }
};
</script>
<style scoped>
.admin-panel {
  max-width: 1200px;
  margin: auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

section {
  margin-bottom: 2rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
}

h1, h2 {
  text-align: center;
  color: #333;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th, .admin-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.admin-table th {
  background-color: #f0f0f0;
}

button {
  margin: 0 2px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  background-color: #eee;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>