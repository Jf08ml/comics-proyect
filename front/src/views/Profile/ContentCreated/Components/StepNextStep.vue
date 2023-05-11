<template>
    <div class="container-sns">

        <div class="modal-body">
            <div class="modal-step" v-if="props.currentStep === 0">
                <div class="step-content">
                    <h3>{{ props.steps[0].title }}</h3>
                    <p>{{ props.steps[0].description }}</p>
                    <p style="background-color: beige;" v-if="props.addComicPart._id">You are adding a part to the
                        following comic: <b>{{
                            props.addComicPart.nameSerie }}</b></p>
                    <div class="step">
                        <StepOne :saveFiles="saveFiles" :uploadedImages="uploadedImages" />
                    </div>
                </div>
                <div class="change-step">
                    <div>
                    </div>
                    <div class="content-btn-change">
                        <button v-if="nextStepTwo" class="btn-change" @click="props.nextStep"><v-icon name="fa-arrow-right"
                                scale="2" title="Next" color="#b81f59" /></button>
                    </div>
                </div>
            </div>
            <div class="modal-step" v-if="props.currentStep === 1">
                <div class="step-content">
                    <h3>{{ props.steps[1].title }}</h3>
                    <p>{{ props.steps[1].description }}</p>
                    <div class="step">
                        <StepTwo :saveInfo="saveInfo" />
                    </div>
                </div>
                <div class="change-step">
                    <div class="content-btn-change">
                        <button class="btn-change" @click="props.prevStep"><v-icon name="fa-arrow-left" scale="2"
                                title="Previous" color="#b81f59" /></button>
                    </div>
                    <div class="content-btn-change">
                        <button v-if="nextStepThree" class="btn-change" @click="props.nextStep"><v-icon
                                name="fa-arrow-right" scale="2" title="Next" color="#b81f59" /></button>
                    </div>
                </div>
            </div>
            <div class="modal-step" v-if="props.currentStep === 2">
                <div class="step-content">
                    <h3>{{ props.steps[2].title }}</h3>
                    <p></p>
                    <div class="step">
                        <StepThree style="height: 100%;" :uploadedImages="uploadedImages" :postInfoSaved="postInfoSaved" />
                        <div class="loading-bar" v-if="isLoading">
                        </div>
                        <span v-if="isLoading">The content is being uploaded, the waiting time will depend on the number
                            of images, please wait</span>
                    </div>
                </div>
                <div class="change-step">
                    <div class="content-btn-change">
                        <button class="btn-change" @click="props.prevStep"><v-icon name="fa-arrow-left" scale="2"
                                title="Previous" color="#b81f59" /></button>
                    </div>
                    <div class="content-btn-change">
                        <button @click="submitPost" class="btn-change-save"><v-icon name="io-send" scale="2" title="Save"
                                color="green" /></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref, toRaw, watchEffect } from 'vue';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo.vue';
import StepThree from './Steps/StepThree.vue'


const props = defineProps({
    currentStep: Number,
    steps: Array,
    nextStep: Function,
    prevStep: Function,
    sendPost: Function,
    isFunctionRunning: Boolean,
    addComicPart: Object
})

const isLoading = ref(true); // Añade una variable reactiva para controlar la visibilidad de la barra de carga

// Utiliza un watcher para escuchar cambios en isFunctionRunning
watchEffect(() => {
    isLoading.value = props.isFunctionRunning;
})

const nextStepTwo = ref(false)
const nextStepThree = ref(false);

//Imagenes cargadas
const uploadedImages = ref([]);

//Informacion cargada
const postInfoSaved = ref({})

const saveFiles = (files) => {
    uploadedImages.value = toRaw(files);
    nextStepTwo.value = true;
}

const saveInfo = (info) => {
    postInfoSaved.value = info;
    nextStepThree.value = true;
}

const submitPost = async () => {
    await props.sendPost(uploadedImages.value, postInfoSaved.value)
}

</script>

<style scoped>
.container-sns {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    width: 90vw;
    height: 90vh;
}

h3 {
    color: hsla(0, 0%, 0%, .9);
    font: normal Varela Round, sans-serif;
    text-align: center;
    animation: move linear 2000ms infinite;
}

@keyframes move {
    0% {
        text-shadow: -1px 1px 0 hsla(180, 100%, 50%, 1);
    }

    25% {
        text-shadow: 1px 1px 0 hsla(0, 100%, 50%, 1);
    }

    50% {
        text-shadow: 1px -1px 0 hsla(180, 100%, 50%, 1);
    }

    75% {
        text-shadow: -1px -1px 0 hsla(0, 100%, 50%, 1);
    }

    100% {
        text-shadow: 4px -4px 0 hsla(0, 100%, 50%, 1),

    }
}


.loading-bar {
    width: 100%;
    height: 8px;
    background-color: #4caf50;
    animation: loading 2s linear infinite;
}

@keyframes loading {
    0% {
        width: 0%;
    }

    100% {
        width: 100%;
    }
}


.modal-body {
    height: 100%;
    width: 100%;
}

.modal-step {
    height: 100%;
    width: 100%;
}

.step-content {
    text-align: center;
    height: 85%;
    width: 100%;
}

.step {
    box-shadow: 0 0 3px gainsboro;
    margin-top: 30px;
    height: 88%;
}

.change-step {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 15%;
    width: 100%;
}

.content-btn-change {
    margin-inline: 15px;
}

.btn-change {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    border-radius: 50%;
}

.btn-change:hover {
    box-shadow: 0 0 5px #b81f59;
}

.btn-change-save {
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
}

.btn-change-save:hover {
    box-shadow: 0 0 5px #1fb82c;
}
</style>