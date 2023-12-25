<template>
  <div :class="'footer-container'">
    <div :class="'button-group-container'">
      <button :class="'button-group'">
        <img :src="'/image/setting.png'" width="14" height="14" alt="Image" />
      </button>
      <button :class="'button-group'">
        <img :src="'/image/rect.png'" width="14" height="14" alt="Image" />
      </button>
      <button :class="'button-group'">
        <img :src="'/image/total.png'" width="14" height="14" alt="Image" />
      </button>
      <button :class="'button-group'">
        <img :src="'/image/star.png'" width="14" height="14" alt="Image" />
      </button>
      <div :class="'divider'"></div>
    </div>
    <div :class="'footer-image'">
      <img :src="'/image/Vector.png'" alt="Image" width="68" height="25" />
    </div>
    <div><span :class="'footer-span'">公平性</span></div>
  </div>
</template>

<style scoped>
@import "../assets/css/footer.css";
</style>
