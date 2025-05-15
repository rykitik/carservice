<template>
  <div>
    <h2>Клиенты</h2>
    <ul>
      <li v-for="client in clients" :key="client.id">{{ client.name }} - {{ client.email }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ClientList',
  data() {
    return {
      clients: []
    };
  },
  created() {
    this.fetchClients();
  },
  methods: {
    async fetchClients() {
      try {
        const response = await this.$store.dispatch('fetchClients');
        this.clients = this.$store.state.clients;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
