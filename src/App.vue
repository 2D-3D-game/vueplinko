<template>
  <div class="mycontainer">
    <div id="app" class="app-container" :ref="app"></div>
    <div id="canvas-container" class="canvas-container" :ref="container">
      <div id="canvas" :ref="canvas" class="canvas"></div>
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
  </div>
</template>

<style scoped>
@import "./assets/css/style.css";
</style>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import { store } from "./core/Store";

export default {
  setup() {
    const app = ref(null);
    const container = ref(null);
    const canvas = ref(null);

    const setStyle = () => {
      console.log(container.value);
      // if(app.value)
      // app.value.style.height = store.a_h;
      // app.value.style.width = store.a_w;
      // container.value.style.height = store.co_h;
      // container.value.style.width = store.co_w;
      // canvas.value.style.height = store.c_h;
      // canvas.value.style.width = store.c_w;
    };

    onMounted(() => {
      window.addEventListener("resize", setStyle);
    });

    onUnmounted(() => {
      window.removeEventListener("resize", setStyle);
    });

    return {
      app,
      container,
      canvas,
    };
  },
};
</script>
