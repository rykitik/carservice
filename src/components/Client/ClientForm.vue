<template>
  <form class="client-form" @submit.prevent="onSubmit">
    <div>
      <label>Имя</label>
      <input v-model="local.name" required />
    </div>
    <div>
      <label>Email</label>
      <input type="email" v-model="local.email" required />
    </div>
    <div v-if="isEditing">
      <label>Новый пароль</label>
      <input type="password" v-model="local.password" />
    </div>
    <div>
      <label>Роль</label>
      <select v-model="local.role" required>
        <option value="user">Пользователь</option>
        <option value="admin">Админ</option>
      </select>
    </div>
    <button type="submit">{{ isEditing ? 'Сохранить' : 'Добавить' }}</button>
    <button type="button" v-if="isEditing" @click="$emit('cancel')">Отмена</button>
  </form>
</template>

<script>
export default {
  name: 'ClientForm',
  props: {
    client: { type: Object, default: null }
  },
  data() {
    return {
      local: this.client
        ? { ...this.client, password: '' }
        : { name: '', email: '', role: 'user', password: '' }
    };
  },
  computed: {
    isEditing() {
      return !!this.client;
    }
  },
  methods: {
    onSubmit() {
      this.$emit(this.isEditing ? 'update' : 'create', this.local);
    }
  }
};
</script>

<style scoped>
.client-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>