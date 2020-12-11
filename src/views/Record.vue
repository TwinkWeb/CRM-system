<template>
  <v-container>
    <h1>Новая запись</h1>
    <v-divider></v-divider>
    <div
      v-if="loading"
      style="width: 100%; display: flex; align-items: center; height: 300px; justify-content: center"
    >
      <DefaultLoader color="orange" />
    </div>
    <div
      v-else-if="!categories.length"
      style="width: 100%; display: flex; align-items: center; height: 300px; justify-content: center"
    >
      <h1>Категорий пока нет</h1>
      <v-btn color="orange" to="/categories" text>Добавить новую запись</v-btn>
    </div>
    <v-row v-else>
      <v-col>
        <v-form @submit.prevent="submitHandler" class="pa-4">
          <v-card-subtitle>Выберите категорию</v-card-subtitle>
          <v-select
            :items="items"
            label="Выберите категорию"
            v-model="title"
            dense
            outlined
          ></v-select>
          <v-checkbox
            color="green"
            value="income"
            v-model="type"
            label="Доход"
          ></v-checkbox>
          <v-checkbox
            color="green"
            value="outcome"
            v-model="type"
            label="Расход"
          ></v-checkbox>

          <v-text-field
            ref="amount"
            hint="This field uses counter prop"
            label="Сумма"
            v-model.number="amount"
            :rules="[rules.required, rules.min]"
          ></v-text-field>
          <v-text-field
            ref="description"
            hint="This field uses counter prop"
            label="Описание"
            v-model="description"
            :rules="[rules.required]"
          ></v-text-field>
          <v-btn type="submit" color="green" class="white--text"
            >СОЗДАТЬ
            <v-icon class="white--text">mdi-telegram</v-icon>
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord'),
    }
  },
  name: 'Record',
  data() {
    return {
      categories: [],
      categoryId: '',
      loading: true,
      type: 'outcome',
      description: '',
      amount: 0,
      title: '',
      rules: {
        required: (value) => !!value || 'Required.',
        min: (v) => v >= 100 || 'Стартовая цена 100 рублей',
      },
    }
  },
  watch: {
    title(value) {
      const categoryId = this.categories.find((c) => c.title === value)
      this.categoryId = categoryId.id
      console.log(this.categoryId)
    },
  },
  computed: {
    ...mapGetters(['info']),
    items() {
      return this.categories.map((c) => c.title)
    },
    form() {
      return {
        description: this.description,
        amount: this.amount,
      }
    },
    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }
      return this.info.bill >= this.amount
    },
  },
  methods: {
    async submitHandler() {
      if (!this.form.amount || !this.form.description) {
        Object.keys(this.form).forEach((f) => {
          if (!this.form[f]) this.$refs[f].validate(true)
        })
      }

      if (this.canCreateRecord) {
        await this.$store.dispatch('createRecord', {
          categoryId: this.categoryId,
          amount: this.amount,
          description: this.description,
          type: this.type,
          date: new Date().toJSON(),
        })
        const bill =
          this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount

        await this.$store.dispatch('updateInfo', { bill })
        Object.keys(this.form).forEach((f) => {
          this.$refs[f].reset()
        })
        this.amount = 1
        this.description = ''
      } else {
        console.log(
          `Недостаточно средст на счету (${this.amount - this.info.bill})`
        )
      }
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    this.categoryId = this.categories[0].id
    this.title = this.categories[0].title
  },
}
</script>

<style></style>
