<template>
  <div>
    <h2>Услуги</h2>
    <ul>
      <li v-for="service in services" :key="service.id">{{ service.name }} - {{ service.price }} руб.</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ServiceList',
  data() {
    return {
      services: []
    };
  },
  created() {
    this.fetchServices();
  },
  methods: {
    async fetchServices() {
      try {
        const response = await this.$store.dispatch('fetchServices');
        this.services = this.$store.state.services;
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
