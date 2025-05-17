<template>
  <table class="admin-table">
    <thead>
      <tr>
        <th>Название</th>
        <th>Цена</th>
        <th>Описание</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="service in services" :key="service.id">
        <template v-if="editingId === service.id">
          <td><input v-model="editForm.name" /></td>
          <td><input type="number" v-model.number="editForm.price" /></td>
          <td><input v-model="editForm.description" /></td>
          <td>
            <button @click="save(service.id)">💾</button>
            <button @click="cancel">✖</button>
          </td>
        </template>
        <template v-else>
          <td>{{ service.name }}</td>
          <td>{{ service.price }}</td>
          <td>{{ service.description }}</td>
          <td>
            <button @click="startEdit(service)">✏</button>
            <button @click="$emit('delete', service.id)">🗑</button>
          </td>
        </template>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    services: Array
  },
  data() {
    return {
      editingId: null,
      editForm: {}
    };
  },
  methods: {
    startEdit(service) {
      this.editingId = service.id;
      this.editForm = { ...service };
    },
    cancel() {
      this.editingId = null;
      this.editForm = {};
    },
    save(id) {
      this.$emit('update', { id, ...this.editForm });
      this.cancel();
    }
  }
};
</script>

<style scoped>
.admin-table {
  width: 100%;
  border-collapse: collapse;
}
.admin-table td, .admin-table th {
  padding: 8px;
  border: 1px solid #ddd;
}
.admin-table input {
  width: 100%;
}
</style>