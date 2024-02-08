<template>
  <div :class="['modal', showFairness ? 'active' : '']" @click="closeModal">
    <div
      :class="'modal__content'"
      :style="{
        maxHeight: buttonType === 'seed' ? '612px' : '664px',
        overflowY: 'auto',
        overflowX: 'hidden',
        height: '100%',
      }"
      @click.stop
    >
      <div :class="'modal-title'">
        <img :src="'/image/fairness.svg'" alt="Image" width="16" height="16" />
        <span>{{ $t("fairness") }}</span>
      </div>
      <div :class="'modal-body'">
        <div :class="'buttonContainer'">
          <button
            :class="buttonType === 'seed' ? 'activeButton' : 'deactiveButton'"
            @click="changeType('seed')"
          >
            <span :class="'white-span'">{{ $t("fairnesses.seed") }}</span>
          </button>
          <button
            :class="buttonType === 'verify' ? 'activeButton' : 'deactiveButton'"
            @click="changeType('verify')"
          >
            <span :class="'white-span'">{{ $t("fairnesses.verify") }}</span>
          </button>
        </div>
        <div :class="'input-container'" v-if="buttonType === 'seed'">
          <div :class="'gray-span'">{{ $t("fairnesses.text1") }}</div>
          <div :class="['inputBox', 'buttonbox']">
            <input
              :class="'inputStyle'"
              type="text"
              v-model="copy1"
              readonly
              :style="{ width: 'calc(100% - 46px)' }"
            />
            <div :class="'stooltip'" :style="{ width: '46px' }">
              <button :class="'copy'" @click="copyText('copy1')">
                <span>
                  <img
                    :src="'/image/copy-hover.svg'"
                    alt="Image"
                    width="14"
                    height="14"
                  />
                </span>
              </button>
              <span
                :class="['tooltiptext1', copied1 ? 'tooltiptext1-active' : '']"
                >{{ $t("copyText") }}</span
              >
            </div>
          </div>
        </div>
        <div :class="'input-container'" v-if="buttonType === 'seed'">
          <div :class="'gray-span'">{{ $t("fairnesses.text2") }}</div>
          <div :class="['inputBox', 'buttonbox']">
            <input
              :class="'inputStyle'"
              type="text"
              :style="{ width: 'calc(100% - 46px)' }"
              v-model="copy2"
              readonly
            />
            <div :class="'stooltip'" :style="{ width: '46px' }">
              <button :class="'copy'" @click="copyText('copy2')">
                <span>
                  <img
                    :src="'/image/copy-hover.svg'"
                    alt="Image"
                    width="14"
                    height="14"
                  />
                </span>
              </button>
              <span
                :class="['tooltiptext1', copied2 ? 'tooltiptext1-active' : '']"
                >{{ $t("copyText") }}</span
              >
            </div>
          </div>
        </div>
        <div :class="'input-container'" v-if="buttonType === 'seed'">
          <div :class="'gray-span'">{{ $t("fairnesses.text3") }}</div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'9,340'"
              readonly
            />
          </div>
        </div>
        <div :class="'plinko-container'" v-if="buttonType === 'verify'">
          <span
            :class="'gray-span'"
            :style="{ fontWeight: 400, fontFamily: 'PingFang SC' }"
            v-if="!stateChange"
          >
            {{ $t("fairnesses.verifyText1") }}
          </span>
          <img
            :src="'/image/betting1.svg'"
            width="16"
            height="16"
            alt="Image"
            :class="'betting-image'"
            v-if="!stateChange"
          />
          <div :class="'score'" v-if="stateChange">
            <div
              :class="'rect'"
              :style="{
                background: color,
                boxShadow: `0px 3px 0px 0px ${shadow}`,
              }"
            >
              <span :class="'gray-span'" :style="{ color: '#000' }">
                {{ score }}x
              </span>
            </div>
          </div>
        </div>
      </div>
      <div :class="'modal-footer'" v-if="buttonType === 'seed'">
        <span :class="'white-span'" :style="{ fontSize: '16px' }">{{
          $t("fairnesses.text4")
        }}</span>
        <div :class="'input-container'" :style="{ marginTop: '20px' }">
          <div :class="'gray-span'">
            {{ $t("fairnesses.text5") }}
            <span :class="'gray-span'" :style="{ color: '#E54161' }">*</span>
          </div>
          <div :class="['inputBox', 'buttonbox']">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'adT2z3laCC'"
              readonly
              :style="{
                background: 'transparent',
                border: '2px solid #203441',
                color: '#879097',
                cursor: 'not-allowed',
              }"
            />
            <button :class="'changeButton'">
              <span :class="'white-span'" :style="{ color: '#000' }">
                {{ $t("fairnesses.button") }}
              </span>
            </button>
          </div>
        </div>
        <div :class="'input-container'" :style="{ marginTop: '17px' }">
          <div :class="'gray-span'">{{ $t("fairnesses.text6") }}</div>
          <div :class="['inputBox', 'buttonbox']">
            <input
              :class="'inputStyle'"
              type="text"
              :style="{ width: 'calc(100% - 46px)' }"
              v-model="copy3"
              readonly
            />
            <div :class="'stooltip'" :style="{ width: '46px' }">
              <button :class="'copy'" @click="copyText('copy3')">
                <span>
                  <img
                    :src="'/image/copy-hover.svg'"
                    alt="Image"
                    width="14"
                    height="14"
                  />
                </span>
              </button>
              <span
                :class="['tooltiptext1', copied3 ? 'tooltiptext1-active' : '']"
                >{{ $t("copyText") }}</span
              >
            </div>
          </div>
        </div>
        <span
          :class="'gray-span'"
          :style="{
            alignSelf: 'flex-start',
            marginTop: '21px',
            marginBottom: '7px',
          }"
        >
          {{ $t("fairnesses.text7") }}Blackjack, Video Poker
        </span>
      </div>
      <div :class="'modal-footer verify'" v-if="buttonType === 'verify'">
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.game") }}</div>
          <div :class="'inputBox'">
            <select
              :class="'inputStyle'"
              v-model="game"
              @change="generateScore"
            >
              <option value="Blackjack">Blackjack</option>
              <option value="Crash">Crash</option>
              <option value="Dice">Dice</option>
              <option value="Hilo">Hilo</option>
              <option value="Limbo">Limbo</option>
              <option value="Mines">Mines</option>
              <option value="Plinko" selected>Plinko</option>
            </select>
            <img
              :src="'/image/arrow-down.svg'"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.clientSeed") }}</div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              v-model="clientSeed"
              @input="generateScore"
            />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.serverSeed") }}</div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              v-model="serverSeed"
              @input="generateScore"
            />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.nonce") }}</div>
          <div :class="['inputBox', 'buttonbox']">
            <input
              :class="['inputStyle', 'numberType']"
              v-model="nonce"
              type="number"
              :style="{ width: 'calc(100% - 108px)' }"
              @input="generateScore"
            />
            <button
              :class="'noncebutton'"
              :style="{ background: '#304554', top: 0, right: '54px' }"
              @click="changeNonce('minus')"
            >
              <span>
                <img
                  :src="'/image/arrow-down.svg'"
                  width="14"
                  height="14"
                  alt="Image"
                />
              </span>
            </button>
            <button
              :class="['noncebutton', 'beforebutton']"
              :style="{
                background: '#304554',
                top: 0,
                right: 0,
                borderRadius: '0px 4px 4px 0px',
              }"
              @click="changeNonce('plus')"
            >
              <span>
                <img
                  :src="'/image/arrow-down.svg'"
                  width="14"
                  height="14"
                  alt="Image"
                  :style="{ transform: 'rotate(180deg)' }"
                />
              </span>
            </button>
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("risk") }}</div>
          <div :class="'inputBox'">
            <select
              :class="'inputStyle'"
              v-model="level"
              @change="generateScore"
            >
              <option value="Low">{{ $t("level1") }}</option>
              <option value="Middle">{{ $t("level2") }}</option>
              <option value="High">{{ $t("level3") }}</option>
            </select>
            <img
              :src="'/image/arrow-down.svg'"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("rows") }}</div>
          <div :class="'inputBox'">
            <select :class="'inputStyle'" v-model="row" @change="generateScore">
              <option
                v-for="value in [8, 9, 10, 11, 12, 13, 14, 15, 16]"
                :key="value"
                :value="value"
              >
                {{ value }}
              </option>
            </select>
            <img
              :src="'/image/arrow-down.svg'"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            />
          </div>
        </div>
        <button :class="'bottomButton'">
          <span :class="'gray-span'">{{ $t("fairnesses.calcButton") }}</span>
        </button>
      </div>
      <button class="modal__close" @click="hideModal">
        <span
          ><img :src="'/image/times.svg'" alt="Image" width="10" height="10"
        /></span>
      </button>
    </div>
  </div>
