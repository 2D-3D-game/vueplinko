<template>
  <div :class="'container'">
    <div :class="['betTypeContainer', isAutoBetting ? 'disabled' : '']">
      <button
        :class="['typeButton', { betTypeActive: isManualButton }]"
        id="manualButton"
        @click="activeButton('manualButton')"
        :disabled="isAutoBetting"
      >
        {{ $t("manual") }}
      </button>
      <button
        :class="['typeButton', { betTypeActive: isAutoButton }]"
        id="autoButton"
        @click="activeButton('autoButton')"
        :disabled="isAutoBetting"
      >
        {{ $t("auto") }}
      </button>
    </div>
    <div
      id="amountorder"
      :class="['amountorder', isAutoBetting ? 'disabled' : '']"
    >
      <div :class="'betamountcontainer'">
        <div :class="'spanstyle'">{{ $t("amount") }}</div>
        <div :class="'spanstyle'" :style="{ fontSize: '12px' }">US$0.00</div>
      </div>
      <div :class="'betAmountContainer'">
        <div :class="'tooltip'">
          <input
            :class="['betAmountInput', { warning: isEmpty }]"
            v-model="amount"
            placeholder="0.000000000"
            type="number"
            min="0"
            step="0.000000001"
            @focus="selectInput"
            @change="changeState"
            :disabled="isAutoBetting"
          />
          <img
            id="bitImage"
            :src="'/image/bit.svg'"
            width="16"
            height="16"
            alt="Image"
            :class="'bitImage'"
          />
          <span class="tooltiptext">{{ $t("betamountalert") }}</span>
        </div>
        <div :class="'buttons-container'">
          <button
            :class="'betAmountTimesBtn'"
            @click="betAmountTimes(0.5)"
            :disabled="isAutoBetting"
          >
            ½
          </button>
          <button
            :class="'betAmountTimesBtn'"
            @click="betAmountTimes(2)"
            :disabled="isAutoBetting"
          >
            2x
          </button>
          <button
            id="timesmax"
            :class="'betAmountTimesBtn'"
            @click="betAmountTimes(999)"
            :disabled="isAutoBetting"
          >
            {{ $t("max") }}
          </button>
        </div>
      </div>
    </div>
    <div :class="['levelorder', isAutoBetting ? 'disabled' : '']">
      <div :class="'spanstyle'">{{ $t("risk") }}</div>
      <img
        :src="'/image/arrow-down.svg'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select
        :class="'baseStyle'"
        v-model="level"
        @change="changeState"
        :disabled="isAutoBetting"
      >
        <option value="Low">{{ $t("level1") }}</option>
        <option value="Medium">{{ $t("level2") }}</option>
        <option value="High">{{ $t("level3") }}</option>
      </select>
    </div>
    <div :class="['roworder', isAutoBetting ? 'disabled' : '']">
      <div :class="'spanstyle'">{{ $t("rows") }}</div>
      <img
        :src="'/image/arrow-down.svg'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select
        class="baseStyle"
        v-model="rows"
        @change="changeState"
        :disabled="isAutoBetting"
      >
        <option v-for="value in rowValues" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
    </div>
    <div
      :class="['betNumberContainer', isAutoBetting ? 'disabled' : '']"
      v-if="isAutoButton"
    >
      <div :class="'spanstyle'">{{ $t("betNumbers") }}</div>
      <input
        :class="'baseStyle'"
        v-model="numberofbet"
        placeholder="0"
        type="number"
        min="0"
        @change="changeState"
        :disabled="isAutoBetting"
      />
      <img
        :src="'/image/infinitive.svg'"
        width="14"
        height="14"
        alt="Image"
        :class="'infinitiveImage'"
      />
    </div>
    <div id="betbuttonorder" :class="'betbuttonorder'">
      <button :class="['baseStyle', 'betButton']" @click="bet">
        {{
          isManualButton
            ? $t("bet")
            : isAutoBetting
            ? $t("autobetstop")
            : $t("autobetstart")
        }}
        <img
          v-if="isAutoBetting"
          :src="'/image/betting.svg'"
          width="16"
          height="16"
          alt="Image"
          :class="'betting-image'"
        />
      </button>
    </div>
  </div>
  <div id="alert-container" :class="'alert-container'">
    <div
      v-for="i in 2"
      :key="i"
      :id="`alert${i}`"
      :class="'autobet-alert'"
      style="display: none"
    >
      <div :class="'auto-image'">
        <img
          :src="'/image/auto.svg'"
          width="20"
          height="20"
          alt="Image"
          :class="'infinitiveImage'"
        />
      </div>
      <span>{{ $t(`autobetalert${i}`) }}</span>
      <div :class="'close'">
        <img
          :src="'/image/times.svg'"
          width="14"
          height="14"
          alt="Image"
          :class="'infinitiveImage'"
        />
      </div>
      <div :id="`timeline${i}`"></div>
    </div>
  </div>
  <Setting />
  <Statistics />
  <Language />
