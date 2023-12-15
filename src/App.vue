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
    <select :class="'tempstyle'" v-model="risk">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
    <div :class="'spanstyle'">Rows: {{ rows }}</div>
    <select :class="'tempstyle'" v-model="rows">
      <option>8</option>
      <option>9</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
      <option>13</option>
      <option>14</option>
      <option>15</option>
      <option>16</option>
    </select>
    <button :class="['tempstyle', 'buttonstyle']" @click="bet">Bet</button>
  </div>
</template>

<style scoped>
.container {
  background-color: #082537;
  padding: 50px;
  border-radius: 20px;
  margin-top: 20vh;
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
import { ref } from "vue";
import { Plinko } from "./Plinko";

const amount = ref("100.0000");
const risk = ref("Low");
const rows = ref("8");

const basket = [10, 5.6, 2.1, 1.1, 1, 0.5, 1, 1.1, 2.1, 5.6, 10];
const plinko = Plinko(document.body.querySelector("#canvas"));
plinko.map(basket);


const bet = () => {
  // setTimeout(() => {
  //   plinko.add([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  // }, 300);
  // setTimeout(() => {
  //   plinko.add([1, 1, 1, 1, 1, 1, 1]);
  // }, 600);
  // setTimeout(() => {
  //   plinko.add([0, 0, 1, 1, 0, 0, 1]);
  // }, 900);
  // setTimeout(() => {
  //   plinko.add([1, 0, 1, 0, 0, 0, 1]);
  // }, 1200);
  // setTimeout(() => {
  //   plinko.add([0, 0, 1, 1, 1, 0, 1]);
  // }, 1500);
  // setTimeout(() => {
  //   plinko.add([1, 1, 1, 0, 1, 1, 1]);
  // }, 1800);
  const randomArray = [];
  for (let i = 0; i < 7; i++) {
    const randomNumber = Math.floor(Math.random() * 2);
    randomArray.push(randomNumber);
  }
  plinko.add(randomArray);
};
</script>
