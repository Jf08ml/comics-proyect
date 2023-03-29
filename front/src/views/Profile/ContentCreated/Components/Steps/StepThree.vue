<template>
    <div>
        <div>
            <h1>{{ infoPost.title }}</h1>
        </div>
        <div>
            {{ imagesPost }}
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

<style scoped></style>