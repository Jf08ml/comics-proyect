<template>
    <div class="container-personal-data">
        <div class="section-title">
            <PhotoProfilePic :onShowModal="showModal" :profilePicClass="profilePicClass"  :profilePicStyle="profilePicStyle"/>

            <ModalDefault v-if="showModalUpload" :onShowModal="closeModalFromComponent">
                <FormUploadPhoto v-if="showComponent" :onSubmitPhoto="onSubmitPhoto" />
                <ViewPhoto v-else :urlViewPhoto="userData.userPhoto" />
            </ModalDefault>
            <div>
                <p align="center">Section to modify personal data, account and password</p>
            </div>
        </div>
        <div class="section-content">

            <FormUserData :userData="userData" :onSubmitUserInformation="onSubmitUserInformation" />

            <FormChangePassword :onSubmitNewPassword="onSubmitNewPassword"/>

        </div>
    </div>
</template>

<script setup>
import "@/assets/scss/profile/personaldata/personaldata.scss";
import { onBeforeMount, ref, computed } from 'vue'
import { useAuthStore } from '@/store/auth';
import axios from 'axios';
import ModalDefault from '../../../components/Modals/ModalDefault.vue';
import FormUploadPhoto from './Forms/FormUploadPhoto.vue';
import ViewPhoto from './Component/ViewPhoto.vue'
import FormUserData from './Forms/FormUserData.vue'
import FormChangePassword from './Forms/FormChangePassword.vue';
import PhotoProfilePic from './Component/PhotoProfilePic.vue'

const authStore = useAuthStore();

const userUrlPhoto = computed(() => authStore.$state.userImgProfile)
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
        const response = await authStore.getUser();
        dataUser.value = response.user;
        userData.value.name = dataUser.value.name;
        userData.value.lastName = dataUser.value.lastName;
        userData.value.country = dataUser.value.country;
        userData.value.city = dataUser.value.city;
        userData.value.nickname = dataUser.value.nickname;
        userData.value.email = dataUser.value.email;
    } catch (error) {
        console.error(error)
    }
});

//Estilos para mostrar imagen default o imagen de perfil
const profilePicClass = computed(() => ({
    'default-pic': !userUrlPhoto.value,
}));

const profilePicStyle = computed(() => ({
    backgroundImage: userUrlPhoto.value ? `url(${userUrlPhoto.value})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));


const closeModalFromComponent = () => {
    showModalUpload.value = !showModalUpload.value
}

const showModal = (content) => {
    if (content === 'viewphoto') {
        showComponent.value = false;
        showModalUpload.value = !showModalUpload.value
    } else {
        showComponent.value = true;
        showModalUpload.value = !showModalUpload.value
    }
}

//Formulario para enviar información del usuario
const onSubmitUserInformation = async (userInformation) => {
    try {
        const response = await authStore.updateUser(userInformation.value);
        return response;
    } catch (error) {
        console.error(error)
    }
};

//upload photo for user
const onSubmitPhoto = async (imageFile) => {
    try {
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('key', '0f13a40a6bc24a6565e327d5b4b5e26c')
        const response = await axios.post('https://api.imgbb.com/1/upload', formData);
        const userPhotoUrl = response.data.data.url;
        authStore.$state.userImgProfile = userPhotoUrl;
        const userPhotoUrlSend = { userPhotoUrl: userPhotoUrl }
        try {
            const response = await authStore.updateProfilePhoto(userPhotoUrlSend);

            if(response.result == "success"){
                closeModalFromComponent();
            }
            
        } catch (error) {
            console.error(error)
        }
    } catch (error) {
        console.error(error)
    }
};

const onSubmitNewPassword = async(currentPassword, newPassword) => {
    try {
        const response = await authStore.updatePassword(currentPassword, newPassword)
        return response;
    } catch (error) {
        return error
    }
 }
</script>

<style scoped></style>