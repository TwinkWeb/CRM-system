<template>
  <v-col cols="6">
    <v-form @submit.prevent="submitHandler" class="pa-4"
      ><h1>Создать</h1>
      <v-text-field
        ref="title"
        hint="Введите название "
        :rules="[rules.required]"
        label="Название"
        v-model="title"
      ></v-text-field>
      <v-text-field
        ref="limit"
        hint="Введите лимит"
        :rules="[rules.required, rules.min]"
        v-model.number="limit"
        label="Лимит"
      ></v-text-field>
      <v-btn class="white--text mt-4" type="submit" color="green">
        Создать
        <v-icon class="white--text">mdi-telegram</v-icon></v-btn
      >
    </v-form>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      limit: 100,
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v >= 100 || 'Стартовая цена 100 рублей',
      },
    }
  },
  computed: {
    form() {
      return {
        title: this.title,
        limit: this.limit,
      }
    },
  },
  methods: {
    async submitHandler() {
      if (!this.form.title || !this.form.limit) {
        Object.keys(this.form).forEach((f) => {
          if (!this.form[f]) this.$refs[f].validate(true)
        })
        return
      }
      const category = await this.$store.dispatch('createCategory', this.form)

      this.title = ''
      this.limit = 100
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset()
      })
      console.log('Категория была создана ')
      this.$emit('created', category)
    },
  },
}
</script>
