<template>
  <div>
    <div class="navbar-brand">
      <router-link custom :to="{ name: 'home' }" v-slot="{ navigate }">
        <button @click="navigate" class="nav-button">
          <v-icon name="si-gitbook" scale="1.8" title="Real Comics" /> Comicoon
        </button>
      </router-link>
      <button
        class="nav-button-menu"
        @click="openModalSearch"
        v-if="!isModalOpen"
      >
        <v-icon name="io-search-circle-sharp" scale="1.7" title="Profile" />
      </button>
      <div>
        <ModalSearch
          :is-open="isModalOpen"
          @close="closeModalSearch"
          v-if="!isMobile"
        />
      </div>
    </div>
    <div class="search-mobile" v-if="isMobile && isModalOpen">
      <ModalSearch
        :is-open="isModalOpen"
        @close="closeModalSearch"
        style="
          display: flex;
          align-items: center;
          align-content: center;
          padding-right: 50px;
        "
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import ModalSearch from "@/components/Modals/ModalSearch.vue";

const isModalOpen = ref(false);
const isMobile = ref(window.innerWidth < 700);

const updateIsMobile = () => {
  isMobile.value = window.innerWidth < 700;
};

onMounted(() => {
  window.addEventListener("resize", updateIsMobile);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateIsMobile);
});

const openModalSearch = () => {
  isModalOpen.value = true;
};

const closeModalSearch = () => {
  isModalOpen.value = false;
};
</script>

<style></style>
