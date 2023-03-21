<template>
    <div>
        <form class="form" enctype="multipart/form-data" @submit.prevent="submitData">
            <div class="div-form">
                <input v-model="userInformation.name" type="text" placeholder="Full name *" required/>
                <input v-model="userInformation.lastName" type="text" placeholder="Full last name *" required/>
            </div>
            <div class="div-form">
                <input v-model="userInformation.country" type="text" placeholder="Country *" required/>
                <input v-model="userInformation.city" type="text" placeholder="City *" required/>
            </div>
            <div class="div-form">
                <input v-model="userInformation.email" type="text" placeholder="Email *" required/>
                <input v-model="userInformation.nickname" type="text" placeholder="Nickname *" required/>
            </div>
                <button class="btn-primary">Save data</button>
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { notify } from "@kyvg/vue3-notification";

const props = defineProps({
    onSubmitUserInformation: Function,
    userData: Object
})

const userInformation = ref(props.userData);

const submitData = async () => {
    try {
        const response = await props.onSubmitUserInformation(userInformation);
        
        if (response.result == "success") {
            notify({
                type: "success",
                title: "Updated",
            });
        } else if (response.result == "errorUser") {
            notify({
                type: "error",
                title: "Invalid password",
            });
        }
    } catch (error) {
        console.error(error)
    }
}
</script>

<style scoped></style>