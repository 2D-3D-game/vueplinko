<template>
  <div :class="'responsive'">
    <div
      :style="{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }"
    >
      <div :class="'mycontainer'">
        <!-- <div
          id="app"
          class="app-container"
          :style="{ width: appWidth, height: appHeight }"
        ></div> -->
        <div
          id="app"
          class="app-container"
        ></div>
        <!-- <div
          id="canvas-container"
          :style="{ width: containerWidth, height: containerHeight }"
          class="canvas-container"
        > -->
        <div
          id="canvas-container"
          class="canvas-container"
        >
          <!-- <div
            id="canvas"
            :style="{ width: canvasWidth, height: canvasHeight }"
            class="canvas"
          ></div> -->
          <div
            id="canvas"
            class="canvas"
          ></div>
        </div>
        <div v-if="score !== 0">
          <ScoreBoard />
        </div>
      </div>
      <Setting />
    </div>
    <Fairness v-if="showFairness" />
    <MaxValue v-if="showMaxModal" />
    <GameInfo v-if="showGameInfo" />
    <Hotkeys v-if="showHotkeyModal" />
  </div>
</template>

<style scoped>
@import "./assets/css/style.css";
</style>

<script>
import { store } from "./core/Store";
import ScoreBoard from "./components/ScoreBoard.vue";
import Setting from "./components/Setting.vue";
import Fairness from "./components/Modals/Fairness.vue";
import MaxValue from "./components/Modals/MaxValue.vue";
import GameInfo from "./components/Modals/GameInfo.vue";
import Hotkeys from "./components/Modals/Hotkeys.vue";

export default {
  components: {
    ScoreBoard,
    Fairness,
    Setting,
    MaxValue,
    GameInfo,
    Hotkeys,
  },

  computed: {
    // appWidth() {
    //   return store.a_w;
    // },
    // appHeight() {
    //   return store.a_h;
    // },
    // containerWidth() {
    //   return store.co_w;
    // },
    // containerHeight() {
    //   return store.co_h;
    // },
    // canvasWidth() {
    //   return store.c_w;
    // },
    // canvasHeight() {
    //   return store.c_h;
    // },
    score() {
      return store.currentScore;
    },
    showFairness() {
      return store.showFairness;
    },
    showMaxModal() {
      return store.showMaxValueModal;
    },
    showGameInfo() {
      return store.showGameInfoModal;
    },
    showHotkeyModal() {
      return store.showHotkeyModal;
    },
  },
};
</script>
