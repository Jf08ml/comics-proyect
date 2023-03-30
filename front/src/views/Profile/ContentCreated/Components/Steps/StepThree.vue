<template>
    <div style="background-color: #333;">
        <div class="show-images">
            <h1>{{ infoPost.title }}</h1>
            <div class="content-images" v-for="image in imagesPost" :key="image.name">
                <img style="border: 1px solid black;" :src="image.url" alt="Selected Image" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';

const props = defineProps({
    uploadedImages: Array,
    postInfoSaved: Object
})

const infoPost = ref(props.postInfoSaved);
const imagesPost = ref(props.uploadedImages);

</script>

<style scoped>
.show-images {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    max-height: 320px;
    overflow-y: auto;
}

.content-images {
    width: 100%;

    margin-top: 10px;
}
img {
    width: 60%;
    height: 100%;
    box-shadow: 0 0 5px gainsboro;
}
</style>