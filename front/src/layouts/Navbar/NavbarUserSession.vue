<template>
    <div style="display:flex">
        <div style="border: 1px solid black; width: 50%;">
            <button @click="logOut()" class="nav-button-menu-logout">
                <v-icon name="co-account-logout" scale="1.5" title="Log Out" />
            </button>
        </div>
        <div >
            <router-link custom :to="{ name: 'profile' }">
                <template v-slot="{ navigate }">
                    <button class="profile-pic" :class="profilePicClass" :style="profilePicStyle" @click="navigate">
                        <v-icon name="ri-account-pin-circle-fill" scale="1.5" title="Profile" color="transparent" />
                    </button>
                </template>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const dataUser = ref(null);
const userUrlPhoto = ref(null)

onBeforeMount(async () => {
    try {
        const response = await authStore.getUser();
        dataUser.value = response.user;
        userUrlPhoto.value = dataUser.value.userUrlPhoto;
        console.log(userUrlPhoto.value)
    } catch (error) {
        console.error(error)
    }
});

const profilePicClass = computed(() => ({
    'default-pic': userUrlPhoto.value,
}));
const profilePicStyle = computed(() => ({
    backgroundImage: userUrlPhoto.value ? `url(${userUrlPhoto.value})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));

const logOut = () => {
    authStore.logout()
    router.push("/");
};
</script>

<style scoped>

.profile-pic {
    border-radius: 50%;
    box-shadow: 0 0 1px black;
    overflow: hidden;
    border: 0.5px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profile-pic img {

    object-fit: cover;
}

.default-pic::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    background-image: url('../../../public/no-profile-photo.png');
    background-size: cover;
    background-position: center;
}
</style>