<template>
    <h1 style="color:white;">All the most viewed</h1>
</template>

<script setup>
import { useAuthStore } from '@/store/auth';
import { onBeforeMount } from 'vue'

const authStore = useAuthStore();

onBeforeMount(async () => {
    try {
        await authStore.getUser();
    } catch (error) {
        console.error(error)
    }
});
</script>
