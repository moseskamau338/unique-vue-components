import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueApexCharts from "vue3-apexcharts";
import './assets/style.css'


const app = createApp(App)

app.use(createPinia())
app.use(VueApexCharts);

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

app.mount('#app')
