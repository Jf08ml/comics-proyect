<template>
    <div style="display:flex">
        <div>
            <button @click="logOut()" class="nav-button-menu-logout">
                <v-icon name="co-account-logout" scale="1.5" title="Log Out" />
            </button>
        </div>
        <div>
            <router-link custom :to="{ name: 'profile' }">
                <template v-slot="{ navigate }">
                    <button class="profile-pic" :style="profilePicStyle" @click="navigate">
                        <v-icon name="ri-account-pin-circle-fill" scale="1.7" title="Profile" :color="colorIcone" />
                    </button>
                </template>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const userUrlPhoto = computed(() => authStore.$state.userImgProfile)
const colorIcone = computed(() => userUrlPhoto.value ? 'transparent' : 'white')

const profilePicStyle = computed(() => ({
    backgroundImage: userUrlPhoto.value ? `url(${userUrlPhoto.value})` : '',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    boxShadow: '0 0 2px black',
}));

const logOut = () => {
    authStore.logout()
};
</script>

<style scoped>
.profile-pic {
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    background: none;
    cursor: pointer;
}

</style>
