<template>
    <div class="containerPayout">
        <div class="containerInfo">
            <h3>Information <v-icon name="hi-information-circle" scale="1" title="Verificación" /></h3>
            <p>Payments are made through Paypal from 3 to 5 business days.</p>
        </div>
        <div class="contentSendEmail">
            <FormEmailPay :payoutDataEmail="payoutData.emailPaypal" :disabledInputEmail="disabledInputEmail" :sendEmail="sendEmailPay"/>
        </div>
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
            <FormRequestPayment :sendRequestPayment="sendRequestPayment"  :balance="payoutData.balance"/>
        </div>
        <ModalDefault v-if="showModalHistory" :onShowModal="closeModalFromComponent">
            <TablePayments :allPayments="allPayments" />
        </ModalDefault>
    </div>
</template>
    
<script setup>
import "@/assets/scss/profile/paymentmethods/paymentmethods.scss";
import { ref, onBeforeMount } from 'vue'
import { usePayoutStore } from '@/store/payout';
import { notify } from "@kyvg/vue3-notification";

import ModalDefault from '@/components/Modals/ModalDefault.vue';
import TablePayments from '@/views/Profile/Payment methods/Tables/TablePayments.vue'
import FormEmailPay from "./Forms/FormEmailPay.vue";
import FormRequestPayment from "./Forms/FormRequestPayment.vue";

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


const sendEmailPay = async (emailPay) => {
    payoutData.value.emailPaypal = emailPay;
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

const sendRequestPayment = async (amount) => {
    dataRequestPayment.value.amount = amount;
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
    
<style scoped></style>