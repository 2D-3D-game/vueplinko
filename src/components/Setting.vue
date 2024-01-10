<template>
  <div :class="'footer-container'">
    <div :class="'button-group-container'">
      <div :class="'dropdown'">
        <button :class="['button-group', 'dropbtn']" @click="showSetting">
          <img :src="'/image/setting.svg'" width="14" height="14" alt="Image" />
        </button>
        <div v-if="isShowSetting" class="dropdown-content">
          <div :class="'contents'">
            <img
              :src="volumn > 0 ? '/image/voice-active.svg' : '/image/voice.svg'"
              width="14"
              height="14"
              alt="Image"
              @click="volumn === 0 ? changeRange(50) : changeRange(0)"
            />
            <div :style="{ position: 'relative' }">
              <input
                type="range"
                v-model="volumn"
                max="100"
                min="0"
                id="volumn"
                @input="changeRange(volumn)"
              />
            </div>
          </div>
          <div :class="'contents'" @click="liveSetting">
            <img
              :src="isLive ? '/image/live-active.svg' : '/image/live.svg'"
              width="14"
              height="14"
              alt="Image"
            />
            <span :class="isLive ? 'active' : null">{{ $t("live") }}</span>
          </div>
          <div :class="'contents'" @click="animationSetting">
            <img
              :src="
                isAnimation
                  ? '/image/animation-active.svg'
                  : '/image/animation.svg'
              "
              width="14"
              height="14"
              alt="Image"
            />
            <span :class="isAnimation ? 'active' : null">{{
              $t("animation")
            }}</span>
          </div>
          <div :class="'contents'" @click="showMaxSetting">
            <img
              :src="
                isMaximum ? '/image/maxvalue-active.svg' : '/image/maxvalue.svg'
              "
              width="14"
              height="14"
              alt="Image"
            />
            <span :class="isMaximum ? 'active' : null">{{
              $t("maxvalue")
            }}</span>
          </div>
          <div :class="'contents'" @click="showGameInfo">
            <img :src="'/image/info.svg'" width="14" height="14" alt="Image" />
            <span>{{ $t("info") }}</span>
          </div>
          <div :class="'contents'" @click="showHotkeySetting">
            <img :src="'/image/key.svg'" width="14" height="14" alt="Image" />
            <span>{{ $t("keyboard") }}</span>
          </div>
          <div :class="'triangle'"></div>
        </div>
      </div>
      <button :class="'button-group'">
        <img :src="'/image/rect.svg'" width="14" height="14" alt="Image" />
      </button>
      <button :class="'button-group'" @click="showStatistics">
        <img :src="'/image/total.svg'" width="14" height="14" alt="Image" />
      </button>
      <button id="favorite" :class="'button-group'" @click="changeImage">
        <img
          :src="isFavorite ? '/image/favorite.svg' : '/image/unfavorite.svg'"
          width="14"
          height="14"
          alt="Image"
        />
      </button>
      <div :class="'divider'"></div>
    </div>
    <div :class="'footer-image'">
      <img :src="'/image/Vector.svg'" alt="Image" width="68" height="25" />
    </div>
    <div>
      <span :class="'footer-span'">{{ $t("fairness") }}</span>
    </div>
    <MaxValue :isMaximum="isMaximum" @update:isMaximum="isMaximum = $event" />
    <GameInfo />
    <Hotkeys />
    <RealTimeStatistics />
  </div>
</template>

<style scoped>
@import "../assets/css/setting.css";
</style>

<script>
import { ref } from "vue";
import MaxValue from "./Modals/MaxValue.vue";
import GameInfo from "./Modals/GameInfo.vue";
import Hotkeys from "./Modals/Hotkeys.vue";
import RealTimeStatistics from "./Modals/RealTimeStatistics.vue";

export default {
  components: {
    MaxValue,
    GameInfo,
    Hotkeys,
    RealTimeStatistics,
  },
  setup() {
    const isFavorite = ref(false);
    const isShowSetting = ref(false);
    const isLive = ref(false);
    const isAnimation = ref(false);
    const isMaximum = ref(false);
    const volumn = ref(50);

    const changeImage = () => {
      isFavorite.value = !isFavorite.value;
    };

    const showSetting = () => {
      isShowSetting.value = !isShowSetting.value;
      if (isShowSetting.value) {
        setTimeout(() => {
          changeRange(volumn.value);
        }, 10);
      }
    };

    const liveSetting = () => {
      isLive.value = !isLive.value;
    };

    const animationSetting = () => {
      isAnimation.value = !isAnimation.value;
    };

    const showMaxSetting = () => {
      const modal = document.getElementById("demo-modal");
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showGameInfo = () => {
      const modal = document.getElementById("gameinfo-modal");
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showHotkeySetting = () => {
      const modal = document.getElementById("hotkeys-modal");
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showStatistics = () => {
      const modal = document.getElementById("realtime-modal");
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const changeRange = (req) => {
      const volumeElement = document.getElementById("volumn");
      if (volumeElement) {
        volumn.value = req;
        volumeElement.style.setProperty("--width", req * 0.86 + "%");
      }
    };

    return {
      isFavorite,
      isShowSetting,
      isLive,
      isAnimation,
      isMaximum,
      volumn,
      changeImage,
      showSetting,
      liveSetting,
      animationSetting,
      showMaxSetting,
      showGameInfo,
      showHotkeySetting,
      showStatistics,
      changeRange,
    };
  },
};
</script>
