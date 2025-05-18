<template>
  <div>
    <h2>Добро пожаловать в наш автосервис!</h2>
    <p>У нас вы можете записаться на обслуживание вашего автомобиля.</p>
    <BookingForm />
  </div>
</template>

<script>
import BookingForm from '@/components/Appointment/BookingForm.vue';

export default {
  name: 'HomePage',
  components: { BookingForm }
};
</script>
