<template class="container">
  <div>
    <div>
      <NavigationBar />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './layouts/NavigationBar.vue';

</script>

