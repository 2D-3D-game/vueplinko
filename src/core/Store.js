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
  rectShow: window.innerWidth > 1100 ? true : false,
  a_w:
    window.innerWidth > 1200
      ? "300px"
      : window.innerWidth > 1100
      ? "300px"
      : window.innerWidth < 400
      ? "300px"
      : "400px",
  a_h:
    window.innerWidth > 1200
      ? "630px"
      : window.innerWidth > 1100
      ? (630 * window.innerWidth) / 1200 + "px"
      : "100%",
  co_w:
    window.innerWidth > 1200
      ? "900px"
      : window.innerWidth > 1100
      ? 900 - 1200 + window.innerWidth + "px"
      : window.innerWidth < 400
      ? "300px"
      : "400px",
  co_h:
    window.innerWidth > 1200
      ? "630px"
      : window.innerWidth > 1100
      ? (630 * window.innerWidth) / 1200 + "px"
      : window.innerWidth < 400
      ? "225px"
      : "310px",
  c_w:
    window.innerWidth > 1200
      ? "800px"
      : window.innerWidth > 1100
      ? "800px"
      : window.innerWidth < 400
      ? "300px"
      : "400px",
  c_h:
    window.innerWidth > 1200
      ? "630px"
      : window.innerWidth > 1100
      ? (630 * window.innerWidth) / 1200 + "px"
      : window.innerWidth < 400
      ? "225px"
      : "310px",
  st_w:
    window.innerWidth > 1200
      ? "1140px"
      : window.innerWidth > 1100
      ? window.innerWidth - 60 + "px"
      : window.innerWidth * 0.8 - 60 + "px",
  s_w:
    window.innerWidth > 1200
      ? "1200px"
      : window.innerWidth > 1100
      ? window.innerWidth + "px"
      : window.innerWidth < 400
      ? "300px"
      : "400px",
  currentScore: 0,
  currentColor: "",
  currentShadow: "",
  active_client_seed: "rjDVxoYHl0",
  active_server_seed_hash:
    "dafef89c0fe074a01ab849a89c25f39a8c829af985e42d4b01c8c88f088c18240",
  next_server_seed_hash:
    "6bd1cfe4415925cc1fea8c28ce0281f79598c1d7150d279d3892ecb99e19d0fb",
  nonce: 6,
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
  rectShow(req) {
    store.rectShow = req;
  },
  responsive(a_w, a_h, co_w, co_h, c_w, c_h, st_w, s_w) {
    store.a_w = a_w;
    store.a_h = a_h;
    store.co_w = co_w;
    store.co_h = co_h;
    store.c_w = c_w;
    store.c_h = c_h;
    store.st_w = st_w;
    store.s_w = s_w;
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
};
