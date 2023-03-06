<template>
    <button @click="logOut()" class="nav-button-menu-logout" style="margin-inline: 5px">
                <v-icon name="co-account-logout" scale="1.5" title="Log Out" />
            </button>
            <router-link custom :to="{ name: 'profile' }">
                <template v-slot="{ navigate }">
                    <button @click="navigate" class="nav-button-icone">
                        <v-icon name="ri-account-pin-circle-fill" scale="1.7" title="Profile" color="white" />
                    </button>
                </template>
            </router-link>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const logOut = () => {
  localStorage.clear();
  authStore.token = null;
  authStore.refreshToken = null;
  router.push("/");
};
</script>

<style scoped>

</style>