</template>
<style scoped>
.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.32);
  transition: all 0.4s;
  z-index: 9;
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
}
.noncebutton-container {
  position: "absolute";
  top: 0;
  right: 0;
  border-radius: "0px 4px 4px 0px";
  width: 108px;
  height: 40px;
  display: "flex";
}
.buttonbox {
  display: flex;
}
.noncebutton {
  position: absolute;
  width: 54px;
  height: 40px;
  flex-shrink: 0;
  background: #304554;
  border: none;
}

.noncebutton:hover {
  background: #567086 !important;
}

.beforebutton::before {
  content: "";
  position: absolute;
  background: #1a2c38;
  height: 22px;
  top: 11px;
  left: -1px;
  width: 2px;
}
.changeButton {
  background: #16852d;
  width: 103px;
  height: 40px;
  top: 0;
  right: 0;
  border-radius: 0px 4px 4px 0px;
  position: absolute;
  border: none;
  cursor: not-allowed;
}

img.betting-image {
  margin-top: 12px;
  animation: mover 0.8s infinite alternate;
}
@keyframes mover {
  0% {
    transform: translateY(0px);
  }
  25% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(0px);
  }
  75% {
    transform: translateY(-2px);
  }
  100% {
    transform: translateY(0px);
  }
}
.verify {
  gap: 18px;
}
.verify .input-container .inputBox .inputStyle {
  border-radius: 4px;
  border: 2px solid #304554;
  background: #0f212e;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
}
.verify .input-container .inputBox .inputStyle:hover {
  border: 2px solid #567086;
}
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}
.plinko-container {
  width: 100%;
  border-radius: 8px;
  border: 2px dashed #304554;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.activeButton {
  display: flex;
  width: 65px;
  padding: 11px 37px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #304554;
  border: none;
  white-space: nowrap;
}
.deactiveButton {
  display: flex;
  width: 65px;
  padding: 11px 37px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: transparent;
  white-space: nowrap;
  border: none;
}
.deactiveButton:hover {
  border-radius: 30px;
  background: #304554;
}
.input-container {
  width: 100%;
}
.inputBox {
  width: 100%;
  position: relative;
}
.inputStyle {
  width: 100%;
  box-sizing: border-box;
  background: #304554;
  border: 2px solid #304554;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 14px;
  height: 40px;
  padding: 0 9px;
  appearance: none;
}
input,
select {
  font-size: 14px;
}
.inputStyle:hover {
  border: 2px solid #557086;
}
.inputStyle:focus {
  border: 2px solid #557086;
  outline: 0;
}
.inputBox .copy {
  position: absolute;
  top: 0;
  right: 0;
  background: #304554;
  border: none;
  padding: 0;
  width: 46px;
  height: 40px;
  border-radius: 0 4px 4px 0;
}
.inputBox .copy:hover {
  background: #567086;
}
.buttonbox .inputStyle {
  border-radius: 4px 0 0 4px;
}
.white-span {
  color: #fff;
  text-align: center;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.gray-span {
  color: #b1bad3;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.input-container .gray-span {
  font-family: Inter;
}
.input-container .inputStyle {
  font-family: Inter;
}

.inputBox:has(.copy:hover) > input {
  border: 2px solid #557086;
}
.changeButton span {
  font-family: Inter;
}
.bottomButton {
  margin-top: -5px;
  background: transparent;
  border: none;
  padding: 0;
}
.bottomButton:hover span {
  color: #fff;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 94vw;
  border-radius: 8px;
  background: #0f212e;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
}
.modal-footer {
  border-radius: 0px 0px 8px 8px;
  background: #0f212e;
  padding: 21px 16px 11px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.modal-title {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #fff;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  padding: 0 16px;
  padding-top: 16px;
  background: #1a2c37;
}
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 16px;
  padding-top: 20px;
  padding-bottom: 16px;
  background-color: #1a2c37;
}
.buttonContainer {
  display: flex;
  width: 160px;
  padding: 5px 6px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background: #0f212e;
  gap: 10px;
}
.numberType {
  border-radius: 4px 0 0 4px !important;
}
.numberType::-webkit-outer-spin-button,
.numberType::-webkit-inner-spin-button {
  margin-right: 9px;
  height: 22px;
  width: 16px;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
  background-color: transparent;
  border: none;
  font-size: 14px;
}
.score {
  position: relative;
  width: 100%;
  height: 36px;
  align-items: center;
  justify-content: center;
  display: flex;
}
.rect {
  border-radius: 4px;
  width: 48px;
  height: 40px;
  background: #fa223e;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<script>
import { ref, computed } from "vue";
import { store, mutations } from "../../core/Store";
import { GlobalFunc } from "../../core/GlobalFunc";

export default {
  computed: {
    showFairness() {
      return store.showFairness;
    },
  },
  methods: {
    closeModal(event) {
      if (event.target.classList.contains('modal')) {
        mutations.showFairness();
      }
    }
  },
  setup() {
    const buttonType = ref("seed");
    const nonce = ref(0);
    const copied1 = ref(false);
    const copied2 = ref(false);
    const copied3 = ref(false);
    const stateChange = ref(false);
    const game = ref("Plinko");
    const clientSeed = ref("");
    const serverSeed = ref("");
    const level = ref("Middle");
    const row = ref(16);
    const score = ref(null);
    const color = ref(null);
    const shadow = ref(null);
    const copy1 = ref(
      computed(() => {
        return store.active_client_seed;
      })
    );
    const copy2 = ref(
      computed(() => {
        return store.active_server_seed_hash;
      })
    );
    const copy3 = ref(
      computed(() => {
        return store.next_server_seed_hash;
      })
    );
    const hideModal = () => {
      mutations.showFairness();
    };
    const changeType = (req) => {
      buttonType.value = req;
    };
    const changeNonce = (req) => {
      generateScore();
      if (req === "plus") {
        nonce.value = nonce.value + 1;
      } else {
        nonce.value = nonce.value - 1;
        if (nonce.value < 0) {
          nonce.value = 0;
        }
      }
    };
    const copyText = (req) => {
      let text = "";
      switch (req) {
        case "copy1":
          text = copy1.value;
          copied1.value = true;
          setTimeout(() => {
            copied1.value = false;
          }, 1000);
          break;
        case "copy2":
          text = copy2.value;
          copied2.value = true;
          setTimeout(() => {
            copied2.value = false;
          }, 1000);
          break;
        case "copy3":
          text = copy3.value;
          copied3.value = true;
          setTimeout(() => {
            copied3.value = false;
          }, 1000);
          break;
      }
      navigator.clipboard.writeText(text);
    };
    const generateScore = () => {
      if (game.value === "Plinko" && serverSeed.value !== '') {
        stateChange.value = false;
        let info = GlobalFunc().generateRandomNumber(
          row.value,
          level.value.toLowerCase()
        );

        const redc = (info.color >> 16) & 255;
        const greenc = (info.color >> 8) & 255;
        const bluec = info.color & 255;

        const reds = (info.shadow >> 16) & 255;
        const greens = (info.shadow >> 8) & 255;
        const blues = info.shadow & 255;

        color.value = `rgb(${redc}, ${greenc}, ${bluec})`;
        shadow.value = `rgb(${reds}, ${greens}, ${blues})`;
        score.value = info.value;

        setTimeout(() => {
          stateChange.value = true;
        }, 300);
      }
    };
    return {
      buttonType,
      nonce,
      hideModal,
      changeType,
      changeNonce,
      copy1,
      copy2,
      copy3,
      copied1,
      copied2,
      copied3,
      copyText,
      stateChange,
      generateScore,
      game,
      clientSeed,
      serverSeed,
      level,
      row,
      score,
      color,
      shadow,
    };
  },
};
</script>
