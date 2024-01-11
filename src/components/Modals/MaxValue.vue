<template>
  <div :ref="'demomodal'" :class="'modal'">
    <div :class="'modal__content'">
      <div :class="'modal-title'">
        <img
          :src="'/image/max-setting.svg'"
          alt="Image"
          width="16"
          height="16"
        />
        <span>{{ $t("maxvalue") }}</span>
      </div>
      <div :class="'modal-body'">
        <span>{{
          this.isMaximum ? $t("maxquestion2") : $t("maxquestion1")
        }}</span>
      </div>
      <div :class="'modal__footer'">
        <button :class="'activeButton'" @click="setMaximum">
          {{ this.isMaximum ? $t("turnOff") : $t("turnOn") }}
        </button>
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
  width: 68px;
  height: 44px;
  flex-shrink: 0;
  border: none;
  border-radius: 4px;
  background: #17e702;
  color: #05080a;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.modal__content {
  border-radius: 4px;
  position: relative;
  width: 500px;
  max-width: 90%;
  background: #1a2c37;
  padding: 1em 2em;
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
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}
.modal__footer {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
import { ref } from "vue";
export default {
  props: {
    isMaximum: {
      type: Boolean,
      required: true,
    },
  },

  setup() {
    const demomodal = ref(null);

    const hideModal = () => {
      const modal = demomodal.value;
      modal.classList.toggle("active");
    };
    return {
      demomodal,
      hideModal,
    };
  },

  methods: {
    setMaximum() {
      this.$emit("update:isMaximum", !this.isMaximum);
      this.hideModal();
      if (!this.isMaximum) {
        document.getElementById("timesmax").style.display = "block";
      } else {
        document.getElementById("timesmax").style.display = "none";
      }
    },
  },
};
</script>
