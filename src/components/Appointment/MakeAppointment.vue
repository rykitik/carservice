<template>
  <form @submit.prevent="submit">
    <select v-model="form.service_id" required>
      <option value="" disabled>Выберите услугу</option>
      <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
    </select>
    <input type="datetime-local" v-model="form.datetime" required />
    <button>Записаться</button>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useAuth } from '@/composables/useAuth';
import { useServices } from '@/composables/useServices';

const { user, isAuth } = useAuth();
const { services }      = useServices();
const store = useStore();

const form = ref({ service_id: '', datetime: '' });

async function submit() {
  if (!isAuth.value) return alert('Войдите в систему');
  const [date, time] = form.value.datetime.split('T');
  await store.dispatch('appointments/create', {
    client_id: user.value.id,
    service_id: form.value.service_id,
    date, time
  });
  alert('Готово');
}
</script>