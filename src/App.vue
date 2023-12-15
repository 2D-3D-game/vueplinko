<template>
  <div :class="'container'">
    <div :class="'spanstyle'">Bet Amount: {{ amount }}</div>
    <input
      :class="'tempstyle'"
      v-model="amount"
      placeholder="100.0000"
      type="number"
    />
    <div :class="'spanstyle'">Risk: {{ risk }}</div>
    <select :class="'tempstyle'" v-model="risk" @change="onRiskChange">
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
    <div :class="'spanstyle'">Rows: {{ rows }}</div>
    <select :class="'tempstyle'" v-model="rows" @change="onRowChange">
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
    </select>
    <button :class="['tempstyle', 'buttonstyle']" @click="bet">Bet</button>
  </div>
</template>

<style scoped>
.container {
  background-color: #082537;
  padding: 50px;
  border-radius: 20px;
  margin-top: 5vh;
  height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tempstyle {
  width: 100%;
  height: 30px;
  background-color: #05121c;
  border-color: #05121c;
  border-radius: 10px;
  color: #fff;
  margin-bottom: 20px;
}
.spanstyle {
  color: #fff;
}

.buttonstyle {
  background-color: #0094ea;
  border-radius: 10px;
  border-color: #0094ea;
}
</style>

<script setup>
import { ref, computed } from "vue";
import { Plinko } from "./Plinko";

const amount = ref("100.0000");
const risk = ref("Low");
const rows = ref("8");

// const basket = [10, 5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6, 10];
let basket = [5.6, 2.1, 1, 0.7, 0.3, 0.7, 1, 2.1, 5.6];
const basket_risk = ref(basket);
const plinko = Plinko(document.body.querySelector("#canvas"));
plinko.map(basket_risk.value);

const onRowChange = () => {
  switch (rows.value) {
    case "8":
      basket = [5.6, 2.1, 1, 0.7, 0.3, 0.7, 1, 2.1, 5.6];
      break;
    case "9":
      basket = [5.6, 2.1, 1, 0.7, 0.3, 0.3, 0.7, 1, 2.1, 5.6];
      break;
    case "10":
      basket = [5.6, 2.1, 1, 0.7, 0.5, 0.3, 0.5, 0.7, 1, 2.1, 5.6];
      break;
    case "11":
      basket = [5.6, 2.1, 1, 0.7, 0.5, 0.3, 0.3, 0.5, 0.7, 1, 2.1, 5.6];
      break;
    case "12":
      basket = [5.6, 2.1, 1.2, 1, 0.7, 0.5, 0.3, 0.5, 0.7, 1, 1.2, 2.1, 5.6];
      break;
    case "13":
      basket = [5.6, 2.1, 1.2, 1, 0.7, 0.5, 0.3, 0.3, 0.5, 0.7, 1, 1.2, 2.1, 5.6];
      break;
    case "14":
      basket = [7.2, 5.6, 2.1, 1.2, 1, 0.7, 0.5, 0.3, 0.5, 0.7, 1, 1.2, 2.1, 5.6, 7.2];
      break;
    case "15":
      basket = [7.2, 5.6, 2.1, 1.2, 1, 0.7, 0.5, 0.3, 0.3, 0.5, 0.7, 1, 1.2, 2.1, 5.6, 7.2];
      break;
    case "16":
      basket = [10, 7.2, 5.6, 2.1, 1.2, 1, 0.7, 0.5, 0.3, 0.5, 0.7, 1, 1.2, 2.1, 5.6, 7.2, 10];
      break;
    default:
      basket = [5.6, 2.1, 1, 0.7, 0.3, 0.7, 1, 2.1, 5.6];
  }
  onRiskChange();
}

const onRiskChange = () => {
  plinko.clear();
  if (risk.value === "Low") {
    basket_risk.value = basket.map((item) => (item ** 1).toFixed(2));
  } else if (risk.value === "Medium") {
    basket_risk.value = basket.map((item) => (item ** 2).toFixed(2));
  } else if (risk.value === "High") {
    basket_risk.value = basket.map((item) => (item ** 3).toFixed(2));
  }
  plinko.map(basket_risk.value);
};
const bet = () => {
  const randomArray = [];
  for (let i = 0; i < basket_risk.value.length; i++) {
    const randomNumber = Math.floor(Math.random() * 2);
    randomArray.push(randomNumber);
  }
  plinko.add(randomArray);
};
</script>