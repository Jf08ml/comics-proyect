<template>
    <div class="navbar-content-allusers">
        <div class="nav-link" v-for="menuItem in menuItems" :key="menuItem.name">
            <router-link custom :to="{name: menuItem.route}">
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
</template>

<script setup>
import { ref } from "vue";

const showMenuReal = ref(false);
const showMenuAnimated = ref(false);

const menuItems = ref([
  {
    name: "Real",
    route: "realcomics",
    showMenu: showMenuReal,
    subMenus: [
      { name: "Earn money", route: "earnmoney" },
      { name: "VIP", route: "comicvip/real" },
    ],
  },
  {
    name: "Animated",
    route: "animatedcomics",
    showMenu: showMenuAnimated,
    subMenus: [
      { name: "Earn money", route: "earnmoney" },
      { name: "VIP", route: "comicvip/animated" },
    ],
  },
]);

</script>

<style></style>