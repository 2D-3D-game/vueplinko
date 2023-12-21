<template>
  <div :class="'container'">
    <div :class="'spanstyle'">投注额: {{ amount }}</div>
    <div :class="'betAmountContainer'">
      <input
        :class="['betAmountInput', { warning: isEmpty }]"
        v-model="amount"
        placeholder="0.0000"
        type="number"
        min="0"
      />
      <button :class="'betAmountTimesBtn-left'" @click="betAmountTimes(0.5)">
        1/2
      </button>
      <button :class="'betAmountTimesBtn-right'" @click="betAmountTimes(2)">
        2x
      </button>
      <img
        :src="'/image/bit.png'"
        width="16"
        height="16"
        alt="Image"
        :class="'bitImage'"
      />
    </div>
    <button :class="['baseStyle', 'betButton']" @click="bet">
      {{
        isManualButton
          ? "投注"
          : isAutoBetting
          ? "停止自动投注"
          : "开始自动投注"
      }}
    </button>
    <div :class="'spanstyle'">风险:</div>
    <select :class="'baseStyle'" v-model="risk" @change="onRiskChange">
      <option value="Low">下等</option>
      <option value="Medium">中等</option>
      <option value="High">上等</option>
    </select>
    <div :class="'spanstyle'">排数:</div>
    <select :class="'baseStyle'" v-model="rows" @change="onRowChange">
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
    <div :class="'betNumberContainer'" v-if="isAutoButton">
      <div :class="'spanstyle'">投注次数:</div>
      <input
        :class="'baseStyle'"
        v-model="numberofbet"
        placeholder="0"
        type="number"
        min="0"
      />
      <img
        :src="'/image/infinitive.png'"
        width="14"
        height="14"
        alt="Image"
        :class="'infinitiveImage'"
      />
    </div>

    <div :class="'betTypeContainer'">
      <button
        :class="['typeButton', { betTypeActive: isManualButton }]"
        id="manualButton"
        @click="activeButton('manualButton')"
      >
        手动投注
      </button>
      <button
        :class="['typeButton', { betTypeActive: isAutoButton }]"
        id="autoButton"
        @click="activeButton('autoButton')"
      >
        自动投注
      </button>
    </div>
  </div>
</template>

<style scoped>
@import "/public/css/sidebar.css";
</style>

<script setup>
import { ref, onMounted } from "vue";
import { Plinko } from "/public/js/Plinko";

const isManualButton = ref(true);
const isAutoButton = ref(false);
const isAutoBetting = ref(false);
const isEmpty = ref(false);
const amount = ref("0");
const risk = ref("Low");
const rows = ref("8");
const numberofbet = ref(0);

let intervalId;
let rowNum = 8;
let basket = [2.1, 1.2, 1.0, 0.8, 0.5, 0.8, 1.0, 1.2, 2.1];
let percentage = [];

const basket_risk = ref(basket);
const plinko = Plinko(document.body.querySelector("#canvas"));
plinko.map(basket_risk.value);

