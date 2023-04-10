<template>
    <div class="containerContent">
        <div class="created-content">
            <span class="move-animation">Earn money! →</span>
            <button @click="showModal" class="btn-create-content">Create content</button>
        </div>
        <div class="post-content">
            <div class="search-content">
                <input class="input-search" type="text" placeholder="Search...">
            </div>
            <div class="post-created">
                <comicsCreated  @show-modal="showModal" />
            </div>
        </div>
        <Transition>
            <ModalDefault v-if="closeOrOpen" :onShowModal="showModal">
                <StepNextStep :isFunctionRunning="isFunctionRunning" :currentStep="currentStep" :nextStep="nextStep"
                    :prevStep="prevStep" :steps="steps" :onShowModal="showModal" :sendPost="sendPost"
                    :addComicPart="addComicPart" />
            </ModalDefault>
        </Transition>
    </div>
</template>
    
<script setup>
import { ref, toRaw } from 'vue'
import axios from 'axios';
import { useComicStore } from '@/store/comic'
import { notify } from "@kyvg/vue3-notification";

import ModalDefault from '@/components/Modals/ModalDefault.vue';
import StepNextStep from './Components/StepNextStep.vue'
import comicsCreated from './Components/comicsCreated.vue'


const comicStore = useComicStore()

const closeOrOpen = ref(false);

const isFunctionRunning = ref(false)

const addComicPart = ref(null)

const showModal = (id) => {
    closeOrOpen.value = !closeOrOpen.value

    addComicPart.value = id;

}

const currentStep = ref(0);
const steps = [
    { title: 'Upload photos', description: 'Upload your post and earn money according to the views.' },
    { title: 'Post Information', description: 'Add details and tags.' },
    { title: 'Preview', description: 'This is what your post will look like.' },
];

const nextStep = () => {
    if (currentStep.value < steps.length - 1) {
        currentStep.value++
    }
}

const prevStep = () => {
    if (currentStep.value > 0) {
        currentStep.value--
    }
}

const sendPost = async (uploadedImages, postInfoSaved) => {
    const urlImageSend = ref([])

    isFunctionRunning.value = true;

    for (let i = 0; i < toRaw(uploadedImages.length); i++) {
        const formData = new FormData();
        formData.append('image', uploadedImages[i].imagefile);
        formData.append('key', '0f13a40a6bc24a6565e327d5b4b5e26c')
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);
        const userPhotoUrl = response.data.data.url;
        urlImageSend.value.push(userPhotoUrl)
    }

    const postComplete = {
        title: postInfoSaved.title,
        description: postInfoSaved.description,
        typeContent: postInfoSaved.typeContent,
        keywords: postInfoSaved.chips,
        imagesPost: toRaw(urlImageSend.value),
        comicPart: addComicPart.value.isTrusted ? '' : addComicPart.value
    }
    try {
        const response = await comicStore.comicPost(postComplete);
        currentStep.value = 0;
        showModal()
        if (response.result === "success") {

            notify({
                type: "success",
                title: "Success",
                text: "Post uploaded",
            });
        }
        isFunctionRunning.value = false;
    } catch (error) {
        console.log(error)
    }
}
</script>
    
<style scoped>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}

.containerContent {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.created-content {
    height: 8%;
    width: 80%;
    padding: 10px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px;
}

@media screen and (max-width: 700px) {
    .created-content {
        width: 80%;
        height: 5%;
        transition: all 0.5s ease-in-out;
    }
}

.move-animation {
    font-size: 17px;
    animation: move 1s ease-in-out infinite alternate, color 2s linear infinite;
}

@keyframes move {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(30%);
    }
}

@keyframes color {
    0% {
        color: red;
    }

    25% {
        color: blue;
    }

    50% {
        color: green;
    }

    75% {
        color: purple;
    }

    100% {
        color: orange;
    }
}

@media screen and (max-width: 700px) {
    .move-animation {
        font-size: 17px;
        transition: all 0.5s ease-in-out;
    }
}

.btn-create-content {
    margin-top: 5px;
    border-radius: 10px;
    border: none;
    padding: 6px;
    background-color: #b81f59;
    margin: 10px;
    color: aliceblue;
    cursor: pointer;
    margin-left: 40px;
}

.btn-create-content:hover {
    transition: 0.2s ease;
    box-shadow: 0 0 8px #b81f59;
}

@media screen and (max-width: 900px) {
    .btn-create-content {
        font-size: 12px;
        transition: all 0.5s ease-in-out;
    }
}

.post-content {
    height: 85%;
    width: 90%;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
}

@media screen and (max-width: 700px) {
    .post-content {
        width: 90%;
        height: 85%;
        transition: all 0.5s ease-in-out;
    }
}

.search-content {
    height: 9%;
    width: 60%;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.input-search {
    width: 95%;
}

@media screen and (max-width: 700px) {
    .input-search {
        width: 100%;
    }
}

.post-created {
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 95%;
    height: 80%;
}
</style>