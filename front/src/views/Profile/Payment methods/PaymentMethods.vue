<template>
    <div class="containerPayout">
        <div class="containerInfo">
            <h3>Information <v-icon name="hi-information-circle" scale="1" title="Verificación" /></h3>
            <p>Payments are made through Paypal from 3 to 5 business days.</p>
        </div>
        <div class="formSendEmail">
            <form class="formEmailPay" @submit.prevent="sendEmailPay">
                <input v-model="payoutData.emailPaypal" type="text" placeholder="Email Paypal" required />
                <button class="btn-save-email"><v-icon name="fa-regular-save" scale="1.7" title="history" color="#b81f59"/></button>
            </form>
        </div>

        <div class="containerRequestPayout">
            <div
                class="contentBalance">
                <h3 style="margin: auto;">Balance:</h3>
                <h4 style="margin:auto">$ {{ payoutData.balance }}</h4>
                <button style="border-radius: 50%; height: 30%; margin: auto; border: none;">
                    <v-icon name="px-notes" scale="1.7" title="history" />
                </button>
            </div>
            <form @submit.prevent="sendPayout">
                <input v-model="payoutData.amount" type="number" min="0" placeholder="Amount" required />
                <span>$20 minimum - Fees</span>
                <button class="button-primary">Pay out</button>
            </form>
        </div>
    </div>
</template>
    
<script setup>
import { ref } from 'vue'
import { usePayoutStore } from '@/store/payout';

const payoutStore = usePayoutStore();

const payoutData = ref({
    balance: 35,
    amount: 0,
    emailPaypal: '',
    pagado: false
});

const sendEmailPay = async () => {
    try {
        const response = await payoutStore.requestPayout(payoutData.value)
        if (response.result == 'success') {
            payoutData.value.balance = response.remainingBalance;
        }
    } catch (error) {
        console.error(error)
    }
}
</script>
    
<style scoped>
.containerPayout {
    margin: 10px;
}

.containerInfo {
    margin-block: 30px;
}

.formSendEmail {
    margin-block: 10px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 8px gray;
    margin-block: 20px;
}

.formEmailPay {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    margin: auto;

}

.btn-save-email {
    border: none;
    background-color: transparent;
    border-radius: 50%;
    margin: 0;
}

.btn-save-email:hover {
    box-shadow: 0 0 5px #b81f59;
    padding: auto;
    cursor: pointer;
}

.containerRequestPayout {
    margin-block: 10px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 8px gray;
    margin-block: 20px;
    padding-top: 10px;
}

.contentBalance {
    display: flex; 
    justify-content: space-around; 
    border: 1px solid grey;
     border-radius: 10px; 
     width: 70%; 
     margin: auto; 
     padding: 15px;
}
</style>