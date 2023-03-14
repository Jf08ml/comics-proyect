<template>
    <div class="container-personal-data">
        <div class="section-title">
            <div class="profile-pic" :class="{ 'default-pic': !userPhoto }" :style="userPhoto && { 'background-image': 'url(' + userPhoto + ')', 'background-size': 'cover', 'background-position': 'center'}">
                <button @click="showModal" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.7"
                        title="Change photo" color="black" /></button>
            </div>

            <UploadPhoto v-if="showModalUpload">
                <FormUploadPhoto :onShowModal="showModal" />
            </UploadPhoto>

            <div>
                <p align="center">Section to modify personal data, account and password</p>
            </div>
        </div>
        <div class="section-content">
            <form class="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
                <div class="div-form">
                    <input v-model="name" type="text" placeholder="Full name *" />
                    <input v-model="lastName" type="text" placeholder="Full last name *" />
                </div>
                <div class="div-form">
                    <input v-model="country" type="text" placeholder="Country *" />
                    <input v-model="city" type="text" placeholder="City *" />
                </div>
                <div class="div-form">
                    <input v-model="nickname" type="text" placeholder="Nickname *" />
                    <input v-model="email" type="text" placeholder="Email *" />
                </div>
                <div>
                    <button>Save data</button>
                </div>
            </form>
            {{  }}
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
        name.value = dataUser.value.name;
        lastName.value = dataUser.value.lastName;
        country.value = dataUser.value.country;
        city.value = dataUser.value.city;
        nickname.value = dataUser.value.nickname;
        email.value = dataUser.value.email;
        userPhoto.value = dataUser.value.userUrlPhoto;
    } catch (error) {
        console.error(error)
    }
})
const showModalUpload = ref(false);

const name = ref('')
const lastName = ref('')
const country = ref('')
const city = ref('')
const nickname = ref('')
const email = ref('')
const userPhoto = ref(null)



const showModal = () => {
    showModalUpload.value = !showModalUpload.value
}

const onSubmit = async () => {
    const userData = {
        name: name.value,
        lastName: lastName.value,
        country: country.value,
        city: city.value,
        nickname: nickname.value,
        email: email.value,
    };
    try {
        await authStore.updateUser(userData);
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