<template>
    <div>
        <form class="form-modal" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="div-form-upload">
                <label align="center" for="imagen" style="margin: auto;">
                    Upload the images
                    <v-icon name="hi-information-circle" scale="1" title="Verificación" />
                </label>
                <input class="input-modal" @change="onFileChange" type="file" multiple id="imagen" name="imagen"
                    aria-label="Archivo" />
            </div>
            <div class="selected-images">
                <div class="image-row" v-for="image in selectedFiles" :key="image.name">
                    <div >
                        <img style="border: 1px solid black" :src="image.url" alt="Selected Image" />
                    </div>
                </div>
            </div>
            <div class="buttons-modals">
                <button class="button-save">Save</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps, onBeforeMount } from 'vue'

const props = defineProps({
    saveFiles: Function,
    uploadedImages: Array
})

const selectedFiles = ref([]);

onBeforeMount(() => {
    selectedFiles.value = props.uploadedImages
})

const onFileChange = (event) => {
    const files = event.target.files;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = (e) => {
            selectedFiles.value.push({
                name: file.name,
                url: e.target.result,
            });
        };

        reader.readAsDataURL(file);
    }
};

const onSubmit = () => {
    props.saveFiles(selectedFiles.value)
};
</script>

<style scoped>
.selected-images {
    display: grid;
    grid-template-columns: repeat(20, 1fr);
    overflow-y: auto;
    justify-items: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-height: 220px;
    box-shadow: 0 0 5px gainsboro;
}

.selected-images .image-row {
    display: inline-block;
    white-space: nowrap;
    margin: 5px;
}

.selected-images img {
    width: 100%;
    height: 100%;
}

@media screen and (max-width: 700px) {
    .selected-images img {
        width: 100%;
        height: 100%;
    }
}
</style>
