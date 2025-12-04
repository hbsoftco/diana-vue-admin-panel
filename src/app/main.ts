import router from '@app/router'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from '@/App.vue'
import '@assets/css/style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
