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
              <button @click="navigate" @mouseover="menuItem.showMenu = true" class="nav-button-menu">{{ menuItem.name
              }}<v-icon name="bi-caret-right-fill" scale="0.8" title="Real Comics" /> </button>
              <ul v-if="menuItem.showMenu" class="menu-overlay" @mouseleave="menuItem.showMenu = false">
                <li v-for="submenu in menuItem.subMenus" :key="submenu.name">
                  <router-link custom :to="'/' + submenu.route">
                    <template v-slot="{ navigate }">
                      <button @click="navigate" class="nav-button-submenu">
                        {{ submenu.name }}<v-icon name="bi-caret-right-fill" scale="0.8" title="Real Comics" />
                      </button>
                    </template>
                  </router-link>
                </li>
                <div align="center">
                  <button @click="menuItem.showMenu = false" class="nav-button-close">Cerrar</button>
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
              <button @click="navigate" class="nav-button-menu-login">Log In </button>
            </template>
          </router-link>
        </div>
        <div class="nav-link" v-if="!authStore.token">
          <router-link custom to="/signup">
            <template v-slot="{ navigate }">
              <button @click="navigate" class="nav-button-menu-login">Sing Up </button>
            </template>
          </router-link>
        </div>
        <div class="nav-link" v-if="authStore.token">
          <button @click="logOut()" class="nav-button-menu-logout">Log Out </button>
        </div>
        <div class="nav-link" v-if="authStore.token">
          <button @click="logOut()" class="nav-button-menu-logout"><v-icon name="co-account-logout" scale="0.8" title="Real Comics" /></button>
        </div>
      </div>
    </div>
  </nav>
</template>
  
<script setup>
import '@/assets/scss/navbar.scss';
import { ref } from 'vue'
import { useAuthStore } from '@/store/auth';
import { useRouter } from 'vue-router'

const router = useRouter();
const authStore = useAuthStore();

const showMenuReal = ref(false);
const showMenuAnimated = ref(false);
const menuItems = ref([
  {
    name: 'Real',
    route: 'realcomics',
    showMenu: showMenuReal,
    subMenus: [
      { name: 'Mas vistos', route: 'mostview1' },
      { name: 'Mas nuevos', route: 'mostview2' },
      { name: 'VIP', route: 'mostview3' }
    ]
  },
  {
    name: 'Animated',
    route: 'aminatedcomics',
    showMenu: showMenuAnimated,
    subMenus: [
      { name: 'Mas vistos', route: 'mostview4' },
      { name: 'Mas nuevos', route: 'mostview5' },
      { name: 'VIP', route: 'mostview6' },
      { name: 'Artistas', route: 'mostview7' }
    ]
  },
])

const logOut = () => {
  localStorage.clear()
  authStore.token = null
  authStore.refreshToken = null
  router.push("/login");
}

</script>

<style scoped></style>