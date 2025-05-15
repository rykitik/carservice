<template>
  <div id="app">
    <nav>
      <router-link to="/">Главная</router-link>
      <router-link to="/make-appointment">Запись</router-link>
      <router-link to="/admin" v-if="user && user.role === 'admin'">Админка</router-link>
      <span v-if="user">{{ user.name }}</span>
      <router-link to="/login" v-if="!user">Вход</router-link>
      <router-link to="/register" v-if="!user">Регистрация</router-link>
      <button @click="logout" v-if="user">Выход</button>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push('/login');
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: flex-end;
}

nav a {
  margin: 0 15px;
  text-decoration: none;
  color: #42b983;
}

nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
