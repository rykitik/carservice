<template>
  <div>
    <h2>Вход</h2>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" v-model="email" required />
      <label for="password">Пароль:</label>
      <input type="password" v-model="password" required />
      <button type="submit">Войти</button>
    </form>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch('login', { email: this.email, password: this.password });
        this.$router.push('/');
      } catch (error) {
        this.error = 'Ошибка при входе. Проверьте email и пароль.';
      }
    }
  }
};
</script>
