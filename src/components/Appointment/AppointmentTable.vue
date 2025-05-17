<template>
  <table class="appointment-table">
    <thead>
      <tr>
        <th>Дата</th>
        <th>Время</th>
        <th>Услуга</th>
        <th>Клиент</th>
        <th>Статус</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="appointment in appointments" :key="appointment.id">
        <td>{{ appointment.date }}</td>
        <td>{{ appointment.time }}</td>
        <td>{{ findServiceName(appointment.service_id) }}</td>
        <td>{{ findClientName(appointment.client_id) }}</td>
        <td>
          <select v-model="appointment.status" @change="updateStatus(appointment)">
            <option value="pending">Ожидает</option>
            <option value="confirmed">Подтвержден</option>
            <option value="completed">Завершён</option>
            <option value="cancelled">Отменён</option>
          </select>
        </td>
        <td>
          <button @click="$emit('delete', appointment.id)">🗑</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from '@/axios';
import { mapState } from 'vuex';

export default {
  name: 'AppointmentTable',
  props: {
    appointments: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    // Подтягиваем список услуг из vuex/services
    ...mapState('services', {
      services: state => state.list
    }),
    // Подтягиваем список клиентов из vuex/clients
    ...mapState('clients', {
    clients: state => state.list
    })
  },
  methods: {
    findServiceName(id) {
      const s = this.services.find(x => x.id === id);
      return s ? s.name : '—';
    },
    findClientName(id) {
      const c = this.clients.find(x => x.id === id);
      return c ? c.name : '—';
    },
    changeStatus(appointment) {
      this.$emit('update', appointment);
    },
    async updateStatus(appointment) {
    try {
      await axios.put(`/appointments/${appointment.id}`, appointment);
    } catch (err) {
      console.error('Ошибка обновления статуса:', err);
      alert('Ошибка при обновлении статуса');
    }
  },
    
  },
  async created() {
    // если services или clients еще не загружены — загрузим их
    if (!this.services.length) {
    await this.$store.dispatch('services/fetch');
    }
    if (!this.clients.length) {
      await this.$store.dispatch('clients/fetch');
    }
  }
};
</script>

<style scoped>
.appointment-table {
  width: 100%;
  border-collapse: collapse;
}
.appointment-table td, .appointment-table th {
  padding: 8px;
  border: 1px solid #ddd;
}
appointment {
  padding: 4px;
}
.appointment-table .empty {
  text-align: center;
  color: #888;
}
</style>