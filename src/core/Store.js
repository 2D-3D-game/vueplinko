import { reactive } from "vue";

export const store = reactive({
  isMaximum: false,
  autoStart: false,
  autoEnd: false,
  hotkey: false,
  rectShow: window.innerWidth > 1100 ? true : false,
  a_w: "",
  a_h: "",
  co_w: "",
  co_h: "",
  c_w: "",
  c_h: "",
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
  responsive(a_w, a_h, co_w, co_h, c_w, c_h) {
    store.a_w = a_w;
    store.a_h = a_h;
    store.co_w = co_w;
    store.co_h = co_h;
    store.c_w = c_w;
    store.c_h = c_h;
  },
};
