<template>
    <div style="margin: 10px">
        <div style="margin-block: 30px;">
            <h3>Information <v-icon name="hi-information-circle" scale="1" title="Verificación" /></h3>
            <p>Payments are made through Paypal from 3 to 5 business days.</p>
        </div>

        <div style="display: flex; justify-content: space-around; border: 1px solid grey; border-radius: 10px; width: 70%; margin: auto; padding: 15px;">
            <h3 style="margin: auto;">Balance:</h3>
            <h4 style="margin:auto">$ {{ balance }}</h4>
            <button style="border-radius: 50%; height: 30%; margin: auto; border: none;">
            <v-icon name="px-notes" scale="1.5" title="history" />
            </button>
        </div>

        <div style="margin-block-start: 20px;">
            <form  @submit.prevent="sendEmailPay">
                <input v-model="amount" type="number" min="0" placeholder="Amount" required/>
                <input v-model="emailPaypal" type="text" placeholder="Email Paypal" required/>
                <span>$20 minimum - Fees</span>
                <button class="button-primary">Pay out</button>
            </form>
        </div>
    </div>
</template>
    
<script setup>
import {ref} from 'vue'


const balance = ref(0)
const emailPaypal = ref();
const amount = ref();

const sendEmailPay = () => {
    try {
        console.log(emailPaypal.value)
    } catch (error) {
        console.error(error)
    }
}
</script>
    
<style scoped>

</style>