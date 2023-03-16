<template>
    <div>
        <button @click="logOut()" class="nav-button-menu-logout">
            <v-icon name="co-account-logout" scale="1.5" title="Log Out" />
        </button>
        <router-link custom :to="{ name: 'profile' }">
            <template v-slot="{ navigate }">
                <button @click="navigate" class="nav-button-icone">
                    <v-icon name="ri-account-pin-circle-fill" scale="1.7" title="Profile" color="white" />
                </button>
            </template>
        </router-link>
    </div>
</template>

<script setup>
import { onBeforeMount, ref} from 'vue'
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
    } catch (error) {
        console.error(error)
    }
});

const logOut = () => {
    authStore.logout()
    router.push("/");
};
</script>

<style scoped></style>