<template>
  <div class="modal-backdrop" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close" @click="$emit('close')">×</button>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UIModal'
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: #fff;
  padding: 1em;
  position: relative;
  border-radius: 4px;
  max-width: 90%;
}
.modal-content .close {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  background: transparent;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}
</style>