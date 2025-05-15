<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <label for="name">Имя:</label>
      <input type="text" v-model="credentials.name" required>
      <br>
      <label for="email">Email:</label>
      <input type="email" v-model="credentials.email" required>
      <br>
      <label for="password">Пароль:</label>
      <input type="password" v-model="credentials.password" required>
      <br>
      <button type="submit">Зарегистрироваться</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      credentials: {
        name: '',
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async register() {
      try {
        await this.$store.dispatch('register', this.credentials);
        alert('Регистрация прошла успешно. Теперь вы можете войти.');
        this.$router.push('/login');
      } catch (error) {
        console.error(error);
        alert('Ошибка при регистрации.');
      }
    }
  }
};
</script>
