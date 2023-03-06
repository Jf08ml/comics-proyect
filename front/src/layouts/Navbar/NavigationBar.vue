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
      <NavbarMobile />
    </div>
  </nav>
</template>
  
<script setup>
import "@/assets/scss/navbar.scss";


import NavbarIcone from "./NavbarIcone.vue"
import NavbarPublic from "./NavbarPublic.vue"
import NavbarUser from './NavbarUser.vue'
import NavbarMobile from './NavbarMobile.vue'






</script>

<style lang="scss" scoped></style>