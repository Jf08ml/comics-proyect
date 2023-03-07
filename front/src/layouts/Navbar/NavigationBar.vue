<template>
  <nav class="navbar">
    <div>
      <NavbarIcone />
    </div>
    <div class="navbar-sections">
      <div class="navbar-sections-public">
        <NavbarPublic />
      </div>
      <div class="navbar-sections-user">
        <NavbarUser />
      </div>
    </div>
    <div class="menu-hamburger">
      <NavbarMobile />
    </div>
  </nav>
</template>
  
<script setup>
import "@/assets/scss/navbar/navbar.scss";


import NavbarIcone from "./NavbarIcone.vue"
import NavbarPublic from "./NavbarPublic.vue"
import NavbarUser from './NavbarUser.vue'
import NavbarMobile from './NavbarMobile.vue'
</script>

<style lang="scss" scoped></style>