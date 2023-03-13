<template>
    <div class="container-personal-data">
        <div class="section-title">
            <div class="profile-pic" :class="{ 'default-pic': !userPhoto }">
                <button @click="showModal" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.7"
                        title="Change photo" color="black" /></button>
                <UploadPhoto v-if="showModalUpload">
                        <div class="button-close-modal"><button class="button-close" @click="showModal">X</button></div>
                        <form class="form-modal" enctype="multipart/form-data" @submit.prevent="onSubmit">
                            <div class="div-form-upload">
                                <label align="center" for="imagen" style="margin: auto;">
                                    Profile photo
                                    <v-icon name="hi-information-circle" scale="1" title="Verificación" />
                                </label>
                                <input @change="onFileChange" type="file" id="imagen" name="imagen"
                                    aria-label="Archivo" />
                            </div>
                            <div class="buttons-modals">
                                <button class="button-save">Save</button>
                            </div>
                        </form>
                </UploadPhoto>
            </div>
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
                <!-- <div class="div-form-upload">
                    <label align="center" for="imagen" style="margin: auto;">
                        Profile photo
                        <v-icon name="hi-information-circle" scale="1" title="Verificación" style="cursor: pointer" />
                    </label>
                    <input @change="onFileChange" class="inputfile" type="file" id="imagen" name="imagen"
                        aria-label="Archivo" />
                </div> -->
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
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import "@/assets/scss/profile/personaldata/personaldata.scss";

import UploadPhoto from './Modals/UploadPhoto.vue';

const authStore = useAuthStore();

const showModalUpload = ref(false);

const name = ref('Juan')
const lastName = ref('Mosquera')
const country = ref('Colombia')
const city = ref('Neiva')
const nickname = ref('chikimalvin')
const email = ref('chikimalvin@mail.com')
const userPhoto = ref(null)

// const onFileChange = (e) => {
//     const file = e.target.files[0]
//     userPhoto.value = file;
// }

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
        userPhoto: userPhoto.value
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
    width: 150px;
    height: 150px;
    border-radius: 20%;
    overflow: hidden;
    position: relative;
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
    background-image: url('http://www.losolivosbogota.com/sites/salas/form/imagenes/sin_imagen.png');
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