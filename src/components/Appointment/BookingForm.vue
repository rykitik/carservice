<template>
  <div class="booking-form">
    <h2>Запишитесь на диагностику ходовой части</h2>

    <!-- Шаг 1: Станция -->
    <div>
      <label>Станция обслуживания</label>
      <select v-model="form.location">
        <option v-for="loc in locations" :key="loc.id" :value="loc.address">{{ loc.address }}</option>
      </select>
    </div>

    <!-- Шаг 2: Дата и время -->
    <div>
      <label>Дата и время</label>
      <div class="days">
        <button
          v-for="(day, idx) in upcomingDays"
          :key="idx"
          @click="form.date = day.date"
          :class="{ active: form.date === day.date }"
        >{{ day.label }}</button>
      </div>
      <div class="times">
        <button
          v-for="slot in times"
          :key="slot"
          @click="form.time = slot"
          :class="{ active: form.time === slot }"
        >{{ slot }}</button>
      </div>
    </div>

    <!-- Шаг 3: Данные автомобиля -->
    <div>
      <label>Марка автомобиля</label>
      <input v-model="form.carBrand" placeholder="Например, Toyota" />

      <label>Модель автомобиля</label>
      <input v-model="form.carModel" placeholder="Например, Camry" />
    </div>

    <!-- Шаг 4: Контакты -->
    <div>
      <label>Ваше имя</label>
      <input v-model="form.name" placeholder="Ваше имя" />

      <label>Телефон</label>
      <input v-model="form.phone" placeholder="+7 (___) ___ __ __" />
    </div>

    <!-- Согласие -->
    <label>
      <input type="checkbox" v-model="form.bonusConfirmed" />
      Проинформирован о бонусной программе FIT SERVICE
    </label>

    <!-- Кнопка -->
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
        carBrand: '',
        carModel: '',
        name: '',
        phone: '',
        bonusConfirmed: false
      },
      locations: [
        { id: 1, address: 'Казань, Дементьева, 18' }
      ],
      times: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00']
    };
  },
  computed: {
    upcomingDays() {
      const days = [];
      const labels = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
      const today = new Date();
      for (let i = 0; i < 5; i++) {
        const d = new Date();
        d.setDate(today.getDate() + i);
        days.push({
          label: `${labels[d.getDay()]} ${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}`,
          date: d.toISOString().split('T')[0]
        });
      }
      return days;
    }
  },
  methods: {
    async submitBooking() {
      const {
        location, date, time,
        carBrand, carModel, name, phone,
        bonusConfirmed
      } = this.form;

      // Простейшая валидация
      if (!location || !date || !time || !carBrand || !carModel || !name || !phone) {
        return alert('Заполните все поля');
      }

      try {
        await fetch('/api/appointments', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            location, date, time,
            car_brand: carBrand,
            car_model: carModel,
            client_name: name,
            phone,
            bonus_confirmed: bonusConfirmed
          })
        });
        alert('Вы успешно записаны!');
      } catch (err) {
        console.error(err);
        alert('Ошибка при записи');
      }
    }
  }
};
</script>