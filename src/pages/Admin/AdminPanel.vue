<template>
  <div>
    <ServiceForm />
    <ClientForm />
    <AppointmentTable :appointments="appointments" />
  </div>
</template>

<script>
import ServiceForm from '@/components/Service/ServiceForm.vue';
import ClientForm from '@/components/Client/ClientForm.vue';
import AppointmentTable from '@/components/Appointment/AppointmentTable.vue';
import axios from '@/axios'

export default {
  data() {
    return {
      appointments: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('/appointments');
      this.appointments = response.data;
    } catch (error) {
      console.error('Ошибка загрузки записей:', error);
    }
  },
  components: {
    ServiceForm,
    ClientForm,
    AppointmentTable
  }
};
</script>