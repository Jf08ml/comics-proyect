<template>
  <nav class="navbar">
    <div>
      <NavbarIcone />
    </div>
    <div class="navbar-sections">
      <div style="width: 60vw;">
      <NavbarPublic />
    </div>
    <div style="width: 40vw;">
      <NavbarUser />
    </div>
    </div>
    <div class="menu-hamburger">
      <div class="nav-link" v-if="authStore.token" style="margin-top: 3px">
        <button @click="logOut()" class="nav-button-menu-logout">
          <v-icon name="co-account-logout" scale="1.5" title="Real Comics" />
        </button>
        <router-link custom to="/profile">
          <template v-slot="{ navigate }">
            <button @click="navigate" @mouseover="showMenuUser = true" class="nav-button-icone">
              <v-icon name="ri-account-pin-circle-fill" scale="1.5" title="Real Comics" color="white" />
            </button>
          </template>
        </router-link>
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
  </nav>
</template>
  
<script setup>
import "@/assets/scss/navbar.scss";
import { ref } from "vue";
import { useAuthStore } from "@/store/auth";

import NavbarIcone from "./NavbarIcone.vue"
import NavbarPublic from "./NavbarPublic.vue"
import NavbarUser from './NavbarUser.vue'

const authStore = useAuthStore();
const isOpen = ref(false);
const showMenuUser = ref(false);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

</script>

<style lang="scss" scoped></style>