<template>
    <div>
        <form class="formPayout" @submit.prevent="props.sendRequestPayment(amount)">
            <input :disabled="props.balance <= 19" class="inputAlign" v-model="amount" type="number"
                min="20" placeholder="Amount" required />
            <span>$20 minimum - Fees</span>
            <button :disabled="props.balance <= 19" class="button-primary">Pay out</button>
        </form>
    </div>
</template>

<script setup>
import {ref, defineProps} from 'vue';
const props = defineProps({
    sendRequestPayment: Function,
    amount: String,
    balance: Number
})

const amount = ref('');

</script>

<style scoped></style>