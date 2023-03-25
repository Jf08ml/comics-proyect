<template>
    <div>
        <div class="modal-header">
            <h2>Creating content</h2>
        </div>
        <div class="modal-body">
            <div class="modal-step" v-if="props.currentStep === 0">
                <h3>{{ props.steps[0].title }}</h3>
                <p>{{ props.steps[0].description }}</p>
                <button @click="props.nextStep">Siguiente</button>
            </div>
            <div class="modal-step" v-if="props.currentStep === 1">
                <h3>{{ props.steps[1].title }}</h3>
                <p>{{ props.steps[1].description }}</p>
                <button @click="props.nextStep">Siguiente</button>
                <button @click="props.prevStep">Anterior</button>
            </div>
            <div class="modal-step" v-if="props.currentStep === 2">
                <h3>{{ props.steps[2].title }}</h3>
                <p>{{ props.steps[2].description }}</p>
                <button @click="props.onShowModal">Finalizar</button>
                <button @click="props.prevStep">Anterior</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    currentStep: Number,
    steps: Array,
    onShowModal: Function,
    nextStep: Function,
    prevStep: Function
})
</script>

<style scoped></style>