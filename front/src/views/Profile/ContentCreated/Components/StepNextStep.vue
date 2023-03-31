<template>
    <div class="container-sns">

        <div class="modal-body">
            <div class="modal-step" v-if="props.currentStep === 0">
                <div class="step-content">
                    <h3>{{ props.steps[0].title }}</h3>
                    <p>{{ props.steps[0].description }}</p>
                    <div style="box-shadow: 0 0 3px gainsboro; margin-top: 30px;">
                        <StepOne :saveFiles="saveFiles" :uploadedImages="uploadedImages" />
                    </div>
                </div>
                <div class="change-step">
                    <div>
                    </div>
                    <div class="content-btn-change">
                        <button :disabled="uploadedImages.length > 0 ? nextDisabled = false : nextDisabled = true"
                            class="btn-change" @click="props.nextStep"><v-icon name="fa-arrow-right" scale="2" title="Next"
                                color="#b81f59" /></button>
                    </div>
                </div>
            </div>
            <div class="modal-step" v-if="props.currentStep === 1">
                <div class="step-content">
                    <h3>{{ props.steps[1].title }}</h3>
                    <p>{{ props.steps[1].description }}</p>
                    <div style="box-shadow: 0 0 3px gainsboro; margin-top: 30px;">
                        <StepTwo :saveInfo="saveInfo" />
                    </div>
                </div>
                <div class="change-step">
                    <div class="content-btn-change">
                        <button class="btn-change" @click="props.prevStep"><v-icon name="fa-arrow-left" scale="2"
                                title="Previous" color="#b81f59" /></button>
                    </div>
                    <div class="content-btn-change">
                        <button
                            :disabled="Object.keys(postInfoSaved).length === 0 ? nextDisabled = true : nextDisabled = false"
                            class="btn-change" @click="props.nextStep"><v-icon name="fa-arrow-right" scale="2" title="Next"
                                color="#b81f59" /></button>
                    </div>
                </div>
            </div>
            <div class="modal-step" v-if="props.currentStep === 2">
                <div class="step-content">
                        <h3>{{ props.steps[2].title }}</h3>
                    <div style="height: 90%;">
                        <StepThree style="height: 100%;" :uploadedImages="uploadedImages" :postInfoSaved="postInfoSaved" />
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
import { defineProps, ref } from 'vue';
import StepOne from './Steps/StepOne';
import StepTwo from './Steps/StepTwo.vue';
import StepThree from './Steps/StepThree.vue'

const props = defineProps({
    currentStep: Number,
    steps: Array,
    onShowModal: Function,
    nextStep: Function,
    prevStep: Function,
})

const nextDisabled = ref(true)


//Imagenes cargadas
const uploadedImages = ref([]);

//Informacion cargada
const postInfoSaved = ref({})

const saveFiles = (files) => {
    console.log(files)
    uploadedImages.value = files;
}

const saveInfo = (info) => {
    postInfoSaved.value = info;
}

const submitPost = () => {
    const postComplete = {
        title: postInfoSaved.value.title,
        description: postInfoSaved.value.description,
        typeContent: postInfoSaved.value.typeContent,
        keywords: [postInfoSaved.value.keywords.split(",")],
        imagesPost: uploadedImages.value
    }
    console.log(postComplete)

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
}</style>