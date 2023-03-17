<template>
    <div class="profile-pic-profile" :class="props.profilePicClass" :style="props.profilePicStyle">
        <div @click="props.onShowModal('viewphoto')" class="view-photo">
            <button class="nav-button-icone">View photo</button>
        </div>
        <button @click="props.onShowModal('uploadphoto')" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.4"
                title="Change photo" color="black" />
        </button>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    onShowModal: Function,
    profilePicClass: Object,
    profilePicStyle: Object

})
</script>

<style scoped></style>