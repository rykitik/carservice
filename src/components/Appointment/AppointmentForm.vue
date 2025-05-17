<template>
  <div class="appointment-container">
    <h2>Записаться на услугу</h2>

    <!-- Выбор услуги -->
    <div class="field">
      <label>Услуга</label>
      <select v-model="form.service_id" @change="resetDateTime" required>
        <option value="" disabled>Выберите услугу</option>
        <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </div>

    <!-- Навигация по датам -->
    <div class="field date-picker">
      <label>Дата</label>
      <button @click="prevDay" :disabled="isPast(prevDate)">←</button>
      <input
        type="date"
        v-model="form.date"
        :min="today"
        @change="loadBookedSlots"
      />
      <button @click="nextDay">→</button>
    </div>

    <!-- Временные слоты -->
    <div class="field">
      <label>Время</label>
      <select v-model="form.time" required>
        <option value="" disabled>
          {{ loading ? 'Загрузка…' : (availableTimes.length ? 'Выберите время' : 'Нет свободных слотов') }}
        </option>
        <option
          v-for="t in availableTimes"
          :key="t"
          :value="t"
        >
          {{ t }}
        </option>
      </select>
    </div>

    <!-- Отправка -->
    <button
      class="submit-btn"
      :disabled="!canSubmit"
      @click.prevent="submit"
    >
      {{ submitting ? 'Запись…' : 'Записаться' }}
    </button>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from '@/axios';
import { mapState } from 'vuex';

export default {
  name: 'AppointmentForm',
  data() {
    return {
      form: {
        service_id: '',
        date: '',
        time: ''
      },
      booked: [],    // занятые слоты на выбранную дату
      loading: false,
      submitting: false,
      error: ''
    };
  },
  computed: {
    ...mapState('services', ['list']),
    services() {
      return this.list;
    },
    today() {
      return new Date().toISOString().slice(0, 10);
    },
    prevDate() {
      const d = new Date(this.form.date || this.today);
      d.setDate(d.getDate() - 1);
      return d.toISOString().slice(0, 10);
    },
    nextDate() {
      const d = new Date(this.form.date || this.today);
      d.setDate(d.getDate() + 1);
      return d.toISOString().slice(0, 10);
    },
    // Генерируем слоты с 9:00 до 18:00 через каждый час
    availableTimes() {
      const slots = [];
      for (let h = 9; h <= 18; h++) {
        const t = String(h).padStart(2, '0') + ':00:00';
        if (!this.booked.includes(t)) slots.push(t.slice(0,5));
      }
      return slots;
    },
    canSubmit() {
      return this.form.service_id && this.form.date && this.form.time && !this.submitting;
    }
  },
  methods: {
    resetDateTime() {
      this.form.date = '';
      this.form.time = '';
      this.booked = [];
    },
    prevDay() {
      if (!this.isPast(this.prevDate)) {
        this.form.date = this.prevDate;
        this.loadBookedSlots();
      }
    },
    nextDay() {
      this.form.date = this.nextDate;
      this.loadBookedSlots();
    },
    isPast(dateStr) {
      return new Date(dateStr) < new Date(this.today);
    },
    async loadBookedSlots() {
      if (!this.form.date) return;
      this.loading = true;
      this.booked = [];
      try {
        const { data } = await api.get('/appointments', { params: { date: this.form.date } });
        this.booked = data.map(r => r.time);
      } catch (e) {
        console.error(e);
        this.error = 'Не удалось загрузить занятые слоты';
      } finally {
        this.loading = false;
        this.form.time = '';
      }
    },
    async submit() {
      if (!this.canSubmit) return;
      this.submitting = true;
      this.error = '';
      try {
        const payload = {
          client_id: this.$store.state.auth.user.id,
          service_id: this.form.service_id,
          date: this.form.date,
          time: this.form.time + ':00'  // добавляем секунды
        };
        await api.post('/appointments', payload);
        alert('Успешно записались!');
        this.resetDateTime();
      } catch (e) {
        console.error(e);
        this.error = e.response?.data?.message || 'Ошибка при записи';
      } finally {
        this.submitting = false;
      }
    }
  },
  async created() {
    if (!this.services.length) {
      await this.$store.dispatch('services/fetch');
    }
  }
};
</script>

<style scoped>
.appointment-container {
  max-width: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.field {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.field.date-picker button {
  width: 2rem;
}
.submit-btn {
  padding: 0.5rem;
  background: #42b983;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.submit-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}
.error {
  color: red;
}
</style>