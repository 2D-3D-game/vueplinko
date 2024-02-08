import { reactive } from "vue";
import axios from "axios";

export const store = reactive({
  token: "t:eHuQFiWr3GXIRz6aKuWjnmXN",
  isMaximum: false,
  autoStart: false,
  autoEnd: false,
  hotkey: false,
  showGameInfoModal: false,
  showMaxValueModal: false,
  showHotkeyModal: false,
  showStatistics: false,
  showFairness: false,
  appOpacity: false,
  plinkoAmount: 0.0,
  plinkoRow: 16,
  plinkoLevel: "middle",
  volumn: 50,
  currentScore: 0,
  currentColor: "",
  currentShadow: "",
  active_client_seed: "rjDVxoYHl0",
  active_server_seed_hash:
    "dafef89c0fe074a01ab849a89c25f39a8c829af985e42d4b01c8c88f088c18240",
  next_server_seed_hash:
    "6bd1cfe4415925cc1fea8c28ce0281f79598c1d7150d279d3892ecb99e19d0fb",
  nonce: 6,
  showPro: false,
  proText: "",
  proValue: "",
});

export const mutations = {
  showMaximum(value) {
    store.isMaximum = value;
  },
  updateAuto(action) {
    action === "start"
      ? (store.autoStart = !store.autoStart)
      : (store.autoEnd = !store.autoEnd);
    setTimeout(() => {
      action === "start"
        ? (store.autoStart = !store.autoStart)
        : (store.autoEnd = !store.autoEnd);
    }, 2000);
  },
  updateHotkey() {
    store.hotkey = !store.hotkey;
  },
  currentScore(score, color, shadow) {
    store.currentScore = score;
    store.currentColor = color;
    store.currentShadow = shadow;
  },
  showGameInfoModal() {
    store.showGameInfoModal = !store.showGameInfoModal;
  },
  showHotkeyModal() {
    store.showHotkeyModal = !store.showHotkeyModal;
    this.appOpacity();
  },
  showFairness() {
    store.showFairness = !store.showFairness;
  },
  showMaxValueModal() {
    store.showMaxValueModal = !store.showMaxValueModal;
    this.appOpacity();
  },
  showStatistics() {
    store.showStatistics = !store.showStatistics;
    this.appOpacity();
  },
  appOpacity() {
    if (
      store.showGameInfoModal ||
      store.showHotkeyModal ||
      store.showMaxValueModal
    ) {
      store.appOpacity = true;
    } else {
      store.appOpacity = false;
    }
  },
  updatePlinko(amount, rows, level) {
    store.plinkoAmount = amount;
    store.plinkoLevel = level;
    store.plinkoRow = rows;
  },
  changeVolumn(value) {
    store.volumn = value;
  },
  seedDetail() {
    axios
      .get("https://www.tfdjqp.com/game/original/seed/detail", {
        headers: {
          "Content-Type": "application/json",
          d: "25",
          lang: "zh_CN",
          t: store.token,
        },
      })
      .then((response) => {
        if (response.data.status) {
          store.active_client_seed = response.data.data.active_client_seed;
          store.active_server_seed_hash =
            response.data.data.active_server_seed_hash;
          store.next_server_seed_hash =
            response.data.data.next_server_seed_hash;
          store.nonce = response.data.data.nonce;
        } else {
          console.log(response.data.status);
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
  changeShowPro(flag, text, pro) {
    if (flag) {
      store.showPro = flag;
      store.proText = text;
      store.proValue = pro;
    } else {
      store.showPro = flag;
      store.proText = "";
      store.proValue = "";
    }
  },
};
