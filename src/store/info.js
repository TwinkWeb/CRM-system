import firebase from 'firebase/app'

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, payload) {
      state.info = payload
    },
    clearInfo(state) {
      state.info = {}
    },
  },
  actions: {
    async updateInfo(context, updateInfo) {
      const uid = await context.dispatch('getUid')
      const updateData = { ...context.getters.info, ...updateInfo }
      await firebase
        .database()
        .ref(`/users/${uid}/info`)
        .update(updateData)
      context.commit('setInfo', updateData)
    },
    async fetchInfo(context) {
      const uid = await context.dispatch('getUid')
      const info = (
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .once('value')
      ).val()

      context.commit('setInfo', info)
    },
  },
  getters: {
    info: (s) => s.info,
  },
}
