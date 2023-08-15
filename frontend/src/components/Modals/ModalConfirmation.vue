<template>
    <div class="modal">
        <div class="modal-content">
            <h2> {{ props.title }}</h2>
            <p>{{ props.message }}</p>
            <button class="btn-confirm" @click="props.confirmarModal">Confirmar</button>
            <button class="btn-cancel" @click="props.cancelarModal">Cancelar</button>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    title: String,
    message: String,
    confirmarModal: Function,
    cancelarModal: Function
})

</script>

<style scoped>

p {
    color: blue;
    font-size: 15px;
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
    padding: 20px;
    border-radius: 5px;
    max-width: 500px;
}

.btn-confirm {
    border-radius: 10px;
    color: #fff;
    background-color: darkgreen;
    border: gray;
    margin: 10px;
    padding: 8px;
    cursor: pointer;
}

.btn-confirm:hover {
    box-shadow: 0 0 5px darkgreen;
}

.btn-cancel {
    border-radius: 10px;
    border: gray;
    background-color: whitesmoke;
    margin: 10px;
    padding: 8px;
    cursor: pointer;
}
.btn-cancel:hover {
    box-shadow: 0 0 5px darkred;
}
</style>
  