</template>

<style scoped>
@import "../assets/css/sidebar.css";
</style>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { Plinko } from "../core/Plinko";
import { GlobalFunc } from "../core/GlobalFunc";
import Setting from "./Setting.vue";
import Statistics from "./Statistics.vue";
import Language from "./Language.vue";

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
    const rowValues = ["8", "9", "10", "11", "12", "13", "14", "15", "16"];
    let intervalId;

    const initialWidth = window.innerWidth;
    const initialHeight = window.innerHeight;

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
              showAlert(1);
            } else {
              isAutoBetting.value = false;
              stopInterval();
              showAlert(2);
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

    const showAlert = (index) => {
      const alertId = `alert${index}`;
      const timelineId = `timeline${index}`;

      const alertElement = document.getElementById(alertId);
      const timelineElement = document.getElementById(timelineId);

      if (alertElement.style.display === "flex") {
        return;
      } else {
        alertElement.style.display = "flex";
        alertElement.style.order = 1;
        alertElement.style.order = index === 1 ? 2 : 1;
        timelineElement.classList.add("alert-timeline");

        setTimeout(() => {
          alertElement.style.display = "none";
          timelineElement.classList.remove("alert-timeline");
        }, 2000);
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
      changeOrder();
    };

    const changeOrder = () => {
      if (window.innerWidth > 1050) {
        document.getElementById("betbuttonorder").style.order = 6;
        document.getElementById("amountorder").style.order = 1;
      } else {
        document.getElementById("betbuttonorder").style.order =
          isAutoButton.value ? 1 : 2;
        document.getElementById("amountorder").style.order = isAutoButton.value
          ? 2
          : 1;
      }
    };

    const betAmountTimes = (times) => {
      if (times === 999) {
        amount.value = 999999;
      }
      amount.value = amount.value * times;
    };

    const handleResize = () => {
      let newWidth = window.innerWidth;
      changeOrder();
      if (newWidth > 1050) {
        document.getElementById("app").style.height =
          (630 * newWidth) / initialWidth + "px";
        document.getElementById("canvas-container").style.height =
          (630 * newWidth) / initialWidth + "px";
        document.getElementById("canvas").style.height =
          (630 * newWidth) / initialWidth + "px";
      } else {
        document.getElementById("app").style.height = "500px";
        document.getElementById("canvas-container").style.height = "310px";
        document.getElementById("canvas").style.height = "310px";
      }
      plinko.map();
    };

    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });

    onMounted(() => {
      window.addEventListener("resize", handleResize);
      plinko.GetSettings(
        amount.value,
        level.value,
        rows.value,
        numberofbet.value,
        1000
      );
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
      rowValues,
      activeButton,
      selectInput,
      betAmountTimes,
      changeState,
      bet,
    };
  },
};
</script>
