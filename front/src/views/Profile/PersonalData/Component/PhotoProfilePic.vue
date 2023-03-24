<template>
    <div class="profile-pic-profile" :class="props.profilePicClass" :style="props.profilePicStyle">
        <div @click="authStore.$state.userImgProfile ? props.onShowModal('viewphoto') : none" class="view-photo">
            <button v-if="authStore.$state.userImgProfile" class="nav-button-icone">View photo</button>
        </div>
        <button @click="props.onShowModal('uploadphoto')" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.4"
                title="Change photo" color="black" />
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useAuthStore } from '@/store/auth';

const authStore = useAuthStore();

const props = defineProps({
    onShowModal: Function,
    profilePicClass: Object,
    profilePicStyle: Object

})
</script>

<style scoped></style>