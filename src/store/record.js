import firebase from 'firebase/app'
export default {
  actions: {
    async createRecord(context, record) {
      const uid = await context.dispatch('getUid')
      return await firebase
        .database()
        .ref(`/users/${uid}/records`)
        .push(record)
    },
    async fetchRecords(context) {
      const uid = await context.dispatch('getUid')
      const records =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/records`)
            .once('value')
        ).val() || {}

      return Object.keys(records).map((c) => ({
        ...records[c],
        id: c,
      }))
    },
    async fetchRecordById(context, id) {
      const uid = await context.dispatch('getUid')
      const record =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/records`)
            .child(id)
            .once('value')
        ).val() || {}

      return { ...record, id }
    },
  },
}
