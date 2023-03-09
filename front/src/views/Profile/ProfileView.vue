<template>
    <div class="container-profile">
        <div class="content-profile">
            <div class="navigation">
                <button :class="{active: currentComponent === PersonalData}" @click="currentComponent = PersonalData">Personal Data</button>
                <button :class="{active: currentComponent === PaymentMethods}" @click="currentComponent = PaymentMethods">Payment Methods</button>
                <button :class="{active: currentComponent === ContentStatistics}" @click="currentComponent = ContentStatistics">Statitics</button>
                <button :class="{active: currentComponent === ContentCreated}"  @click="currentComponent = ContentCreated">Content Created</button>
            </div>
            <div class="navitagion-content">
                <component :is="currentComponent" />
            </div>
        </div>
    </div>
</template>

<script setup>
import {shallowRef} from 'vue'
import "@/assets/scss/profile/profile.scss";


import PersonalData from "./Personal Data/PersonalData.vue";
import PaymentMethods from "./Payment methods/PaymentMethods.vue";
import ContentStatistics from "./Content Statistics/ContentStatistics.vue"
import ContentCreated from "./Content created/ContentCreated.vue";

const currentComponent = shallowRef(PersonalData);

</script>

<style></style>