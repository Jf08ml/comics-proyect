<template>
    <div>
        <form class="form-modal" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="div-form-upload">
                <label align="center" for="imagen" style="margin: auto;">
                    Upload the images
                    <v-icon name="hi-information-circle" scale="1" title="Verificación" />
                </label>
                <input class="input-modal"  @change="onFileChange" type="file" multiple id="imagen" name="imagen"
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
                <button :disabled="blockButton" class="button-save">Save</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps, onMounted, toRaw } from 'vue';
import imageCompression from 'browser-image-compression';

const props = defineProps({
  saveFiles: Function,
  uploadedImages: Array,
});

const selectedFiles = ref([]);

const blockButton = ref(true);

onMounted(() => {
  selectedFiles.value = props.uploadedImages;
});

const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // Tamaño máximo en MB, ajusta según tus necesidades
    maxWidthOrHeight: 1920, // Ancho o alto máximo en píxeles, ajusta según tus necesidades
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (error) {
    console.error('Error al comprimir la imagen:', error);
    return file;
  }
};

const onFileChange = async (event) => {
  const files = event.target.files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const compressedFile = await compressImage(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      selectedFiles.value.push({
        imagefile: compressedFile,
        url: e.target.result,
      });
    };
    reader.readAsDataURL(compressedFile);
  }
  blockButton.value = false;
};

const onSubmit = () => {
  const toRawImages = toRaw(selectedFiles.value);
  props.saveFiles(toRawImages);
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
</style>
