<template>
  <div id="statistics" :class="'statistics-container'">
    <button :class="'statistics-button'" @click="expandReward">
      <div :class="'span-group'">
        <span :class="'span-white'">Plinko</span>
        <span :class="'span-gray'">Stake</span>
        <span :class="'span-gray'">{{ $t("original") }}</span>
      </div>
      <div :class="'reward'">
        <img :src="'/image/cup.svg'" alt="Image" width="16" height="16" />
        <span :class="'span1'">1,000.00x</span>
        <img :src="'/image/cap.svg'" alt="Image" width="14" height="14" />
        <span :class="'span2'">{{ $t("stealth") }} </span>
      </div>
      <img
        :src="'/image/arrow.svg'"
        alt="Image"
        width="16"
        height="16"
        id="arrow"
        :class="{ rotate: expand }"
      />
    </button>
    <div :class="'RewardTypeContainer'" v-if="expand">
      <button
        :class="['RewardTypeButton', { RewardTypeActive: active1 }]"
        id="active1"
        @click="activeButton('active1')"
      >
        {{ $t("bigwins") }}
      </button>
      <button
        :class="['RewardTypeButton', { RewardTypeActive: active2 }]"
        id="active2"
        @click="activeButton('active2')"
      >
        {{ $t("luckwins") }}
      </button>
      <button
        :class="['RewardTypeButton', { RewardTypeActive: active3 }]"
        id="active3"
        @click="activeButton('active3')"
      >
        {{ $t("challenges") }}
      </button>
      <button
        :class="['RewardTypeButton', { RewardTypeActive: active4 }]"
        id="active4"
        @click="activeButton('active4')"
      >
        {{ $t("description") }}
      </button>
    </div>
    <div v-if="active1 && expand">
      <BigReward />
    </div>
    <div v-if="active2 && expand">
      <BigReward />
    </div>
    <div v-if="active3 && expand">
      <Challenge />
    </div>
    <div v-if="active4 && expand">
      <Persuade />
    </div>
  </div>
</template>

<style scoped>
@import "../assets/css/statistics.css";
</style>

<script setup>
import { ref } from "vue";
import BigReward from "./Statistics/BigReward.vue";
import Challenge from "./Statistics/Challenge.vue";
import Persuade from "./Statistics/Persuade.vue";

const expand = ref(false);
const active1 = ref(true);
const active2 = ref(false);
const active3 = ref(false);
const active4 = ref(false);

const activeButton = (buttonId) => {
  active1.value = buttonId === "active1";
  active2.value = buttonId === "active2";
  active3.value = buttonId === "active3";
  active4.value = buttonId === "active4";
};

const expandReward = () => {
  expand.value = !expand.value;
};
</script>
