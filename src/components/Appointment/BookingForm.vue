<template>
  <div class="booking-form">
    <h2>Запишитесь на диагностику ходовой части</h2>

    <select v-model="form.location">
      <option disabled value="">Выберите станцию</option>
      <option>Казань, Дементьева, 18</option>
    </select>

    <div>
      <label>Дата:</label>
      <input type="date" v-model="form.date" @change="fetchTimes" />
    </div>

    <div>
      <label>Время:</label>
      <select v-model="form.time">
        <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
      </select>
    </div>

    <input v-model="form.car_brand" placeholder="Марка авто" />
    <input v-model="form.car_model" placeholder="Модель авто" />
    <input v-model="form.client_name" placeholder="Ваше имя" />
    <input v-model="form.phone" placeholder="+7 (___) ___ __ __" />

    <input v-model="form.promocode" placeholder="Промокод (если есть)" @blur="checkPromocode" />
    <div v-if="promocodeStatus === true" style="color: green;">Промокод применен</div>
    <div v-if="promocodeStatus === false" style="color: red;">Промокод недействителен</div>

    <button @click="submitBooking">Записаться на СТО</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        location: '',
        date: '',
        time: '',
        car_brand: '',
        car_model: '',
        client_name: '',
        phone: '',
        promocode: ''
      },
      availableTimes: [],
      promocodeStatus: null
    };
  },
  methods: {
    async fetchTimes() {
      if (this.form.date && this.form.location) {
        const res = await fetch(`/api/appointments/available-times?date=${this.form.date}&location=${this.form.location}`);
        this.availableTimes = await res.json();
      }
    },
    async checkPromocode() {
      if (this.form.promocode.trim() !== '') {
        const res = await fetch('/api/appointments/check-promocode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: this.form.promocode })
        });
        const result = await res.json();
        this.promocodeStatus = result.valid;
      }
    },
    async submitBooking() {
      try {
        const res = await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.form)
        });

        if (!res.ok) {
          const { error } = await res.json();
          alert('Ошибка: ' + error);
          return;
        }

        alert('Вы успешно записались!');
      } catch (err) {
        console.error('Ошибка:', err);
      }
    }
  }
};
</script>

<style>
.booking-form {
  max-width: 500px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>