<template>
    <div class="table-container">
        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Amount</th>
                    <th>State</th>
                    <th>Requested on</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in allPayments.slice(0, showCount)" :key="item._id">
                    <td>P-{{index}}</td>
                    <td><b>$ {{ item.amount }}</b></td>
                    <td :class="{ 'green': item.pagado, 'blue': !item.pagado }">{{ item.pagado ? 'PAGADO' : 'PENDIENTE' }}
                    </td>
                    <td>{{ formatDate(item.dateRequest) }}</td>
                </tr>
            </tbody>
        </table>
        <div class="content-btn">
            <button class="btn-showmore" v-if="showCount < allPayments.length"
                @click="showCount += 8">Ver más</button>
        </div>
    </div>
</template>
  
<script setup>
import { defineProps, ref } from 'vue';
import { format } from 'date-fns';

const props = defineProps({
    allPayments: Array,
});

const allPayments = ref(props.allPayments);
const showCount  = ref(8);

const formatDate = (date) => {
    return format(new Date(date), 'dd/MM/yyyy');
};
</script>
  
<style scoped>
.table-container {
    margin: 30px;
    max-height: 400px;
    overflow-y: auto;
}

.table-container::-webkit-scrollbar {
    width: 2px;
    /* ancho de la barra de desplazamiento */
    background-color: #f5f5f5;
    /* color de fondo de la barra de desplazamiento */
}

.table-container::-webkit-scrollbar-thumb {
    background-color: #888;
    /* color de la barra de desplazamiento */
    border-radius: 1px;
    /* radio de borde de la barra de desplazamiento */
}

.content-btn {
    margin: 15px;
    display: flex; 
    justify-content: center; 
    align-items: center;
}
.btn-showmore {
    margin: auto;
    text-align: center;
    font-size: 15px;
    background-color: transparent;
    border: none;
    color: #f5669c;
    cursor: pointer;
    border-radius: 20px;
}

.btn-showmore:hover {
    background-color: #f5669c;
    color: white;
}

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
}</style>
  