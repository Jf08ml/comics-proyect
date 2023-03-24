<template>
    <div class="containerPayout">
        <div class="containerInfo">
            <h3>Information <v-icon name="hi-information-circle" scale="1" title="Verificación" /></h3>
            <p>Payments are made through Paypal from 3 to 5 business days.</p>
        </div>
        <div class="contentSendEmail">
            <form class="formEmailPay" @submit.prevent="showModalConfirmation = true">
                <input :disabled="disabledInputEmail" v-model="payoutData.emailPaypal" type="text"
                    placeholder="Email Paypal" required />
                <button v-if="!disabledInputEmail" class="btn-save-email"><v-icon
                        name="fa-regular-save" scale="1.7" title="Save" color="#b81f59" /></button>
                <v-icon style="margin: auto;" v-else name="fc-approval" scale="1.7" />
            </form>
        </div>
        <ModalConfirmation v-if="showModalConfirmation" :confirmarModal="confirmarModal" :cancelarModal="cancelarModal"
            title="¿Do you want to add this email?" message="Can only be added once" />
        <div class="containerRequestPayout">
            <div class="contentBalance">
                <div class="subtitleBalance">
                    <h3>Balance:</h3>
                </div>
                <div class="amountBalance">
                    <h4>$ {{ payoutData.balance }}</h4>
                </div>
                <div class="contentButtonHistory">
                    <button @click="closeModalFromComponent" class="btn-history">
                        <v-icon name="px-notes" scale="1.7" title="history" color="black" />
                    </button>
                </div>
            </div>
            <form class="formPayout" @submit.prevent="sendRequestPayment">
                <input :disabled="payoutData.balance <= 19" class="inputAlign" v-model="dataRequestPayment.amount" type="number" min="20" placeholder="Amount" required />
                <span>$20 minimum - Fees</span>
                <button :disabled="payoutData.balance <= 19" class="button-primary">Pay out</button>
            </form>
        </div>
        <ModalDefault v-if="showModalHistory" :onShowModal="closeModalFromComponent">
                <TablePayments :allPayments="allPayments"/>
        </ModalDefault>
    </div>
</template>
    
<script setup>
import "@/assets/scss/profile/paymentmethods/paymentmethods.scss";
import { ref, onBeforeMount } from 'vue'
import { usePayoutStore } from '@/store/payout';
import { notify } from "@kyvg/vue3-notification";

import ModalDefault from '@/components/Modals/ModalDefault.vue';
import ModalConfirmation from '@/components/Modals/ModalConfirmation.vue';
import TablePayments from '@/views/Profile/Payment methods/Tables/TablePayments.vue'
const payoutStore = usePayoutStore();

const payoutData = ref({
    emailPaypal: '',
    balance: 0,
});

const dataRequestPayment = ref({
    amount: '',
    pagado: false,
});

const allPayments = ref()

const disabledInputEmail = ref(false);
const showModalConfirmation = ref(false);
const showModalHistory = ref(false);

const closeModalFromComponent = async () => {
    try {
        const response = await payoutStore.getAllPaymentsUser();
        allPayments.value = response;
    } catch (error) {
        console.log(error)
    }

    showModalHistory.value = !showModalHistory.value
}

onBeforeMount(async () => {
    try {
        const response = await payoutStore.getUserPayments();
        if (response.userData.length > 0) {
            payoutData.value = response.userData[0];
            disabledInputEmail.value = true;
        }
    } catch (error) {
        console.log(error)
    }
})

const confirmarModal = async () => {
    showModalConfirmation.value = false
    await sendEmailPay()
}

const cancelarModal = () => {
    showModalConfirmation.value = false
}

const sendEmailPay = async () => {
    try {
        const response = await payoutStore.emailPayout(payoutData.value)
        if (response.result == 'success') {
            notify({
                type: "success",
                title: "Success",
                text: `${response.message}`,
            });
            try {
                const response = await payoutStore.getUserPayments();
                if (response.userData.length > 0) {
                    payoutData.value = response.userData[0];
                    disabledInputEmail.value = true;
                }
            } catch (error) {
                console.log(error)
            }
        } else if (response.result == 'errorEmail') {
            notify({
                type: "error",
                text: `${response.message}`,
            });
        }
    } catch (error) {
        console.log(error)
    }
}

const sendRequestPayment = async() =>{
    try {
        const amountAsNumber = parseFloat(dataRequestPayment.value.amount);
        const response = await payoutStore.requestPayment({ amount: amountAsNumber, pagado: dataRequestPayment.value.pagado });
        payoutData.value.balance = response.remaining;
        dataRequestPayment.value.amount = '';
        notify({
                type: "success",
                title: "Success",
                text: `${response.message}`,
            });
    } catch (error) {
        console.log(error)
    }
}
</script>
    
<style scoped>

</style>