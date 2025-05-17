<template>
  <div>
    <form @submit.prevent="onRegister">
    <input v-model="name" placeholder="Имя" required />
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Пароль" required />
    <button>Зарегистрироваться</button>
  </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
  setup() {
    const store = useStore();
    const name = ref(''); const email = ref(''); const password = ref('');
    const onRegister = async () => {
      await store.dispatch('auth/register', { name: name.value, email: email.value, password: password.value });
      window.location = '/';
    };
    return { name, email, password, onRegister };
  }
};
</script>
