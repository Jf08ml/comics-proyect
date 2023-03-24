<template>
    <div>
        <div class="contentBalance">
            <div class="subtitleBalance">
                <h3>Balance:</h3>
            </div>
            <div class="amountBalance">
                <h4>$ {{ props.balance }}</h4>
            </div>
            <div class="contentButtonHistory">
                <button @click="closeModalFromComponent" class="btn-history">
                    <v-icon name="px-notes" scale="1.7" title="history" color="black" />
                </button>
            </div>
        </div>
        <ModalDefault v-if="showModalHistory" :onShowModal="closeModalFromComponent">
            <TablePayments :allPayments="localAllPayments"/>
        </ModalDefault>
    </div>
</template>

<script setup>
import { defineProps, watch, ref } from 'vue';

import ModalDefault from '@/components/Modals/ModalDefault.vue';
import TablePayments from '@/views/Profile/PaymentMethods/Tables/TablePayments.vue'

const props = defineProps({
    balance: Number,
    allPayments: Object,
    getPayments: Function
})

const localBalance = ref(props.balance)
const localAllPayments = ref(props.allPayments)
const showModalHistory = ref(false);

const closeModalFromComponent = async () => {
    await props.getPayments();
    showModalHistory.value = !showModalHistory.value
}

watch(() => props.balance, (newValue) => {
    localBalance.value = newValue;
});

watch(() => props.allPayments, (newValue) => {
    localAllPayments.value = newValue;
});

</script>

<style scoped></style>