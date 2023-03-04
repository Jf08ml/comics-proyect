<template>
    <div class="navbar-content-usersession">
        <div class="nav-link" v-if="!authStore.token">
            <router-link custom to="/login">
                <template v-slot="{ navigate }">
                    <button @click="navigate" class="nav-button-menu-login">
                        Log In
                    </button>
                </template>
            </router-link>
        </div>
        <div class="nav-link" v-if="!authStore.token">
            <router-link custom to="/signup">
                <template v-slot="{ navigate }">
                    <button @click="navigate" class="nav-button-menu-login">
                        Sing Up
                    </button>
                </template>
            </router-link>
        </div>
        <div class="nav-link-usersession" v-if="authStore.token">
            <button @click="logOut()" class="nav-button-menu-logout" style="margin-inline: 5px">
                <v-icon name="co-account-logout" scale="1.5" title="Log Out" />
            </button>
            <router-link custom to="/profile">
                <template v-slot="{ navigate }">
                    <button @click="navigate" @mouseover="showMenuUser = true" class="nav-button-icone">
                        <v-icon name="ri-account-pin-circle-fill" scale="1.7" title="Profile" color="white" />
                    </button>
                </template>
            </router-link>
        </div>
    </div>
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

<style></style>