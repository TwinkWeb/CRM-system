import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory(context, payload) {
      const uid = await context.dispatch('getUid')
      const category = await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .push(payload)
      return { ...payload, id: category.key }
    },
    async updateCategory(context, { title, limit, id }) {
      const uid = await context.dispatch('getUid')
      await firebase
        .database()
        .ref(`/users/${uid}/categories`)
        .child(id)
        .update({ title, limit })
    },
    async fetchCategories(context) {
      const uid = await context.dispatch('getUid')
      const categories =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .once('value')
        ).val() || {}

      return Object.keys(categories).map((c) => ({
        ...categories[c],
        id: c,
      }))
    },
    async fetchCategoryById(context, id) {
      const uid = await context.dispatch('getUid')
      const category =
        (
          await firebase
            .database()
            .ref(`/users/${uid}/categories`)
            .child(id)
            .once('value')
        ).val() || {}

      return {
        ...category,
        id,
      }
    },
  },
}
