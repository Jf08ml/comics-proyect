<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link custom to="/">
        <template v-slot="{ navigate }">
          <button @click="navigate" class="nav-button">
            <v-icon name="si-gitbook" scale="2" title="Real Comics" /> Comicoon
          </button>
        </template>
      </router-link>
    </div>
    <div class="navbar-content">
      <div class="navbar-content-allusers">
        <div class="nav-link" v-for="menuItem in menuItems" :key="menuItem.name">
          <router-link custom :to="'/' + menuItem.route">
            <template v-slot="{ navigate }">
              <div class="menu-wrapper">
                <button @click="navigate" @mouseover="menuItem.showMenu = true" class="nav-button-menu">
                  {{ menuItem.name }} ▸
                </button>
                <ul v-if="menuItem.showMenu" class="menu-overlay" @mouseleave="menuItem.showMenu = false">
                  <li v-for="submenu in menuItem.subMenus" :key="submenu.name">
                    <router-link custom :to="'/' + submenu.route">
                      <template v-slot="{ navigate }">
                        <button @click="navigate" class="nav-button-submenu">
                          {{ submenu.name }}
                          <p>▶</p>
                        </button>
                      </template>
                    </router-link>
                  </li>
                  <div align="center">
                    <button @click="menuItem.showMenu = false" class="nav-button-close">
                      Cerrar
                    </button>
                  </div>
                </ul>
              </div>
            </template>
          </router-link>
        </div>
      </div>
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
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const isOpen = ref(false);
const showMenuReal = ref(false);
const showMenuAnimated = ref(false);
const showMenuUser = ref(false);
const menuItems = ref([
  {
    name: "Real",
    route: "realcomics",
    showMenu: showMenuReal,
    subMenus: [
      { name: "Mas vistos", route: "mostview1" },
      { name: "Mas nuevos", route: "mostview2" },
      { name: "VIP", route: "mostview3" },
    ],
  },
  {
    name: "Animated",
    route: "animatedcomics",
    showMenu: showMenuAnimated,
    subMenus: [
      { name: "Mas vistos", route: "mostview4" },
      { name: "Mas nuevos", route: "mostview5" },
      { name: "VIP", route: "mostview6" },
      { name: "Artistas", route: "mostview7" },
    ],
  },
]);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const logOut = () => {
  localStorage.clear();
  authStore.token = null;
  authStore.refreshToken = null;
  router.push("/");
};
</script>

<style lang="scss" scoped></style>