import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

import info from './info'
import category from './category'
import record from './record'
// import { register } from 'register-service-worker'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    },
  },
  getters: {
    error: (s) => s.error,
  },
  actions: {
    async fetchCurrency() {
      const key = '0c69ad5394c8202a2711c8d1dd6af9af'
      const res = await fetch(
        `http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,RUB`
      )
      return await res.json()
    },
    async login(context, payload) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .catch((e) => {
          context.commit('setError', e)
          throw e
        })
    },
    async logout(context) {
      await firebase.auth().signOut()
      context.commit('clearInfo')
    },
    async register(context, payload) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .catch((e) => {
          context.commit('setError', e)
          throw e
        })
      const uid = await context.dispatch('getUid')
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .set({
          bill: 10000,
          name: payload.name,
        })
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
  },

  modules: {
    info,
    category,
    record,
  },
})
