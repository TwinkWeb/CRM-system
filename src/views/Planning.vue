<template>
  <v-container>
    <h1>Планирование</h1>
    <v-divider> </v-divider>
    <v-row>
      <v-col v-for="cat in categories" :key="cat.id" cols="12">
        <span style="font-size: 20px;"
          ><strong>
            {{ cat.title }} : {{ cat.spend | currency('RUB') }}/
            {{ cat.limit }}</strong
          ></span
        >
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-progress-linear
              :color="cat.progressColor"
              v-model="cat.progressPercent"
              :buffer-value="bufferValue"
              v-bind="attrs"
              v-on="on"
            ></v-progress-linear>
          </template>
          <span> {{ cat.tooltip }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import currencyFilter from '@/filters/currencyFilter.js'

export default {
  name: 'Planning',
  metaInfo() {
    return {
      title: this.$title('Menu_Planning'),
    }
  },
  data() {
    return {
      value: 90,
      bufferValue: 100,
      categories: [],
      progressColor: '',
    }
  },
  computed: {
    ...mapGetters(['info']),
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')
    this.categories = this.categories.map((cat) => {
      const spend = records
        .filter((c) => c.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        .reduce((total, record) => {
          return (total += +record.amount)
        }, 0)

      const percent = (100 * spend) / cat.limit
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor =
        percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spend
      const tooltip = `${
        tooltipValue < 0 ? 'Превышение на ' : 'Осталось'
      } ${currencyFilter(Math.abs(tooltipValue))} `

      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip,
      }
    })
    console.log(this.categories)
  },
}
</script>

<style></style>
