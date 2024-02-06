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
  // a_w:
  //   window.innerWidth > 1200
  //     ? "300px"
  //     : window.innerWidth > 1100
  //     ? "300px"
  //     : window.innerWidth > 400
  //     ? "400px"
  //     : window.innerWidth > 350
  //     ? "350px"
  //     : "300px",
  // a_h:
  //   window.innerWidth > 1200
  //     ? "630px"
  //     : window.innerWidth > 1100
  //     ? (630 * window.innerWidth) / 1200 + "px"
  //     : "100%",
  // co_w:
  //   window.innerWidth > 1200
  //     ? "900px"
  //     : window.innerWidth > 1100
  //     ? 900 - 1200 + window.innerWidth + "px"
  //     : window.innerWidth > 400
  //     ? "400px"
  //     : window.innerWidth > 350
  //     ? "350px"
  //     : "300px",
  // co_h:
  //   window.innerWidth > 1200
  //     ? "630px"
  //     : window.innerWidth > 1100
  //     ? (630 * window.innerWidth) / 1200 + "px"
  //     : window.innerWidth > 400
  //     ? "310px"
  //     : window.innerWidth > 350
  //     ? 94 * 0.77 + "vw"
  //     : "225px",
  // c_w:
  //   window.innerWidth > 1200
  //     ? "800px"
  //     : window.innerWidth > 1100
  //     ? "800px"
  //     : window.innerWidth > 400
  //     ? "400px"
  //     : window.innerWidth > 350
  //     ? "350px"
  //     : "300px",
  // c_h:
  //   window.innerWidth > 1200
  //     ? "630px"
  //     : window.innerWidth > 1100
  //     ? (630 * window.innerWidth) / 1200 + "px"
  //     : window.innerWidth > 400
  //     ? "310px"
  //     : window.innerWidth > 350
  //     ? "270px"
  //     : "225px",
  // s_w:
  //   window.innerWidth > 1200
  //     ? "1200px"
  //     : window.innerWidth > 1100
  //     ? window.innerWidth + "px"
  //     : window.innerWidth > 400
  //     ? "400px"
  //     : window.innerWidth > 350
  //     ? "350px"
  //     : "300px",
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
  // responsive() {
  //   const width = window.innerWidth;
  //   if (width > 1200) {
  //     store.a_w = "300px";
  //     store.a_h = "630px";
  //     store.co_w = "900px";
  //     store.co_h = "630px";
  //     store.c_w = "800px";
  //     store.c_h = "630px";
  //     store.s_w = "1200px";
  //   } else if (width > 1100 && width < 1200) {
  //     store.a_w = "300px";
  //     store.a_h = (630 * width) / 1200 + "px";
  //     store.co_w = 900 - 1200 + width + "px";
  //     store.co_h = (630 * width) / 1200 + "px";
  //     store.c_w = "800px";
  //     store.c_h = (630 * width) / 1200 + "px";
  //     store.s_w = width + "px";
  //   } else if (width > 400 && width < 1100) {
  //     store.a_w = "400px";
  //     store.a_h = "100%";
  //     store.co_w = "400px";
  //     store.co_h = "310px";
  //     store.c_w = "400px";
  //     store.c_h = "310px";
  //     store.s_w = "400px";
  //   } else if (width > 350 && width < 400) {
  //     store.a_w = "100vw";
  //     store.a_h = "100%";
  //     store.co_w = "100vw";
  //     store.co_h = 94 * 0.77 + "vw";
  //     store.c_w = "100vw";
  //     store.c_h = "270px";
  //     store.s_w = "100vw";
  //   } else {
  //     store.a_w = "300px";
  //     store.a_h = "100%";
  //     store.co_w = "300px";
  //     store.co_h = "225px";
  //     store.c_w = "300px";
  //     store.c_h = "225px";
  //     store.s_w = "300px";
  //   }
  // },
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
