<template>
  <nav class="navbar">

    <div class="navbar-icone">
      <SiteLogo />
    </div>

    <div class="navbar-sections">

      <div class="navbar-sections-public">
        <PublicSection />
      </div>

      <div class="navbar-sections-user">
        <AuthOptions />
      </div>

    </div>

    <div class="menu-hamburger">
      <NavbarMobile />
    </div>

  </nav>
</template>
  
<script setup>
import SiteLogo from "./SiteLogo.vue"
import PublicSection from "./PublicSection.vue"
import AuthOptions from './AuthOptions.vue'
import NavbarMobile from './NavbarMobile.vue'

</script>

<style lang="scss" scoped></style>