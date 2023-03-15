<template>
    <div class="container-personal-data">
        <div class="section-title">
            <div class="profile-pic" :class="profilePicClass" :style="profilePicStyle">
                <div @click="showModal('viewphoto')" class="view-photo">
                   <button >View photo</button>
                </div>
                <button @click="showModal('uploadphoto')" class="upload-btn"><v-icon name="md-addphotoalternate" scale="1.4"
                        title="Change photo" color="black" /></button>
            </div>
            
            <UploadPhoto v-if="showModalUpload" :onShowModal="closeModalFromComponent">
                <FormUploadPhoto v-if="showComponent" :onPhotoUpdated="onPhotoUpdated" />
                <ViewPhoto v-else  :urlViewPhoto="userData.userPhoto" />
            </UploadPhoto>
            <div>
                <p align="center">Section to modify personal data, account and password</p>
            </div>
        </div>
        <div class="section-content">
            <FormUserData :userData="userData" :onSubmit="onSubmit"/>
            <FormChangePassword />
        </div>
    </div>
</template>

<script setup>
import "@/assets/scss/profile/personaldata/personaldata.scss";
import { onBeforeMount, ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth';

import UploadPhoto from './Modals/ModalDefault.vue';
import FormUploadPhoto from './Forms/FormUploadPhoto.vue';
import ViewPhoto from './Component/ViewPhoto.vue'
import FormUserData from './Forms/FormUserData.vue'
import FormChangePassword from './Forms/FormChangePassword.vue';

const authStore = useAuthStore();

const dataUser = ref(null);
const showComponent = ref('');
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

//Se obtienen los datos a mostrar en el formulario
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
});

//Estilos para mostrar imagen default o imagen de perfil
const profilePicClass = computed(() => ({
  'default-pic': !userData.value.userPhoto,
}));

const profilePicStyle = computed(() => ({
  backgroundImage: userData.value.userPhoto ? `url(${userData.value.userPhoto})` : '',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

//Actualiza la url del perfil cuando se modifica
const onPhotoUpdated = (newPhotoUrl) => {
    userData.value.userPhoto = newPhotoUrl;
    showModal();
}


const closeModalFromComponent = () =>{
    showModalUpload.value = !showModalUpload.value
}

const showModal = (content) => {
    if(content === 'viewphoto'){
        showComponent.value = false;
        showModalUpload.value = !showModalUpload.value
    } else{
        showComponent.value = true;
        showModalUpload.value = !showModalUpload.value
    }   
}

//Formulario para enviar información del usuario
const onSubmit = async () => {
    try {
        await authStore.updateUser(userData.value);
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.view-photo {
    position: absolute;
    background-image: linear-gradient(to bottom right, rgba(0,0,0,0.5), rgba(255,255,255,0.5));
    color: azure;
    z-index: 1;
    display: none;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.view-photo button {
    background-color: white;
    color: #0d0d0d;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 0 5px rgba(0,0,0,0.5);
} .view-photo button:hover {
    background-color:azure;

}

.profile-pic:hover .view-photo{
    display: flex;
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
    background-color: rgba(255, 255, 255, 0.684);
    width: 25%;
    height: 25%;
    bottom: 5px;
    right: 5px;
    z-index: 1;
    cursor: pointer;
    box-shadow: 0px 0px 3px black;
} .upload-btn:hover {
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 0px 5px black;
}
</style>