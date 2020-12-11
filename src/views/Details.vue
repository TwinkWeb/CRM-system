<template>
  <v-container>
    <h1>{{ record.type === 'outcome' ? 'Расход' : 'Доход' }}</h1>
    <v-row class="pa-3">
      <v-col cols="4">
        <v-card
          class="white--text pa-3"
          :color="record.type === 'outcome' ? 'red' : 'green'"
        >
          <p>Описание: {{ record.description }}</p>
          <p>Сумма : {{ record.amount | currency }}</p>
          <p>Категории: {{ record.categoryName }}</p>
          <v-card-subtitle>{{
            record.date | date('datetime')
          }}</v-card-subtitle></v-card
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      record: null,
    }
  },
  async mounted() {
    const id = this.$route.params.id
    const record = await this.$store.dispatch('fetchRecordById', id)
    const category = await this.$store.dispatch(
      'fetchCategoryById',
      record.categoryId
    )
    this.record = {
      ...record,
      categoryName: category.title,
    }
  },
}
</script>
