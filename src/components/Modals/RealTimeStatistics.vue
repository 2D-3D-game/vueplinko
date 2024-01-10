<template>
  <div id="realtime-modal" :class="'modal'">
    <div :class="'modal__content'">
      <div :class="'modal-title'">
        <img :src="'/image/total.svg'" alt="Image" width="16" height="16" />
        <span>{{ $t("statistics") }}</span>
      </div>
      <div :class="'modal-body'">
        <div :class="'type-container'">
          <div :class="'type-selector'">
            <img
              :src="'/image/arrow-down.svg'"
              width="14"
              height="14"
              alt="Image"
              :class="'arrow-down'"
            />
            <select :class="'baseStyle'">
              <option value="all">{{ $t("type1") }}</option>
              <option value="bet" selected>{{ $t("type2") }}</option>
              <option value="competition">{{ $t("type3") }}</option>
              <option value="hide">{{ $t("type4") }}</option>
            </select>
          </div>
          <img :src="'/image/refresh.svg'" alt="Image" width="14" height="14" />
        </div>
        <div :class="'game-selector'">
          <img
            :src="'/image/arrow-down.svg'"
            width="14"
            height="14"
            alt="Image"
            :class="'arrow-down'"
          />
          <select :class="'baseStyle'">
            <option value="all">{{ $t("type1") }}</option>
            <option value="plinko">Plinko</option>
          </select>
        </div>
        <div :class="'score'">
          <div :class="'left'">
            <span>{{ $t("left1") }}</span>
            <span :class="['number', 'success']">
              0.00000000
              <img :src="'/image/bit.svg'" width="14" height="14" alt="Image" />
            </span>
            <span>{{ $t("left2") }}</span>
            <span :class="['number']">
              0.00000000
              <img :src="'/image/bit.svg'" width="14" height="14" alt="Image" />
            </span>
          </div>
          <div :class="'right'">
            <span>{{ $t("right1") }}</span>
            <span :class="['number', 'success']"> 8 </span>
            <span>{{ $t("right2") }}</span>
            <span :class="['number', 'failed']"> 7 </span>
          </div>
        </div>
        <div :class="'content'">
          <div :class="'line'">
            <hr />
          </div>
        </div>
      </div>
      <a href="#" class="modal__close" @click="hideModal">
        <img :src="'/image/times.svg'" alt="Image" width="14" height="14" />
      </a>
    </div>
  </div>
</template>
<style scoped>
.modal {
  visibility: hidden;
  opacity: 0;
  position: fixed;
  right: 50px;
  bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.4s;
  z-index: 999;
}
.modal.active {
  visibility: visible;
  opacity: 1;
}
.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  position: relative;
  width: 280px;
  max-width: 90%;
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
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  border-radius: 8px 8px 0px 0px;
  background: #1a2c37;
  padding: 1em 1em;
}
.modal-body {
  height: 485px;
  flex-shrink: 0;
  border-radius: 0px 0px 8px 8px;
  background: #213743;
  padding: 1em 1em;
  box-shadow: 0px 13px 29px 0px rgba(0, 0, 0, 0.1),
    0px 53px 53px 0px rgba(0, 0, 0, 0.09),
    0px 120px 72px 0px rgba(0, 0, 0, 0.05),
    0px 213px 85px 0px rgba(0, 0, 0, 0.01), 0px 333px 93px 0px rgba(0, 0, 0, 0);
  display: flex;
  flex-direction: column;
}
.modal__close {
  position: absolute;
  top: 15px;
  right: 10px;
  text-decoration: none;
}

.score {
  width: 100%;
  height: 120px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  margin-top: 20px;
  display: flex;
}

.score .left {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-right: 2px solid #213743;
  margin: 15px;
  padding-right: 35px;
}

.score .right {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 15px;
}

span {
  color: #b1bad3;
  font-family: PingFang SC;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  display: flex;
  align-items: baseline;
  gap: 5px;
}

.number {
  color: #fff;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
}
.success {
  color: #17e700;
}

.failed {
  color: #ed4163;
}
.content {
  width: 100%;
  height: 220px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  margin-top: 20px;
  position: relative;
}

.line {
  width: 90%;
  position: absolute;
  bottom: 10px;
  margin-left: 5%;
}
.type-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.type-selector {
  width: 74px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
}

.game-selector {
  height: 40px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #0f212e;
  position: relative;
  margin-top: 20px;
}
.baseStyle {
  width: 100%;
  height: 40px;
  background-color: #0f212e;
  border: none;
  border-radius: 4px;
  color: #fff;
  margin-bottom: 10px;
}

select {
  box-sizing: border-box;
  width: 100%;
  padding-left: 8px;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

.arrow-down {
  position: absolute;
  top: 13px;
  right: 10px;
}
</style>

<script>
export default {
  methods: {
    hideModal() {
      const modal = document.getElementById("realtime-modal");
      modal.classList.toggle("active");
    },
  },
};
</script>
