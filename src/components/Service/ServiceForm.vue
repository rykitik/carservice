<template>
  <form class="service-form" @submit.prevent="onSubmit">
    <div>
      <label>Название услуги</label>
      <input v-model="local.name" required />
    </div>
    <div>
      <label>Цена</label>
      <input type="number" v-model.number="local.price" required />
    </div>
    <div>
      <label>Описание</label>
      <textarea v-model="local.description" />
    </div>
    <button type="submit">{{ isEditing ? 'Сохранить' : 'Добавить' }}</button>
    <button type="button" v-if="isEditing" @click="$emit('cancel')">Отмена</button>
  </form>
</template>

<script>
export default {
  name: 'ServiceForm',
  props: {
    service: { type: Object, default: null }
  },
  data() {
    return {
      local: this.service ? { ...this.service } : { name: '', price: 0, description: '' }
    };
  },
  computed: {
    isEditing() {
      return !!this.service;
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
.service-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>