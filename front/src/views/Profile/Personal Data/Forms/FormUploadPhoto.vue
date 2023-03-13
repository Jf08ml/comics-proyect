<template>
    <div class="button-close-modal"><button class="button-close" @click="props.onShowModal">X</button></div>
    <form class="form-modal" enctype="multipart/form-data" @submit.prevent="onSubmit">
        <div class="div-form-upload">
            <label align="center" for="imagen" style="margin: auto;">
                Profile photo
                <v-icon name="hi-information-circle" scale="1" title="Verificación" />
            </label>
            <input @change="onFileChange" type="file" id="imagen" name="imagen" aria-label="Archivo" />
        </div>
        <div class="buttons-modals">
            <button class="button-save">Save</button>
        </div>
    </form>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/store/auth';

const props = defineProps({
    onShowModal: Function
});

const authStore = useAuthStore();

const imageUrl = ref(null)
const imageFile = ref(null)

const userPhotoUrl = ref('')

const onFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imageUrl.value = reader.result;
        imageFile.value = file;
    }
};

const onSubmit = async () => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile.value);
        formData.append('key', '167d8fe99b87334cc6f7f5d26ab77027')
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);
        userPhotoUrl.value = response.data.data.url_viewer;
        try {
            await authStore.updateProfilePhoto(userPhotoUrl.value)
            alert("data enviada")
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
};


</script>

<style scoped></style>
