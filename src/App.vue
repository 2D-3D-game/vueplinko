<template>
  <div class="mycontainer">
    <div id="app" class="app-container"></div>
    <div id="canvas-container" class="canvas-container">
      <div id="canvas" class="canvas"></div>
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
