<template>
  <label class="dropdown">
    <div class="dd-button">Language</div>
    <input type="checkbox" class="dd-input" />
    <ul class="dd-menu">
      <li><a href="#" @click="changeLocale('en')">EN</a></li>
      <li><a href="#" @click="changeLocale('ch')">CH</a></li>
    </ul>
  </label>
</template>

<style scoped>
@import "../assets/css/language.css";
</style>

<script>
export default {
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
  },
};
</script>
