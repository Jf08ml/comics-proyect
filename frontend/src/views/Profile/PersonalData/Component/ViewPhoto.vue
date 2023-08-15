<template>
<div style="width: 300px; height: 300px;"> 
    <img :src="userUrlPhoto" width="300" height="300">
</div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const userUrlPhoto = computed(() => authStore.$state.userImgProfile)

</script>

<style scoped>

</style>