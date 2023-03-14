<template>
<div style="width: 300px; height: 300px;"> 
    <div class="button-close-modal"><button class="button-close" @click="props.onShowModal">X</button></div>
    <img :src="props.urlViewPhoto" width="300" height="300">
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    urlViewPhoto: String,
    onShowModal: Function,
});
</script>

<style scoped>

</style>