<template>
  <div>
    <h2>Клиенты</h2>
    <ClientForm v-for="c in clients" :key="c.id" :client="c" />
  </div>
</template>
<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import ClientForm from '@/components/Client/ClientForm.vue';
export default {
  components: { ClientForm },
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('clients/fetch'));
    const clients = computed(() => store.state.clients.list);
    return { clients };
  }
};
</script>