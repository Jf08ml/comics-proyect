<template>
  <div class="modal">
    <div class="modal-content">
      <div class="button-close-modal"><button class="button-close" @click="props.onShowModal"><v-icon
            name="md-close-sharp" scale="1" title="CLose" color="red" animation="pulse" hover speed="fast"/></button></div>
      <slot>
      </slot>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  onShowModal: Function,
});
</script>
  
<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.modal-content {
  background-color: #fff;
  padding: 2px;
  border-radius: 5px;
  max-width: 500px;
}
</style>
  