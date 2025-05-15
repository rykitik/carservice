<template>
  <div>
    <h2>Админ Панель</h2>

    <section>
      <h3>Управление услугами</h3>
      <form @submit.prevent="addService">
        <input v-model="newService.name" placeholder="Название услуги" required />
        <input v-model="newService.price" type="number" placeholder="Цена" required />
        <input v-model="newService.description" placeholder="Описание" />
        <button type="submit">Добавить услугу</button>
      </form>

      <ul>
        <li v-for="service in services" :key="service.id">
          {{ service.name }} - {{ service.price }} руб.
          <button @click="editService(service)">Редактировать</button>
          <button @click="deleteService(service.id)">Удалить</button>
        </li>
      </ul>
    </section>

    <section>
      <h3>Управление клиентами</h3>
      <ul>
        <li v-for="client in clients" :key="client.id">
          {{ client.name }} ({{ client.email }})
          <button @click="editClient(client)">Редактировать</button>
        </li>
      </ul>
    </section>

    <section>
      <h3>Управление записями</h3>
      <table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Время</th>
            <th>Услуга</th>
            <th>Клиент</th>
            <th>Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="appointment in appointments" :key="appointment.id">
            <td>{{ formatDate(appointment.date) }}</td>
            <td>{{ formatTime(appointment.time) }}</td>
            <td>{{ getServiceName(appointment.service_id) }}</td>
            <td>{{ getClientName(appointment.client_id) }}</td>
            <td>
              <button @click="deleteAppointment(appointment.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <div v-if="editingService">
      <h3>Редактирование услуги</h3>
      <form @submit.prevent="updateService">
        <input v-model="editingService.name" placeholder="Название услуги" required />
        <input v-model="editingService.price" type="number" placeholder="Цена" required />
        <input v-model="editingService.description" placeholder="Описание" />
        <button type="submit">Сохранить</button>
        <button @click="cancelEditingService">Отмена</button>
      </form>
    </div>

    <div v-if="editingClient">
      <h3>Редактирование клиента</h3>
      <form @submit.prevent="updateClient">
        <input v-model="editingClient.name" placeholder="Имя клиента" required />
        <input v-model="editingClient.email" placeholder="Email" required />
        <input v-model="editingClient.password" type="password" placeholder="Пароль" required />
        <input v-model="editingClient.role" placeholder="Роль" required />
        <button type="submit">Сохранить</button>
        <button @click="cancelEditingClient">Отмена</button>
      </form>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      newService: {
        name: '',
        price: '',
        description: ''
      },
      services: [],
      clients: [],
      appointments: {},
      editingService: null,
      editingClient: null
    };
  },
  async created() {
    await this.fetchServices();
    await this.fetchClients();
    await this.fetchAppointments();
  },
  methods: {
    async fetchServices() {
      try {
        await this.$store.dispatch('fetchServices');
        this.services = this.$store.state.services;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchClients() {
      try {
        await this.$store.dispatch('fetchClients');
        this.clients = this.$store.state.clients;
      } catch (error) {
        console.error(error);
      }
    },
    async addService() {
      try {
        await this.$store.dispatch('createService', this.newService);
        await this.fetchServices();
        this.newService = { name: '', price: '', description: '' };
      } catch (error) {
        console.error(error);
      }
    },
    editService(service) {
      this.editingService = { ...service };
    },
    async updateService() {
      try {
        await this.$store.dispatch('updateService', this.editingService);
        await this.fetchServices();
        this.editingService = null;
      } catch (error) {
        console.error(error);
      }
    },
    async deleteService(serviceId) {
      try {
        await this.$store.dispatch('deleteService', serviceId);
        await this.fetchServices();
      } catch (error) {
        console.error(error);
      }
    },
    cancelEditingService() {
      this.editingService = null;
    },
    editClient(client) {
      this.editingClient = { ...client, password: '' };
    },
    async updateClient() {
      try {
        await this.$store.dispatch('updateClient', this.editingClient);
        await this.fetchClients();
        this.editingClient = null;
      } catch (error) {
        console.error(error);
      }
    },
    cancelEditingClient() {
      this.editingClient = null;
    },
    deleteAppointment(id) {
      this.$store.dispatch('deleteAppointment', id)
        .then(() => this.fetchAppointments())
        .catch(err => console.error(err));
    },
    formatDate(datetime) {
      if (!datetime) return '—';
      const formatted = datetime.replace(' ', 'T'); // исправляем формат
      const date = new Date(formatted);
      return isNaN(date) ? 'Неверная дата' : date.toLocaleDateString();
    },
    formatTime(datetime) {
      if (!datetime) return '—';

      let formatted = datetime;

      // Если пришло только время (например, "00:10:00")
      if (/^\d{2}:\d{2}:\d{2}$/.test(datetime)) {
        formatted = `1970-01-01T${datetime}`;
      }

      // Если пришёл datetime с пробелом (например, "2025-05-14 00:10:00")
      if (datetime.includes(' ') && datetime.includes(':')) {
        formatted = datetime.replace(' ', 'T');
      }

      const date = new Date(formatted);
      return isNaN(date)
        ? '—'
        : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    getServiceName(serviceId) {
      const service = this.$store.state.services.find(s => s.id === serviceId);
      return service ? service.name : '—';
    },
    getClientName(clientId) {
      const client = this.$store.state.clients.find(c => c.id === clientId || c.id == clientId);      return client ? `${client.name}` : 'Неизвестно';
    },
    async fetchAppointments() {
      await this.$store.dispatch('fetchAppointments');
      try {
        await this.$store.dispatch('fetchAppointments');
        this.appointments = this.$store.state.appointments;
        console.log(this.appointments)
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
/* Добавьте стили для админ-панели */
</style>
