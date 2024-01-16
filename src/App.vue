<template>
  <div :class="['mycontainer', appOpacity ? 'modalShow' : '']">
    <div
      id="app"
      class="app-container"
      :style="{ width: appWidth, height: appHeight }"
    ></div>
    <div
      id="canvas-container"
      :style="{ width: containerWidth, height: containerHeight }"
      class="canvas-container"
    >
      <div
        id="canvas"
        :style="{ width: canvasWidth, height: canvasHeight }"
        class="canvas"
      ></div>
    </div>
    <div id="overlay" class="overlay-container">
      <div class="profit-container">
        <div class="span-group">
          <span class="span-color">Profit to win</span>
          <span class="span-color" id="profit">$0.00</span>
        </div>
        <input
          class="profit-input"
          id="bitProfit"
          type="text"
          value="25.00000"
          readonly
        />
      </div>
      <div class="profit-container">
        <span class="span-color">Chance</span>
        <input
          class="profit-input"
          id="chance"
          type="text"
          value="0.396"
          readonly
        />
      </div>
    </div>
    <div v-if="score !== 0">
      <ScoreBoard />
    </div>
  </div>
</template>

<style scoped>
@import "./assets/css/style.css";
</style>

<script>
import { store } from "./core/Store";
import ScoreBoard from "./components/ScoreBoard.vue";

export default {
  components: {
    ScoreBoard,
  },

  computed: {
    appWidth() {
      return store.a_w;
    },
    appHeight() {
      return store.a_h;
    },
    containerWidth() {
      return store.co_w;
    },
    containerHeight() {
      return store.co_h;
    },
    canvasWidth() {
      return store.c_w;
    },
    canvasHeight() {
      return store.c_h;
    },
    appOpacity() {
      return store.appOpacity;
    },
    score() {
      return store.currentScore;
    }
  },
  setup() {},
};
</script>
