<template>
  <div>
    <h2>Услуги</h2>
    <ul>
      <li v-for="s in services" :key="s.id">{{ s.name }} — {{ s.price }} руб.</li>
    </ul>
  </div>
</template>
<script>
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();
    onMounted(() => store.dispatch('services/fetch'));
    const services = computed(() => store.state.services.list);
    return { services };
  }
};
</script>
