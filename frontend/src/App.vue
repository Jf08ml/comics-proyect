<template>
  <div>
    <div style="height: 10vh; width: 100vw;">
      <NavigationBar />
    </div>
    <div style="height: 90vh; width: 100vw;">
      <router-view />
      <notifications position="top center" style="margin: 10px ;"/>
    </div>
  </div>
</template>

<script setup>
import NavigationBar from './layouts/Navbar/NavigationBar.vue';
import {onMounted} from "vue"; 
import EventBus from './utils/eventBus';
import { useAuthStore } from './store/auth';

const authStore = useAuthStore();

onMounted(() => {
  EventBus.on('logout', () => {
    authStore.logout();
  })
});

</script>

