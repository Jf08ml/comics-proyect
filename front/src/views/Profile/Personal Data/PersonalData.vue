<template>
    <div class="container-personal-data">
        <div class="section-title">
            <div class="profile-pic" :class="{ 'default-pic': !userData.userPhoto }" :style="userData.userPhoto && { 'background-image': 'url(' + userData.userPhoto + ')', 'background-size': 'cover', 'background-position': 'center'}">
                <button @click="showModal" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.7"
                        title="Change photo" color="black" /></button>
            </div>

            <UploadPhoto v-if="showModalUpload">
                <FormUploadPhoto :onShowModal="showModal" :onPhotoUpdated="onPhotoUpdated" />
            </UploadPhoto>
            <div>
                <p align="center">Section to modify personal data, account and password</p>
            </div>
        </div>
        <div class="section-content">
            <form class="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                <div class="div-form">
                    <input v-model="userData.name" type="text" placeholder="Full name *" />
                    <input v-model="userData.lastName" type="text" placeholder="Full last name *" />
                </div>
                <div class="div-form">
                    <input v-model="userData.country" type="text" placeholder="Country *" />
                    <input v-model="userData.city" type="text" placeholder="City *" />
                </div>
                <div class="div-form">
                    <input v-model="userData.nickname" type="text" placeholder="Nickname *" />
                    <input v-model="userData.email" type="text" placeholder="Email *" />
                </div>
                <div>
                    <button>Save data</button>
                </div>
            </form>
            <form class="form">
                <p style="margin-top: 15px;">Change your password</p>
                <div class="div-form" style="margin-top: 15px;">
                    <input type="password" placeholder="Current password" />
                    <input type="password" placeholder="New Password" />
                </div>
                <div>
                    <button>Change password</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import "@/assets/scss/profile/personaldata/personaldata.scss";

import UploadPhoto from './Modals/UploadPhoto.vue';
import FormUploadPhoto from './Forms/FormUploadPhoto.vue';

const authStore = useAuthStore();

const dataUser = ref(null);

onBeforeMount(async () => {
    try {
        const response =  await authStore.getUser();
        dataUser.value = response.user;

        userData.value.name = dataUser.value.name;
        userData.value.lastName = dataUser.value.lastName;
        userData.value.country = dataUser.value.country;
        userData.value.city = dataUser.value.city;
        userData.value.nickname = dataUser.value.nickname;
        userData.value.email = dataUser.value.email;
        userData.value.userPhoto = dataUser.value.userUrlPhoto;
    } catch (error) {
        console.error(error)
    }
})
const showModalUpload = ref(false);

const userData = ref({
        name: '',
        lastName: '',
        country: '',
        city: '',
        nickname: '',
        email: '',
        userPhoto: ''
});

const onPhotoUpdated = (newPhotoUrl) => {
    userData.value.userPhoto = newPhotoUrl;
}
const showModal = () => {
    showModalUpload.value = !showModalUpload.value
}

const onSubmit = async () => {
    try {
        await authStore.updateUser(userData.value);
        alert("data enviada")
    } catch (error) {
        console.error(error)
    }
};
</script>

<style scoped>
.profile-pic {
    width: 140px;
    height: 140px;
    border-radius: 20%;
    margin: 10px;
    overflow: hidden;
    position: relative;
    border: 1px solid black;
}

.profile-pic img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.default-pic::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('../../../../public/no-profile-photo.png');
    background-size: cover;
    background-position: center;
}

.upload-btn {
    position: absolute;
    border-radius: 50%;
    border: none;
    width: 27%;
    height: 27%;
    bottom: 5px;
    right: 5px;
    z-index: 1;
    cursor: pointer;
    box-shadow: 0px 0px 3px black;
}
</style>