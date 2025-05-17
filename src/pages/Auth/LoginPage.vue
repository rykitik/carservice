<template>
  <div>
    <form @submit.prevent="onLogin">
      <input v-model="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Пароль" required/>
      <button>Войти</button>
    </form>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';
export default {
  setup() {
    const store = useStore();
    const email = ref('');
    const password = ref('');
    const onLogin = async () => {
      await store.dispatch('auth/login', { email: email.value, password: password.value });
      window.location = '/';
    };
    return { email, password, onLogin };
  }
};
</script>
