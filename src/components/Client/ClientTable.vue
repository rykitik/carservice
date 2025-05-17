<template>
  <table class="service-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Цена</th>
        <th>Описание</th>
        <th>Действия</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="service in services" :key="service.id">
        <template v-if="editedService?.id === service.id">
          <td><input v-model="editedService.name" /></td>
          <td><input type="number" v-model.number="editedService.price" /></td>
          <td><textarea v-model="editedService.description"></textarea></td>
          <td>
            <button @click="saveEdit(service.id)">💾</button>
            <button @click="cancelEdit">❌</button>
          </td>
        </template>
        <template v-else>
          <td>{{ service.name }}</td>
          <td>{{ service.price }}</td>
          <td>{{ service.description }}</td>
          <td>
            <button @click="startEdit(service)">✎</button>
            <button @click="$emit('delete', service.id)">🗑</button>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
import axios from '@/axios';

export default {
  props: {
    services: Array
  },
  data() {
    return {
      editedService: null
    };
  },
  methods: {
    startEdit(service) {
      this.editedService = { ...service };
    },
    cancelEdit() {
      this.editedService = null;
    },
    async saveEdit(id) {
      try {
        await axios.put(`/services/${id}`, this.editedService);
        this.$emit('updated');
        this.editedService = null;
      } catch (err) {
        console.error('Ошибка редактирования:', err);
      }
    }
  }
};
</script>