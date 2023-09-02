<template>
    <div>
        <form class="form-modal" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="div-form-upload">
                <label align="center" for="imagen" style="margin: auto;">
                    Profile photo
                    <v-icon name="hi-information-circle" scale="1" title="Verificación" />
                </label>
                <input class="input-modal" @change="onFileChange" type="file" multiple id="imagen" name="imagen" aria-label="Archivo" />
            </div>
            <div class="buttons-modals">
                <button class="button-save">Save</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps} from 'vue';

const props = defineProps({
    onSubmitPhoto: Function,
})

const imageUrl = ref(null)
const imageFile = ref(null)

const onFileChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        imageUrl.value = reader.result;
        imageFile.value = file;
    }
};

const onSubmit = () => {
    const toRawImageFile = imageFile.value
    props.onSubmitPhoto(toRawImageFile)
}
</script>

<style lang="scss"></style>
