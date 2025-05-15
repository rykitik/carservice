<template>
  <div>
    <h2>Записаться на услугу</h2>
    <form @submit.prevent="makeAppointment">
      <div>
        <label for="service">Услуга:</label>
        <select v-model="appointment.service_id" required>
          <option v-for="service in services" :key="service.id" :value="service.id">
            {{ service.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="date">Дата и время:</label>
        <input type="datetime-local" v-model="appointment.datetime" required />
      </div>
      <button type="submit">Записаться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MakeAppointment',
  data() {
    return {
      appointment: {
        service_id: '',
        datetime: ''
      }
    };
  },
  computed: {
    services() {
      return this.$store.state.services;
    }
  },
  async created() {
    await this.$store.dispatch('fetchServices');
  },
  methods: {
    async makeAppointment() {
      try {
        // Проверка авторизации
        const user = this.$store.state.user;
        if (!user) {
          alert('Вы не авторизованы');
          return;
        }

        // Разбиваем дату и время
        const [date, time] = this.appointment.datetime.split('T');

        // Собираем объект для отправки
        const payload = {
          client_id: user.id,
          service_id: this.appointment.service_id,
          date,
          time
        };

        await this.$store.dispatch('createAppointment', payload);
        alert('Запись успешно создана!');
        this.$router.push('/');
      } catch (error) {
        console.error(error);
        alert('Ошибка при создании записи');
      }
    }
  }
};
</script>