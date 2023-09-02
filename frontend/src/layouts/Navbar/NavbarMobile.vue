<template>
    <div class="menu-hamburger">
        <div class="nav-link-usersession" v-if="authStore.isAuthenticated">
            <UserSession />
        </div>
        <div class="hamburger-icon" @click="toggleMenu">
            <v-icon v-if="!isOpen" name="ri-menu-fill" scale="2" title="Menu" color="white" />
            <v-icon v-if="isOpen" name="md-close-sharp" scale="2" title="Menu" color="red" />
        </div>

        <div class="menu" :class="{ 'menu-open': isOpen }">
            <router-link custom to="/realcomics">
                <template v-slot="{ navigate }">
                    <div style="width: 100%; font-size: 20px; color: #b81f59">
                        <button @click="
                            () => {
                                navigate();
                                isOpen = false;
                            }
                        " class="nav-link-mobile">
                            <v-icon name="fa-person-booth" scale="1.2" title="Real Comics" color="#b81f59" />
                            Real
                        </button>
                    </div>
                </template>
            </router-link>
            <router-link custom to="/animatedcomics">
                <template v-slot="{ navigate }">
                    <button @click="
                        () => {
                            navigate();
                            isOpen = false;
                        }
                    " class="nav-link-mobile">
                        <v-icon name="si-gitbook" scale="1.5" title="Real Comics" color="#b81f59" />
                        Animated
                    </button>
                </template>
            </router-link>
            <button class="nav-link-mobile">
                <v-icon name="fc-vip" scale="1.5" title="VIP comics" color="#b81f59" />: <router-link to="/comicvip/animated">Animated</router-link> or <router-link to="/comicvip/real">Real</router-link>
            </button>
            <router-link custom to="/earnmoney">
                <template v-slot="{ navigate }">
                    <button @click="
                        () => {
                            navigate();
                            isOpen = false;
                        }
                    " class="nav-link-mobile">
                        <v-icon name="gi-take-my-money" scale="1.5" title="Earn money" color="#b81f59" />
                        Earn money
                    </button>
                </template>
            </router-link>
            <router-link custom to="/login" v-if="!authStore.token">
                <template v-slot="{ navigate }">
                    <button @click="
                        () => {
                            navigate();
                            isOpen = false;
                        }
                    " class="nav-link-mobile">
                        <v-icon name="md-login" scale="1.2" title="Real Comics" color="#b81f59" />
                        Log In
                    </button>
                </template>
            </router-link>
            <router-link custom to="/signup" v-if="!authStore.token">
                <template v-slot="{ navigate }">
                    <button @click="
                        () => {
                            navigate();
                            isOpen = false;
                        }
                    " class="nav-link-mobile">
                        <v-icon name="md-newlabel-twotone" scale="1.2" title="Real Comics" color="#b81f59" />
                        Sign Up
                    </button>
                </template>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";
import UserSession from "./UserSession.vue";


const authStore = useAuthStore();
const isOpen = ref(false);



const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style></style>