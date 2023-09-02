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
        <Transition>
        <ModalDefault v-if="showModalHistory" :onShowModal="closeModalFromComponent">
            <TablePayments :allPayments="localAllPayments" />
        </ModalDefault>
        </Transition>
    </div>
</template>

<script setup>
import { defineProps, watch, ref, onMounted } from 'vue';

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
const fetchData = ref(true);

onMounted(async () => {
  if (fetchData.value) {
    await props.getPayments();
    fetchData.value = false;
  }
});

const closeModalFromComponent = async () => {
    if (fetchData.value) {
        await props.getPayments();
        fetchData.value = false;
    } else {
        fetchData.value = true;
    }
    showModalHistory.value = !showModalHistory.value
}

watch(() => props.balance, (newValue) => {
    localBalance.value = newValue;
});

watch(() => props.allPayments, (newValue) => {
    localAllPayments.value = newValue;
});

</script>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>