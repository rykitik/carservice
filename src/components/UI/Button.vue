<template>
  <button class="ui-button" :type="type" @click="$emit('click')">
    <slot/>
  </button>
</template>

<script>
export default {
  name: 'UIButton',
  props: {
    type: { type: String, default: 'button' }
  }
};
</script>

<style scoped>
.ui-button {
  padding: 0.5em 1em;
  border: none;
  background: #42b983;
  color: #fff;
  cursor: pointer;
  border-radius: 4px;
}
.ui-button:hover {
  background: #369f6e;
}
</style>