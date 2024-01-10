<template>
  <div id="hotkeys-modal" :class="'modal'">
    <div :class="'modal__content'">
      <div :class="'modal-title'">
        <img
          :src="'/image/hotkey-setting.svg'"
          alt="Image"
          width="16"
          height="16"
        />
        <span>{{ $t("keyboard") }}</span>
      </div>
      <div :class="'modal-body'">
        <div :class="'hotkey-row'">
          <span>{{ $t("hotkey1") }}</span>
          <span :class="'hotkey'">Space</span>
        </div>
        <div :class="'hotkey-row'">
          <span>{{ $t("hotkey2") }}</span>
          <span :class="'hotkey'">s</span>
        </div>
        <div :class="'hotkey-row'">
          <span>{{ $t("hotkey3") }}</span>
          <span :class="'hotkey'">a</span>
        </div>
        <div :class="'hotkey-row'">
          <span>{{ $t("hotkey4") }}</span>
          <span :class="'hotkey'">d</span>
        </div>
        <div :class="'hotkey-info'">
          <img
            :src="'/image/information.svg'"
            alt="Image"
            width="16"
            height="16"
          />
          <span>
            {{ $t("hotkeyInfo") }}
          </span>
        </div>
      </div>
      <div :class="'modal__footer'">
        <label class="check-container"
          >{{ $t("hotkeyUse") }}
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
      </div>
      <a href="#" class="modal__close" @click="hideModal">&times;</a>
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
}
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}

.activeButton {
  width: 106px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 30px;
  background: #223d49;
  border: 5px solid #0a1e29;
  color: #fff;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.modal__content {
  position: relative;
  width: 500px;
  max-width: 90%;
  padding: 1em 2em;
  border-radius: 8px;
  background: #1a2c37;
  box-shadow: 0px 1px 0px 0px #253541 inset,
    0px 11px 0px 0px rgba(0, 0, 0, 0.14);
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
}
.modal-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  margin-top: 30px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.hotkey-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.hotkey {
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #d5dceb;
  font-family: PingFang SC;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  border-radius: 4px;
  background: #2f4552;
  box-shadow: 0px 1px 0px 0px #394e5a inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.28);
}

.hotkey-info {
  width: 468px;
  height: 75px;
  flex-shrink: 0;
  border-radius: 8px;
  border: 2px dashed #b1bad3;
  background: #0f212e;
  display: flex;
  padding: 15px;
  margin-top: 20px;
}

.hotkey-info span {
  margin-left: 16px;
}
.modal__footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #0f212e;
  margin-left: -2em;
  margin-right: -2em;
  margin-bottom: -1em;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding-top: 16px;
  padding-bottom: 30px;
}

.check-container {
  display: flex;
  position: relative;
  padding-left: 40px;
  padding-top: 5px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

.check-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 24px;
  width: 24px;
  border-radius: 3px;
  border: 2px solid #2f4552;
  background: #0f212e;
  box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.25);
}

.check-container:hover input ~ .checkmark {
  background-color: #fff;
}

.check-container input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.check-container input:checked ~ .checkmark:after {
  display: block;
}

.check-container .checkmark:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}

.modal__footer span {
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-left: 8px;
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}
</style>

<script>
export default {
  methods: {
    hideModal() {
      const modal = document.getElementById("hotkeys-modal");
      modal.classList.toggle("active");
    },
  },
};
</script>
