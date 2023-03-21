<template>
  <div >
    <div style="height: 10vh; width: 100vw;">
      <NavigationBar />
    </div>
    <div style="height: 90vh; width: 100vw;">
      <router-view />
      <notifications position="top center"/>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './layouts/Navbar/NavigationBar.vue';

</script>