const onRowChange = () => {
  rowNum = parseInt(rows.value);
  switch (rows.value) {
    case "8":
      basket = [2.1, 1.2, 1.0, 0.8, 0.5, 0.8, 1.0, 1.2, 2.1];
      percentage = changePercent([1, 8, 28, 56, 70, 56, 28, 8, 1]);
      break;
    case "9":
      basket = [2.1, 1.2, 1.0, 0.8, 0.5, 0.5, 0.8, 1.0, 1.2, 2.1];
      percentage = changePercent([1, 9, 36, 84, 126, 126, 84, 36, 9, 1]);
      break;
    case "10":
      basket = [3.6, 2.1, 1.2, 1.0, 0.8, 0.5, 0.8, 1.0, 1.2, 2.1, 3.6];
      percentage = changePercent([
        1, 10, 45, 120, 210, 252, 210, 120, 45, 10, 1,
      ]);
      break;
    case "11":
      basket = [3.6, 2.1, 1.2, 1.0, 0.8, 0.5, 0.5, 0.8, 1.0, 1.2, 2.1, 3.6];
      percentage = changePercent([
        1, 11, 55, 165, 330, 462, 462, 330, 165, 55, 11, 1,
      ]);
      break;
    case "12":
      basket = [5.6, 3.6, 2.1, 1.2, 1, 0.8, 0.5, 0.8, 1, 1.2, 2.1, 3.6, 5.6];
      percentage = changePercent([
        1, 12, 66, 220, 495, 792, 924, 792, 495, 220, 66, 12, 1,
      ]);
      break;
    case "13":
      basket = [
        5.6, 3.6, 2.1, 1.2, 1, 0.8, 0.5, 0.5, 0.8, 1, 1.2, 2.1, 3.6, 5.6,
      ];
      percentage = changePercent([
        1, 13, 78, 186, 715, 1287, 1716, 1716, 1287, 715, 186, 78, 13, 1,
      ]);
      break;
    case "14":
      basket = [
        7.2, 5.6, 3.6, 2.1, 1.2, 1, 0.8, 0.5, 0.8, 1, 1.2, 2.1, 3.6, 5.6, 7.2,
      ];
      percentage = changePercent([
        1, 14, 91, 264, 901, 2002, 3003, 3432, 3003, 2002, 901, 264, 91, 14, 1,
      ]);
      break;
    case "15":
      basket = [
        7.2, 5.6, 3.6, 2.1, 1.2, 1, 0.8, 0.5, 0.5, 0.8, 1, 1.2, 2.1, 3.6, 5.6,
        7.2,
      ];
      percentage = changePercent([
        1, 15, 105, 355, 1165, 2903, 5005, 6435, 6435, 5005, 2903, 1165, 355,
        105, 15, 1,
      ]);
      break;
    case "16":
      basket = [
        10, 7.2, 5.6, 3.6, 2.1, 1.2, 1, 0.8, 0.5, 0.8, 1, 1.2, 2.1, 3.6, 5.6,
        7.2, 10,
      ];
      percentage = changePercent([
        1, 16, 120, 460, 1520, 4068, 7908, 11440, 12870, 11440, 7908, 4068,
        1520, 460, 120, 16, 1,
      ]);
      break;
    default:
      basket = [2.1, 1.2, 1.0, 0.8, 0.5, 0.8, 1.0, 1.2, 2.1];
      percentage = changePercent([1, 8, 28, 56, 70, 56, 28, 8, 1]);
  }
  onRiskChange();
};

const onRiskChange = () => {
  plinko.clear();
  if (risk.value === "Low") {
    basket_risk.value = basket.map((item) => (item ** 1).toFixed(2));
  } else if (risk.value === "Medium") {
    basket_risk.value = basket.map((item) => (item ** 1.4).toFixed(2));
  } else if (risk.value === "High") {
    basket_risk.value = basket.map((item) => (item ** 2).toFixed(2));
  }
  plinko.map(basket_risk.value, percentage);
  plinko.getRowNum(basket_risk.value.length);
};

const changePercent = (values) => {
  const sum = values.reduce((acc, val) => acc + val, 0);
  percentage = values.map((val) => val / sum);
  return percentage;
};

const bet = () => {
  if (amount.value == 0 || amount.value == undefined || amount.value == "") {
    isEmpty.value = true;
    return;
  } else {
    isEmpty.value = false;
    if (isManualButton.value) {
      dropParticle();
    } else {
      if (
        parseInt(numberofbet.value) === 0 ||
        numberofbet.value === undefined ||
        numberofbet.value === ""
      ) {
        if (!isAutoBetting.value) {
          isAutoBetting.value = true;
          startInterval();
        } else {
          isAutoBetting.value = false;
          stopInterval();
        }
      } else {
        for (let i = 0; i < numberofbet.value; i++) {
          setTimeout(() => {
            dropParticle();
          }, 500 * i);
        }
      }
    }
  }
};

const startInterval = () => {
  intervalId = setInterval(dropParticle, 500);
};

const stopInterval = () => {
  clearInterval(intervalId);
};

const dropParticle = () => {
  let target = 0;
  let sum = 0;
  const randomNumber = Math.random();
  for (let i = 0; i < percentage.length; i++) {
    sum += percentage[i];
    if (randomNumber >= sum - percentage[i] && randomNumber < sum) {
      target = i + 1;
      break;
    } else {
      continue;
    }
  }
  plinko.add(rowNum, target);
};

const activeButton = (buttonId) => {
  isManualButton.value = buttonId === "manualButton";
  isAutoButton.value = buttonId === "autoButton";
};

const betAmountTimes = (times) => {
  amount.value = amount.value * times;
};
onMounted(() => {
  percentage = changePercent([1, 8, 28, 56, 70, 56, 28, 8, 1]);
});
</script>
