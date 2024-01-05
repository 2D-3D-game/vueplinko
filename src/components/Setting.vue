<template>
  <div :class="'footer-container'">
    <div :class="'button-group-container'">
      <div :class="'dropdown'">
        <button :class="['button-group', 'dropbtn']" @click="showSetting">
          <img :src="'/image/setting.png'" width="14" height="14" alt="Image" />
        </button>
        <div v-if="isShowSetting" class="dropdown-content">
          <div :class="'triangle'"></div>
          <div :class="'contents'">
            <img
              :src="volumn > 0 ? '/image/voice-active.png' : '/image/voice.png'"
              width="14"
              height="14"
              alt="Image"
            />
            <input type="range" v-model="volumn" max="100" min="0" />
          </div>
          <div :class="'contents'" @click="liveSetting">
            <img
              :src="isLive ? '/image/live-active.png' : '/image/live.png'"
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
                  ? '/image/animation-active.png'
                  : '/image/animation.png'
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
                isMaximum ? '/image/maxvalue-active.png' : '/image/maxvalue.png'
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
            <img :src="'/image/info.png'" width="14" height="14" alt="Image" />
            <span>{{ $t("info") }}</span>
          </div>
          <div :class="'contents'" @click="showHotkeySetting">
            <img :src="'/image/key.png'" width="14" height="14" alt="Image" />
            <span>{{ $t("keyboard") }}</span>
          </div>
        </div>
      </div>
      <button :class="'button-group'">
        <img :src="'/image/rect.png'" width="14" height="14" alt="Image" />
      </button>
      <button :class="'button-group'" @click="showStatistics">
        <img :src="'/image/total.png'" width="14" height="14" alt="Image" />
      </button>
      <button id="favorite" :class="'button-group'" @click="changeImage">
        <img
          :src="isFavorite ? '/image/favorite.png' : '/image/unfavorite.png'"
          width="14"
          height="14"
          alt="Image"
        />
      </button>
      <div :class="'divider'"></div>
    </div>
    <div :class="'footer-image'">
      <img :src="'/image/Vector.png'" alt="Image" width="68" height="25" />
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
    const volumn = ref(0);

    const changeImage = () => {
      isFavorite.value = !isFavorite.value;
    };

    const showSetting = () => {
      isShowSetting.value = !isShowSetting.value;
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
    };
  },
};
</script>
