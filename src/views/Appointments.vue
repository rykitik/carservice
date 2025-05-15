<template>
  <div>
    <h2>Записи</h2>
    <ul>
      <li v-for="appointment in appointments" :key="appointment.id">
        Клиент: {{ appointment.client_id }}, Услуга: {{ appointment.service_id }}, Дата: {{ new Date(appointment.appointment_date).toLocaleString() }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'AppointmentList',
  data() {
    return {
      appointments: []
    };
  },
  created() {
    this.fetchAppointments();
  },
  methods: {
    async fetchAppointments() {
      try {
        const response = await this.$store.dispatch('fetchAppointments');
        this.appointments = this.$store.state.appointments;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
