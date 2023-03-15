<template>
<div style="width: 300px; height: 300px;"> 
    <img :src="props.urlViewPhoto" width="300" height="300">
</div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    urlViewPhoto: String,
});
</script>

<style scoped>

</style>