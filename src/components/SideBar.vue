<template>
  <div :class="'container'">
    <div :class="['betTypeContainer']">
      <button
        :class="[
          'typeButton',
          isAutoBetting && betting > 0 ? 'disabled' : '',
          { betTypeActive: isManualButton },
        ]"
        id="manualButton"
        @click="activeButton('manualButton')"
        :disabled="isAutoBetting && betting > 0"
      >
        {{ $t("manual") }}
      </button>
      <button
        :class="[
          'typeButton',
          isAutoBetting && betting > 0 ? 'disabled' : '',
          { betTypeActive: isAutoButton },
        ]"
        id="autoButton"
        @click="activeButton('autoButton')"
        :disabled="isAutoBetting && betting > 0"
      >
        {{ $t("auto") }}
      </button>
    </div>
    <div id="amountorder" :class="['amountorder']">
      <div :class="'betamountcontainer'">
        <div :class="'spanstyle'">{{ $t("amount") }}</div>
        <div :class="'spanstyle'" :style="{ fontSize: '12px' }">US$0.00</div>
      </div>
      <div :class="'betAmountContainer'">
        <div :class="['tooltip']">
          <input
            :class="[
              'betAmountInput',
              isAutoBetting ? 'disabled' : '',
              { warning: isEmpty },
            ]"
            :ref="'betAmountInput'"
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
        <div :class="['buttons-container', betting > 0 ? 'disabled' : '']">
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
    <div :class="['levelorder']">
      <div :class="'spanstyle'">{{ $t("risk") }}</div>
      <img
        :src="'/image/arrow-down.svg'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select
        :class="['baseStyle', betting > 0 ? 'disabled' : '']"
        v-model="level"
        @change="changeState"
        :disabled="betting > 0"
      >
        <option value="Low">{{ $t("level1") }}</option>
        <option value="Medium">{{ $t("level2") }}</option>
        <option value="High">{{ $t("level3") }}</option>
      </select>
    </div>
    <div :class="['roworder']">
      <div :class="'spanstyle'">{{ $t("rows") }}</div>
      <img
        :src="'/image/arrow-down.svg'"
        width="14"
        height="14"
        alt="Image"
        :class="'arrow-down'"
      />
      <select
        :class="['baseStyle', betting > 0 ? 'disabled' : '']"
        v-model="rows"
        @change="changeState"
        :disabled="betting > 0"
      >
        <option v-for="value in rowValues" :key="value" :value="value">
          {{ value }}
        </option>
      </select>
    </div>
    <div :class="['betNumberContainer']" v-if="isAutoButton">
      <div :class="'spanstyle'">{{ $t("betNumbers") }}</div>
      <input
        :class="['baseStyle', isAutoBetting ? 'disabled' : '']"
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
      :ref="`alert${i}`"
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
    const betting = ref(0);
    const betAmountInput = ref(null);

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
      const inputField = betAmountInput.value;
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
            isAutoBetting.value = true;
            for (let i = 0; i < numberofbet.value; i++) {
              setTimeout(() => {
                dropParticle();
                numberofbet.value = parseInt(numberofbet.value) - 1;
              }, 500 * i);
            }
            setTimeout(() => {
              isAutoBetting.value = false;
            }, 500 * numberofbet.value);
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
      betting.value = betting.value + 1;
    };

    const activeButton = (buttonId) => {
      isManualButton.value = buttonId === "manualButton";
      isAutoButton.value = buttonId === "autoButton";
      changeOrder();
    };

    const changeOrder = () => {
      if (window.innerWidth > 950) {
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
      if (newWidth < 1100) {
        changeOrder();
        if (newWidth > 950) {
          responsive(
            250 + (newWidth * 50) / 1200 + "px",
            (630 * newWidth) / 1200 + "px",
            "700px",
            (630 * newWidth) / 1200 + "px",
            "700px",
            (630 * newWidth) / 1200 + "px",
            950 + (newWidth * 50) / 1200 + "px",
            950 + (newWidth * 50) / 1200 + "px"
          );
        } else {
          responsive(
            "400px",
            "500px",
            "400px",
            "310px",
            "400px",
            "310px",
            "80vw",
            "400px"
          );
        }
      } else {
        responsive(
          "300px",
          "630px",
          "800px",
          "630px",
          "700px",
          "630px",
          "1100px",
          "1100px"
        );
      }
      plinko.map();
    };

    const responsive = (a_w, a_h, co_w, co_h, c_w, c_h, st_w, s_w) => {
      document.getElementById("app").style.height = a_h;
      document.getElementById("app").style.width = a_w;
      document.getElementById("canvas-container").style.height = co_h;
      document.getElementById("canvas-container").style.width = co_w;
      document.getElementById("canvas").style.height = c_h;
      document.getElementById("canvas").style.width = c_w;
      document.getElementById("statistics").style.width = st_w;
      document.getElementById("setting").style.width = s_w;
    };

    const handleDataUpdate = (event) => {
      if (event.detail === 1 || event.detail === 2) {
        betting.value = betting.value - 1;
      }
    };
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
      window.addEventListener("data-updated", handleDataUpdate);
    });

    onMounted(() => {
      window.addEventListener("data-updated", handleDataUpdate);
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
      betting,
      betAmountInput,
      activeButton,
      selectInput,
      betAmountTimes,
      changeState,
      bet,
    };
  },
};
</script>
