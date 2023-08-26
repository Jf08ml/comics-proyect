<template>
  <div class="loading-modal">
    <div class="modal-content">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script setup>
// No need for props since this is just a loading modal.
</script>

<style scoped>
.modal-content {
  background-color: transparent;
  text-align: center;
  padding-inline: 15px;
  padding-block: 15px;
  border-radius: 5px;
  max-width: 500px;
}

.loading-modal {
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

.spinner {
  border: 12px solid rgba(255, 255, 255, 0.3); 
  border-radius: 50%;
  border-top: 12px solid rgb(255, 0, 140); 
  width: 100px;
  height: 100px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
