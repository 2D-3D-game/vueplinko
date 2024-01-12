<template>
  <div id="setting" :class="'footer-container'">
    <div :class="'button-group-container'">
      <div :class="'dropdown'">
        <button :class="['button-group', 'dropbtn']" @click="showSetting">
          <img :src="'/image/setting.svg'" width="14" height="14" alt="Image" />
        </button>
        <div v-if="isShowSetting" class="dropdown-content">
          <div :class="'contents'" :style="{alignItems:'end'}">
            <img
              :src="volumn > 0 ? '/image/voice-active.svg' : '/image/voice.svg'"
              width="16"
              height="16"
              alt="Image"
              @click="volumn === 0 ? changeRange(50) : changeRange(0)"
            />
            <div :style="{ position: 'relative' }">
              <input
                type="range"
                v-model="volumn"
                max="100"
                min="0"
                :ref="'inputRange'"
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
                showMax ? '/image/maxvalue-active.svg' : '/image/maxvalue.svg'
              "
              width="14"
              height="14"
              alt="Image"
            />
            <span :class="showMax ? 'active' : null">{{ $t("maxvalue") }}</span>
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
      <button :class="'button-group'" @click="changeImage">
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
    <MaxValue :ref="'maxValueComponent'" />
    <GameInfo :ref="'gameInfoComponent'" />
    <Hotkeys :ref="'hotkeyComponent'" />
    <RealTimeStatistics :ref="'stComponent'" />
  </div>
</template>

<style scoped>
@import "../assets/css/setting.css";
</style>

<script>
import { ref } from "vue";
import { store } from "../core/Store";
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
  computed: {
    showMax() {
      return store.isMaximum;
    },
  },
  setup() {
    const isFavorite = ref(false);
    const isShowSetting = ref(false);
    const isLive = ref(false);
    const isAnimation = ref(false);
    const volumn = ref(50);
    const gameInfoComponent = ref(null);
    const hotkeyComponent = ref(null);
    const maxValueComponent = ref(null);
    const stComponent = ref(null);
    const inputRange = ref(null);

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
      const modal = maxValueComponent.value.$refs.demomodal;
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showGameInfo = () => {
      const modal = gameInfoComponent.value.$refs.gameinfomodal;
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showHotkeySetting = () => {
      const modal = hotkeyComponent.value.$refs.hotkeymodal;
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const showStatistics = () => {
      const modal = stComponent.value.$refs.stmodal;
      modal.classList.toggle("active");
      isShowSetting.value = false;
    };

    const changeRange = (req) => {
      const volumeElement = inputRange.value;
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
      volumn,
      inputRange,
      gameInfoComponent,
      hotkeyComponent,
      maxValueComponent,
      stComponent,
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
