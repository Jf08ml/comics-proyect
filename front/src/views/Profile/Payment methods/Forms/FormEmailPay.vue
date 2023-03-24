<template>
    <div>
        <form class="formEmailPay" @submit.prevent="showModalConfirmation = true">
            <input v-model="localPayoutDataEmail" :disabled="disabledInputEmail" type="text" placeholder="Email Paypal"
                required />
            <button v-if="!disabledInputEmail" class="btn-save-email">
                <v-icon name="fa-regular-save" scale="1.7" title="Save" color="#b81f59" />
            </button>
            <v-icon style="margin: auto;" v-else name="fc-approval" scale="1.7" />
        </form>
        <ModalConfirmation v-if="showModalConfirmation" :confirmarModal="confirmarModal" :cancelarModal="cancelarModal"
            title="¿Do you want to add this email?" message="Can only be added once" />
    </div>
</template>
  
<script setup>
import { defineProps, ref, watch } from "vue";
import ModalConfirmation from '@/components/Modals/ModalConfirmation.vue';

const props = defineProps({
    payoutDataEmail: String,
    disabledInputEmail: Boolean,
    sendEmail: Function
});

const showModalConfirmation = ref(false);
const localPayoutDataEmail = ref(props.payoutDataEmail);

watch(() => props.payoutDataEmail, (newValue) => {
    localPayoutDataEmail.value = newValue;
});

const confirmarModal = async () => {
    showModalConfirmation.value = false
    await props.sendEmail(localPayoutDataEmail.value)
}

const cancelarModal = () => {
    showModalConfirmation.value = false
}
</script>
  
<style scoped></style>