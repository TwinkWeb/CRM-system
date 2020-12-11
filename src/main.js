import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import VueMeta from 'vue-meta'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import dateFilter from '@/filters/dateFilter.js'
import currencyFilter from '@/filters/currencyFilter.js'
import localizeFilter from '@/filters/localizeFilter.js'
import titlePlugin from '@/utils/titlePlugin'

import * as VueSpinnersCss from 'vue-spinners-css'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(VueSpinnersCss)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.use(VueMeta)

firebase.initializeApp({
  apiKey: 'AIzaSyDYjyXM6OXpqmwBSV8CjMfEOFoHrc4YQOo',
  authDomain: 'crm-system-c8aaf.firebaseapp.com',
  projectId: 'crm-system-c8aaf',
  storageBucket: 'crm-system-c8aaf.appspot.com',
  messagingSenderId: '650821229525',
  appId: '1:650821229525:web:4899639013268c043b7b5c',
  measurementId: 'G-538C14137F',
})

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
