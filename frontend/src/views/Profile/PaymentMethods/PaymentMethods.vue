<template>
  <div class="containerPayout">
    <div class="containerInfo">
      <h3>
        Information
        <v-icon name="hi-information-circle" scale="1" title="Verificación" />
      </h3>
      <p>Payments are made through Paypal from 3 to 5 business days.</p>
    </div>
    <div class="contentSendEmail">
      <FormEmailPay
        :payoutDataEmail="payoutData.emailPaypal"
        :disabledInputEmail="disabledInputEmail"
        :sendEmail="sendEmailPay"
      />
    </div>
    <div class="containerRequestPayout">
      <BalanceAndHistory
        :balance="payoutData.balance"
        :allPayments="allPayments"
        :getPayments="getPayments"
      />
      <FormRequestPayment
        :sendRequestPayment="sendRequestPayment"
        :balance="payoutData.balance"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { usePayoutStore } from "@/store/payout";
import { notify } from "@kyvg/vue3-notification";

import FormEmailPay from "./Forms/FormEmailPay.vue";
import FormRequestPayment from "./Forms/FormRequestPayment.vue";
import BalanceAndHistory from "./Partials/BalanceAndHistory.vue";

const payoutStore = usePayoutStore();

const payoutData = ref({
  emailPaypal: "",
  balance: 0,
});

const dataRequestPayment = ref({
  amount: "",
  pagado: false,
});

const allPayments = ref();
const disabledInputEmail = ref(false);

onBeforeMount(async () => {
  try {
    const response = await payoutStore.getUserPayments();
    if (response.userData.length > 0) {
      payoutData.value = response.userData[0];
      disabledInputEmail.value = true;
    }
  } catch (error) {
    console.error(error);
  }
});

const getPayments = async () => {
  try {
    const response = await payoutStore.getAllPaymentsUser();
    allPayments.value = response;
  } catch (error) {
    console.error(error);
  }
};
const sendEmailPay = async (emailPay) => {
  payoutData.value.emailPaypal = emailPay;
  try {
    const response = await payoutStore.emailPayout(payoutData.value);
    if (response.result == "success") {
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
        console.error(error);
      }
    } else if (response.result == "errorEmail") {
      notify({
        type: "error",
        text: `${response.message}`,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const sendRequestPayment = async (amount) => {
  dataRequestPayment.value.amount = amount;
  try {
    const amountAsNumber = parseFloat(dataRequestPayment.value.amount);
    const response = await payoutStore.requestPayment({
      amount: amountAsNumber,
      pagado: dataRequestPayment.value.pagado,
    });
    payoutData.value.balance = response.remaining;
    dataRequestPayment.value.amount = "";
    notify({
      type: "success",
      title: "Success",
      text: `${response.message}`,
    });
  } catch (error) {
    console.error(error);
  }
};
</script>

<style lang="scss">
@import "@/assets/scss/profile/paymentmethods/paymentmethods.scss";
</style>
