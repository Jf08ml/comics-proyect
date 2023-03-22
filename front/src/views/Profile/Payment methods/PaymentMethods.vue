<template>
    <div class="containerPayout">
        <div class="containerInfo">
            <h3>Information <v-icon name="hi-information-circle" scale="1" title="Verificación" /></h3>
            <p>Payments are made through Paypal from 3 to 5 business days.</p>
        </div>
        <div class="contentSendEmail">
            <form class="formEmailPay" @submit.prevent="sendEmailPay">
                <input v-model="payoutData.emailPaypal" type="text" placeholder="Email Paypal" required />
                <button class="btn-save-email"><v-icon name="fa-regular-save" scale="1.7" title="Save"
                        color="#b81f59" /></button>
            </form>
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
                    <button class="btn-history">
                        <v-icon name="px-notes" scale="1.7" title="history" color="black"/>
                    </button>
                </div>
            </div>
            <form class="formPayout" @submit.prevent="sendPayout">
                <input class="inputAlign" v-model="payoutData.amount" type="number" min="0" placeholder="Amount" required />
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
    emailPaypal: '',
    balance: 0,
});

const sendEmailPay = async () => {
    try {
        const response = await payoutStore.requestPayout(payoutData.value)
        if (response.result == 'success') {
            alert('success')
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

.contentSendEmail {
    margin-block: 10px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    margin-block: 20px;
}

.formEmailPay {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-content: center;
    margin: auto;
    border-radius: 20px;
    width: 95%;
}

.btn-save-email {
    border: none;
    background-color: transparent;
    border-radius: 50%;
    margin: 5px;
    padding: 0;
}

.btn-save-email:hover {
    box-shadow: 0 0 2px #b81f59;
    padding: 0;
    cursor: pointer;
}

.containerRequestPayout {
    margin-block: 10px;
    width: 100%;
    border-radius: 20px;
    box-shadow: 0 0 3px gray;
    margin-block: 20px;
    padding-top: 10px;
}

.contentBalance {
    display: flex;
    align-items: center;
    justify-content: space-around;
    box-shadow: 0 0 3px grey;
    border-radius: 10px;
    width: 70%;
    margin: auto;
    margin-top: 15px;
}

.subtitleBalance {
    width: 28%;
    text-align: center;
}

.amountBalance {
    width: 30%;
    text-align: center;
}

.contentButtonHistory {}

.btn-history {
    background: transparent;
    border: none;
    border-radius: 50%;
    padding: 0;
}

.btn-history:hover {
    box-shadow: 0 0 5px grey;
    padding: 0;
    cursor: pointer;
}

.formPayout {
    width: 70%;
    margin: auto;
}

.inputAlign {
    text-align: center;
    width: 95%;
}
</style>