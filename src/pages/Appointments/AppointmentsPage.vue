<template>
  <div>
    <h2>Запись на услугу</h2>
    <AppointmentForm />
  </div>
</template>

<script>
import AppointmentForm from '@/components/Appointment/AppointmentForm.vue';

export default {
  name: 'AppointmentPage',
  components: { AppointmentForm }
};
</script>

<style scoped>
/* стили страницы записи */
</style>