<template>
  <div
    id="setting"
    :style="{ width: settingWidth }"
    :class="'footer-container'"
  >
    <div :class="'button-group-container'">
      <div :class="'dropdown'">
        <div :class="'stooltip'">
          <button :class="['button-group', 'dropbtn']" @click="showSetting">
            <span
              ><img
                :src="settingSrc"
                width="14"
                height="14"
                alt="Image"
                @mouseover="handleMouseOver('setting')"
                @mouseout="handleMouseOut('setting')"
            /></span>
            <span class="tooltiptext">{{ $t("tooltip1") }}</span>
          </button>
        </div>
        <div v-if="isShowSetting" class="dropdown-content">
          <div :class="['contents']" :style="{ alignItems: 'end' }">
            <button>
              <span>
                <img
                  :src="
                    volumn > 0 ? '/image/voice-active.svg' : '/image/voice.svg'
                  "
                  width="16"
                  height="16"
                  alt="Image"
                  @click="volumn === 0 ? changeRange(50) : changeRange(0)"
                />
              </span>
            </button>
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
          <button
            :class="['contents', isLive ? 'unactivecontent' : 'activecontent']"
            @click="liveSetting"
          >
            <span
              ><img
                :src="isLive ? '/image/live-active.svg' : '/image/live.svg'"
                width="14"
                height="14"
                alt="Image"
              />
              <span :class="isLive ? 'active' : null">{{
                $t("live")
              }}</span></span
            >
          </button>
          <button
            :class="[
              'contents',
              isAnimation ? 'unactivecontent' : 'activecontent',
            ]"
            @click="animationSetting"
          >
            <span
              ><img
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
              }}</span></span
            >
          </button>
          <button
            :class="['contents', showMax ? 'unactivecontent' : 'activecontent']"
            @click="showMaxSetting"
          >
            <span
              ><img
                :src="
                  showMax ? '/image/maxvalue-active.svg' : '/image/maxvalue.svg'
                "
                width="14"
                height="14"
                alt="Image"
              />
              <span :class="showMax ? 'active' : ''">{{
                $t("maxvalue")
              }}</span></span
            >
          </button>
          <button :class="['contents', 'activecontent']" @click="showGameInfo">
            <span
              ><img
                :src="'/image/info.svg'"
                width="14"
                height="14"
                alt="Image"
              />
              <span>{{ $t("info") }}</span></span
            >
          </button>
          <button
            :class="[
              'contents',
              hotkeyState ? 'unactivecontent' : 'activecontent',
            ]"
            @click="showHotkeySetting"
          >
            <span
              ><img
                :src="hotkeyState ? '/image/key-active.svg' : '/image/key.svg'"
                width="14"
                height="14"
                alt="Image"
              />
              <span :class="hotkeyState ? 'active' : ''">{{
                $t("keyboard")
              }}</span></span
            >
          </button>
          <div :class="'triangle'"></div>
        </div>
      </div>
      <div :class="'stooltip'" v-if="showRect">
        <button :class="'button-group'">
          <span>
            <img
              :src="rectSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('rect')"
              @mouseout="handleMouseOut('rect')"
            />
          </span>
          <span class="tooltiptext">{{ $t("tooltip2") }}</span>
        </button>
      </div>
      <div :class="'stooltip'">
        <button :class="'button-group'" @click="showStatistics">
          <span>
            <img
              :src="totalSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('total')"
              @mouseout="handleMouseOut('total')"
            />
          </span>
          <span class="tooltiptext">{{ $t("tooltip3") }}</span>
        </button>
      </div>
      <div :class="'stooltip'">
        <button :class="'button-group'" @click="changeImage">
          <span>
            <img
              :src="isFavorite ? '/image/favorite.svg' : unSrc"
              width="14"
              height="14"
              alt="Image"
              @mouseover="handleMouseOver('un')"
              @mouseout="handleMouseOut('un')"
            />
          </span>
          <span class="tooltiptext">{{ $t("tooltip4") }}</span>
        </button>
      </div>
      <div :class="'divider'"></div>
    </div>
    <div :class="'footer-image'">
      <img :src="'/image/Vector.svg'" alt="Image" width="68" height="25" />
    </div>
    <button :style="{ background: 'transparent', border: 'none' }" @click="showFairness">
      <span :class="'footer-span'">{{ $t("fairness") }}</span>
    </button>
    <RealTimeStatistics />
  </div>
</template>

<style scoped>
@import "../assets/css/setting.css";
</style>

<script>
import { ref } from "vue";
import { mutations, store } from "../core/Store";
import RealTimeStatistics from "./Modals/RealTimeStatistics.vue";

export default {
  components: {
    RealTimeStatistics,
  },
  data() {
    return {
      settingSrc: "/image/setting.svg",
      rectSrc: "/image/rect.svg",
      totalSrc: "/image/total.svg",
      unSrc: "/image/unfavorite.svg",
    };
  },
  methods: {
    handleMouseOut(button) {
      this.settingSrc = "/image/setting.svg";
      this.rectSrc = "/image/rect.svg";
      this.totalSrc = "/image/total.svg";
      this.unSrc = "/image/unfavorite.svg";
    },
    handleMouseOver(button) {
      switch (button) {
        case "setting":
          this.settingSrc = "/image/settinghover.svg";
          break;
        case "total":
          this.totalSrc = "/image/totalhover.svg";
          break;
        case "rect":
          this.rectSrc = "/image/recthover.svg";
          break;
        case "un":
          this.unSrc = "/image/unfavoritehover.svg";
          break;
      }
    },
  },

  computed: {
    showMax() {
      return store.isMaximum;
    },
    hotkeyState() {
      return store.hotkey;
    },
    showRect() {
      return store.rectShow;
    },
    settingWidth() {
      return store.s_w;
    },
  },
  setup() {
    const isFavorite = ref(false);
    const isShowSetting = ref(false);
    const isLive = ref(false);
    const isAnimation = ref(false);
    const volumn = ref(50);
    const rectComponent = ref(null);
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
      if (!store.isMaximum) {
        mutations.showMaxValueModal();
        isShowSetting.value = false;
      } else {
        mutations.showMaximum(!store.isMaximum);
      }
    };

    const showGameInfo = () => {
      mutations.showGameInfoModal();
      isShowSetting.value = false;
    };

    const showHotkeySetting = () => {
      mutations.showHotkeyModal();
      isShowSetting.value = false;
    };

    const showStatistics = () => {
      mutations.showStatistics();
      isShowSetting.value = false;
    };

    const showFairness = () => {
      mutations.showFairness();
    }

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
      rectComponent,
      changeImage,
      showSetting,
      liveSetting,
      animationSetting,
      showMaxSetting,
      showGameInfo,
      showHotkeySetting,
      showStatistics,
      showFairness,
      changeRange,
    };
  },
};
</script>
