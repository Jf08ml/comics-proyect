<template>
    <div style="margin: 30px">
        <table class="table">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>State</th>
                    <th>Requested on</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in allPayments" :key="item._id">
                    <td><b>$ {{ item.amount }}</b></td>
                    <td :class="{ 'green': item.pagado, 'blue': !item.pagado }">{{ item.pagado ? 'PAGADO' : 'PENDIENTE' }}
                    </td>
                    <td>{{ formatDate(item.dateRequest) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
  
<script setup>
import { defineProps, ref } from 'vue';
import { format } from 'date-fns';


const props = defineProps({
    allPayments: Array,
});

const allPayments = ref(props.allPayments);

const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
};

</script>
  

<style scoped>

.table {
    border-collapse: collapse;
    width: 100%;
}

th,
td {
    text-align: center;
    padding: 15px;
    border-bottom: 1px solid #ddd;
}

th {
    background-color: #f5669c;
    color: white;
}

.green {
    color: green;
}

.blue {
    color: blue;
}
</style>
