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
                <div v-for="image in selectedFiles" :key="image.name">
                    <div style="position: relative;">
                        <button @click="deleteImg(image.name)"
                            style="background: transparent; border: none; position: absolute; color: red; font-weight: bolder; cursor: pointer; font-size: 15px;">x</button>
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
import { ref, defineProps, watch } from 'vue'


const props = defineProps({
    saveFiles: Function,
    selectedFiles: Array,
})

watch(() => props.selectedFiles, (newValue) => {
    selectedFiles.value = newValue;
});

const existImgs = ref(props.selectedFiles)

if (existImgs.value.length > 0) {
    selectedFiles.value = existImgs;
}
const selectedFiles = ref([]);

const deleteImg = async (name) => {
    selectedFiles.value.splice(name, 1);
}


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

const onSubmit = async () => {
    await props.saveFiles(selectedFiles.value)
};
</script>

<style scoped>
.selected-images {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    max-width: 100%;
    box-shadow: 0 0 5px gainsboro;
}

.selected-images>div {
    width: 90%;
    display: inline-block;
    white-space: nowrap;
}

.selected-images img {
    width: 100px;
    height: 100px;
    margin: 10px;
    object-fit: cover;
}

@media screen and (max-width: 700px) {
    .selected-images img {
        width: 60px;
        height: 60px;
        margin: 5px;
        object-fit: cover;
    }
}
</style>
