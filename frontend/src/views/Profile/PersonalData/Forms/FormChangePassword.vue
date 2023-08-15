<template>
    <div class="container-form-change-password">
        <form class="form" @submit.prevent="onSubmitPassword">
            <div class="div-form" style="margin-top: 20px;">
                <input v-model="currentPassword" type="password" placeholder="Current password" required/>
                <input v-model="newPassword" type="password" placeholder="New Password" required/>
            </div>
            {{ showError }}
            <button>Change password</button>
            {{ showResponse }}
        </form>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import { notify } from "@kyvg/vue3-notification";

const props = defineProps({
    onSubmitNewPassword: Function,
})

const currentPassword = ref('');
const newPassword = ref('');
const showError = ref('');
const showResponse = ref('')

const onSubmitPassword = async () => {
    try {
        const response = await props.onSubmitNewPassword(currentPassword.value, newPassword.value);

        if (response.result == "success") {
            notify({
                type: "success",
                title: "Password change",
            });
        } else if (response.result == "errorpassword") {
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

<style scoped>
.container-form-change-password {
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    width: 80%;
    margin: auto;
}
</style>