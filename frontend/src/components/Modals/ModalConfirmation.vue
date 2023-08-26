<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-info">
        <h4>{{ props.title }}</h4>
        <p>{{ props.message }}</p>
      </div>
      <div class="modal-actions">
        <button class="btn-confirm" @click="props.confirmarModal">
          Confirmar
        </button>
        <button class="btn-cancel" @click="props.cancelarModal">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  message: String,
  confirmarModal: Function,
  cancelarModal: Function,
});
</script>

<style scoped>
p {
  color: #f5669c;
  font-size: 0.95rem;
}

h4 {
  font-size: 1.3rem;
  color: rgb(0, 0, 0);
}

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
  text-align: center;
  padding: 1rem;
  border-radius: 5px;
  width: 35%;
  height: auto;
}

.modal-info {
  padding-bottom: 1rem;
}

.modal-actions {
  display: flex;
  align-items: center; 
  justify-content: space-between;
  border-top: 1px solid #b81f59;
  padding-top: 1rem;
  padding-inline: 2rem;
}

.btn-confirm, .btn-cancel {
  font-size: 1rem;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 35%;
  text-align: center;
}

.btn-confirm {
  background-color: #b81f59;
  color: #fff;
}

.btn-confirm:hover {
  box-shadow: 0 0 5px #b81f59;
}

.btn-cancel {
  background-color: whitesmoke;
}

.btn-cancel:hover {
  box-shadow: 0 0 5px rgb(134, 133, 133);
}

/* Media Query para tablets y otros dispositivos medianos */
@media (max-width: 768px) {
  .modal-content {
    width: 80%;
  }
}
</style>

