<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/services">Услуги</router-link>
      <router-link to="/appointments" v-if="isAuth">Запись</router-link>
      <router-link to="/admin" v-if="isAdmin">Админка</router-link>

      <span v-if="isAuth">{{ user.name }}</span>
      <router-link to="/login" v-if="!isAuth">Вход</router-link>
      <router-link to="/register" v-if="!isAuth">Регистрация</router-link>

      <button v-if="isAuth" @click="logout">Выход</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState('auth', ['user']),
    ...mapGetters('auth', ['isAuth', 'isAdmin'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
};
</script>

<style>
nav {
  padding: 1rem;
  background: #f5f5f5;
}
nav a {
  margin-right: 1rem;
}
</style>