// නමෝ බුද්ධාය !!!

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import "@fontsource-variable/inter";
import "./styles/globals.css";

// Create Vue app
const app = createApp(App);

// Use Router
app.use(router);

// Use Pinia for state management
const pinia = createPinia();
app.use(pinia);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error("Global error:", err);
  console.error("Component:", instance);
  console.error("Error info:", info);
};

// Mount app
app.mount("#app");

// Service Worker registration (for PWA support)
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
  });
}
