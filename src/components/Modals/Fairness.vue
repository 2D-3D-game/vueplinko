<template>
  <div :class="['modal', showFairness ? 'active' : '']">
    <div
      :class="'modal__content'"
      :style="{
        height: buttonType === 'seed' ? '610px' : '664px',
        overflowY: buttonType === 'seed' ? 'hidden' : 'auto',
        overflowX: 'hidden',
      }"
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
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'edr74dsfsg3df5644'"
              readonly
            />
            <button>
              <span>
                <img
                  :src="'/image/copy.svg'"
                  alt="Image"
                  width="14"
                  height="14"
                />
              </span>
            </button>
          </div>
        </div>
        <div :class="'input-container'" v-if="buttonType === 'seed'">
          <div :class="'gray-span'">{{ $t("fairnesses.text2") }}</div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'edr74dsfsg3df5644gguyg34534536uigiugigig346346346uig346'"
              readonly
            />
            <button>
              <span>
                <img
                  :src="'/image/copy.svg'"
                  alt="Image"
                  width="14"
                  height="14"
                />
              </span>
            </button>
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
          <span :class="'gray-span'" :style="{ fontWeight: 400 }">{{
            $t("fairnesses.verifyText1")
          }}</span>
          <img
            :src="'/image/betting1.svg'"
            width="16"
            height="16"
            alt="Image"
            :class="'betting-image'"
          />
        </div>
      </div>
      <div :class="'modal-footer'" v-if="buttonType === 'seed'">
        <span :class="'white-span'" :style="{ fontSize: '16px' }">{{
          $t("fairnesses.text4")
        }}</span>
        <div :class="'input-container'">
          <div :class="'gray-span'">
            {{ $t("fairnesses.text5") }}
            <span :class="'gray-span'" :style="{ color: '#E54161' }">*</span>
          </div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'adT2z3laCC'"
              readonly
              :style="{
                background: 'transparent',
                border: '2px solid #203441',
                color: '#879097',
              }"
            />
            <button
              :style="{
                background: '#16852D',
                width: '103px',
                height: '44px',
                top: 0,
                right: 0,
                borderRadius: '0px 4px 4px 0px',
              }"
            >
              <span :class="'white-span'" :style="{ color: '#000' }">
                {{ $t("fairnesses.button") }}
              </span>
            </button>
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("fairnesses.text6") }}</div>
          <div :class="'inputBox'">
            <input
              :class="'inputStyle'"
              type="text"
              :value="'sgfsg345345h34jh634534jh534j5h3j45h3j45jh345j345hjj35'"
              readonly
            />
            <button>
              <span>
                <img
                  :src="'/image/copy.svg'"
                  alt="Image"
                  width="14"
                  height="14"
                />
              </span>
            </button>
          </div>
        </div>
        <span :class="'gray-span'" :style="{ alignSelf: 'flex-start' }">
          {{ $t("fairnesses.text7") }}Blackjack, Video Poker
        </span>
      </div>
      <div :class="'modal-footer verify'" v-if="buttonType === 'verify'">
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.game") }}</div>
          <div :class="'inputBox'">
            <select
              :class="'inputStyle'"
              :style="{ width: '468px', height: '44px' }"
            >
              <option value="Blackjack">Blackjack</option>
              <option value="Crash">Crash</option>
              <option value="Dice">Dice</option>
              <option value="Hilo">Hilo</option>
              <option value="Limbo">Limbo</option>
              <option value="Mines">Mines</option>
              <option value="Plinko">Plinko</option>
            </select>
            <img
              :src="'/image/arrow-down.svg'"
              width="14"
              height="14"
              alt="Image"
              :style="{ position: 'absolute', right: '12px', top: '15px' }"
            />
            <!-- <input :class="'inputStyle'" type="text" /> -->
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.clientSeed") }}</div>
          <div :class="'inputBox'">
            <input :class="'inputStyle'" type="text" />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.serverSeed") }}</div>
          <div :class="'inputBox'">
            <input :class="'inputStyle'" type="text" />
          </div>
        </div>
        <div :class="'input-container'">
          <div :class="'gray-span'">{{ $t("verifyTexts.nonce") }}</div>
          <div :class="'inputBox'">
            <input :class="'inputStyle'" type="text" />
            <button
              :class="'noncebutton'"
              :style="{ background: '#304554', top: 0, right: '54px' }"
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
              :style="{ width: '468px', height: '44px' }"
            >
              <option value="Low">{{ $t("level1") }}</option>
              <option value="Medium">{{ $t("level2") }}</option>
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
            <select
              :class="'inputStyle'"
              :style="{ width: '468px', height: '44px' }"
            >
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
  position: fixed;
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
}
.noncebutton-container {
  position: "absolute";
  top: 0;
  right: 0;
  borderradius: "0px 4px 4px 0px";
  width: 108px;
  height: 44px;
  display: "flex";
}

.noncebutton {
  width: 54px;
  height: 44px;
  flex-shrink: 0;
  background: #304554;
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
.verify .input-container .inputBox .inputStyle {
  border-radius: 4px;
  border: 2px solid #304554;
  background: #0f212e;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
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
  width: 446px;
  background: #304554;
  border: 2px solid #304554;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  color: #fff;
  font-family: PingFang SC;
  font-weight: 600;
  height: 40px;
  padding: 0 9px;
  appearance: none;
}
.inputStyle:hover {
  border: 2px solid #557086;
}
.inputStyle:focus {
  border: 2px solid #557086;
  outline: 0;
}
.inputBox button {
  position: absolute;
  top: 13px;
  right: 15px;
  background: transparent;
  border: none;
  padding: 0;
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
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  padding-top: 16px;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
}
.modal-footer {
  width: 468px;
  border-radius: 0px 0px 8px 8px;
  background: #0f212e;
  padding: 21px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  margin-top: 16px;
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
}
.modal-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 17px;
  margin-top: 20px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding: 0 16px;
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
</style>

<script>
import { ref } from "vue";
import { store, mutations } from "../../core/Store";

export default {
  computed: {
    showFairness() {
      return store.showFairness;
    },
  },
  setup() {
    const buttonType = ref("seed");
    const hideModal = () => {
      mutations.showFairness();
    };
    const changeType = (req) => {
      buttonType.value = req;
    };
    return {
      buttonType,
      hideModal,
      changeType,
    };
  },
};
</script>
