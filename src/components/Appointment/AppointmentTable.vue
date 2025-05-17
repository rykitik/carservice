<template>
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
        <td><button @click="$emit('delete', appointment.id)">×</button></td>
      </tr>
      <tr v-if="!appointments.length">
        <td colspan="5" class="empty">Нет записей</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'AppointmentTable',
  props: {
    appointments: { type: Array, default: () => [] },
    services:     { type: Array, default: () => [] },
    clients:      { type: Array, default: () => [] }
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