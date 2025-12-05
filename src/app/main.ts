import { i18n } from '@app/i18n'
import router from '@app/router'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import '@assets/css/style.css'

import App from '@/App.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
