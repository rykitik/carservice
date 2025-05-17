<template>
  <div>
    <table class="appointment-table">
      <thead>
        <tr>
          <th>Дата</th>
          <th>Время</th>
          <th>Услуга</th>
          <th>Клиент</th>
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
            <button @click="$emit('delete', appointment.id)">×</button>
          </td>
        </tr>
        <tr v-if="appointments.length === 0">
          <td colspan="5" class="empty">Нет записей</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
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
    }
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
.appointment-table th,
.appointment-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.appointment-table .empty {
  text-align: center;
  color: #888;
}
</style>