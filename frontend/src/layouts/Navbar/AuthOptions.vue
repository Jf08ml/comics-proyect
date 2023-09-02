<template>
    <div class="navbar-content-usersession">
        <div style="display: flex;" v-if="!authStore.isAuthenticated">
            <div class="nav-link" style="margin-inline: 5px;">
                <router-link custom :to="{ name: 'login' }">
                    <template v-slot="{ navigate }">
                        <button @click="navigate" class="nav-button-menu-login">
                            Log In
                        </button>
                    </template>
                </router-link>
            </div>
            <div class="nav-link" style="margin-inline: 5px;">
                <router-link custom :to="{ name: 'signup' }">
                    <template v-slot="{ navigate }">
                        <button @click="navigate" class="nav-button-menu-login">
                            Sing Up
                        </button>
                    </template>
                </router-link>
            </div>
        </div>
        <div class="nav-link-usersession" v-if="authStore.isAuthenticated">
            <UserSession />
        </div>
    </div>
</template>

<script setup>
import { useAuthStore } from "@/store/auth";

import UserSession from "./UserSession.vue";

const authStore = useAuthStore();



</script>

<style></style>