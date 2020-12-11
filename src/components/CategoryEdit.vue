<template>
  <v-col cols="6">
    <v-form @submit.prevent="submitHandler" class="pa-4">
      <h1>Редактировать</h1>
      <v-select
        :items="items"
        label="Выберите категорию"
        v-model="title"
        dense
        outlined
      ></v-select>
      <v-text-field
        hint="Ввведите название"
        v-model="inp"
        :rules="[rules.required]"
        label="Название"
      ></v-text-field>
      <v-text-field
        hint="Ввведите лимит"
        v-model="limit"
        :rules="[rules.min]"
        label="Лимит"
      ></v-text-field>
      <v-btn type="submit" class="white--text mt-4" color="green">
        Обновить
        <v-icon class="white--text">mdi-telegram</v-icon></v-btn
      >
    </v-form>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      limit: 100,
      current: null,
      inp: '',
      title: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v >= 100 || 'Стартовая цена 100 рублей',
      },
    }
  },
  methods: {
    async submitHandler() {
      const categoryData = {
        id: this.current,
        title: this.inp,
        limit: this.limit,
      }

      await this.$store.dispatch('updateCategory', categoryData)
      this.$emit('updated', categoryData)
    },
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  watch: {
    title(value) {
      const { id, title, limit } = this.categories.find(
        (c) => c.title === value
      )
      this.inp = title
      this.current = id
      this.limit = limit
    },
  },
  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
    this.inp = title
  },
  computed: {
    items() {
      return this.categories.map((c) => {
        return c.title
      })
    },
  },
}
</script>
