<template>
  <div :class="'container'">
    <div :class="'betTypeContainer'">
      <button
        :class="['typeButton', { betTypeActive: isManualButton }]"
        id="manualButton"
        @click="activeButton('manualButton')"
      >
        {{ $t("manual") }}
      </button>
      <button
        :class="['typeButton', { betTypeActive: isAutoButton }]"
        id="autoButton"
        @click="activeButton('autoButton')"
      >
        {{ $t("auto") }}
      </button>
    </div>
    <div :class="'amountorder'">
      <div :class="'betamountcontainer'">
        <div :class="'spanstyle'">{{ $t("amount") }}</div>
        <div :class="'spanstyle'" :style="{ fontSize: '12px' }">US$0.00</div>
      </div>
      <div :class="'betAmountContainer'">
        <input
          :class="['betAmountInput', { warning: isEmpty }]"
          v-model="amount"
          placeholder="0.000000000"
          type="number"
          min="0"
          step="0.000000001"
          @focus="selectInput"
          @change="changeState"
        />
        <button :class="'betAmountTimesBtn-left'" @click="betAmountTimes(0.5)">
          ½
        </button>
        <div :class="'divider'"></div>
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
    </div>
    <div :class="'levelorder'">
      <div :class="'spanstyle'">{{ $t("risk") }}</div>
      <img
        :src="'/image/arrow-down.png'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select :class="'baseStyle'" v-model="level" @change="changeState">
        <option value="Low">{{ $t("level1") }}</option>
        <option value="Medium">{{ $t("level2") }}</option>
        <option value="High">{{ $t("level3") }}</option>
      </select>
    </div>
    <div :class="'roworder'">
      <div :class="'spanstyle'">{{ $t("rows") }}</div>
      <img
        :src="'/image/arrow-down.png'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select :class="'baseStyle'" v-model="rows" @change="changeState">
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
    </div>
    <div :class="'betNumberContainer'" v-if="isAutoButton">
      <div :class="'spanstyle'">{{ $t("betNumbers") }}</div>
      <input
        :class="'baseStyle'"
        v-model="numberofbet"
        placeholder="0"
        type="number"
        min="0"
        @change="changeState"
      />
      <img
        :src="'/image/infinitive.png'"
        width="14"
        height="14"
        alt="Image"
        :class="'infinitiveImage'"
      />
    </div>
    <div :class="'betbuttonorder'">
      <button :class="['baseStyle', 'betButton']" @click="bet">
        {{
          isManualButton
            ? $t("bet")
            : isAutoBetting
            ? $t("autobetstop")
            : $t("autobetstart")
        }}
      </button>
    </div>
  </div>
  <Setting />
  <Statistics />
  <Language />
</template>

<style scoped>
@import "./assets/css/sidebar.css";
</style>

<script>
import { ref, onMounted } from "vue";
import { Plinko } from "./core/Plinko";
import { GlobalFunc } from "./core/GlobalFunc";
import Setting from "./components/Setting.vue";
import Statistics from "./components/Statistics.vue";
import Language from "./components/Language.vue";

export default {
  components: {
    Setting,
    Statistics,
    Language,
  },
  setup() {
    const isManualButton = ref(true);
    const isAutoButton = ref(false);
    const isAutoBetting = ref(false);
    const isEmpty = ref(false);
    const amount = ref("0.000000000");
    const level = ref("Medium");
    const rows = ref("16");
    const numberofbet = ref(0);
    let intervalId;

    let initialWidth = window.innerWidth;

    const plinko = Plinko(document.body.querySelector("#canvas"));
    plinko.map();

    const changeState = () => {
      plinko.GetSettings(
        amount.value,
        level.value,
        rows.value,
        numberofbet.value,
        1000
      );
      plinko.clear();
      plinko.map();
    };
    const selectInput = () => {
      const inputField = document.querySelector(".betAmountInput");
      if (inputField) {
        inputField.select();
      }
    };
    const bet = () => {
      if (
        amount.value == 0 ||
        amount.value == undefined ||
        amount.value == ""
      ) {
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
                numberofbet.value = parseInt(numberofbet.value) - 1;
              }, 500 * i);
            }
          }
        }
      }
    };

    const startInterval = () => {
      intervalId = setInterval(dropParticle, 300);
    };

    const stopInterval = () => {
      clearInterval(intervalId);
    };

    const dropParticle = () => {
      let target = 0;
      let sum = 0;
      const percentage = GlobalFunc().probabilities["_" + rows.value];
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
      plinko.add(target);
    };

    const activeButton = (buttonId) => {
      isManualButton.value = buttonId === "manualButton";
      isAutoButton.value = buttonId === "autoButton";
    };

    const betAmountTimes = (times) => {
      amount.value = amount.value * times;
    };

    const changeWidth = () => {
      setInterval(() => {
        let w = window.innerWidth;
        if (w !== initialWidth) {
          plinko.map();
          initialWidth = w;
        }
      }, 200);
    };

    onMounted(() => {
      plinko.GetSettings(
        amount.value,
        level.value,
        rows.value,
        numberofbet.value,
        1000
      );
      changeWidth();
    });
    return {
      isManualButton,
      isAutoButton,
      isAutoBetting,
      isEmpty,
      amount,
      level,
      rows,
      numberofbet,
      activeButton,
      selectInput,
      betAmountTimes,
      changeState,
      bet,
    };
  },
};
</script>
