<template>
  <v-container>
    <v-row>
      <v-col
        col="12"
        class="d-flex justify-space-between align-center
"
      >
        <h1>Счёт</h1>
        <v-btn @click="refresh" class="white--text" color="orange">
          <v-icon>mdi-refresh</v-icon></v-btn
        >
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <div
      v-if="loading"
      style="width: 100%; display: flex; align-items: center; height: 300px; justify-content: center"
    >
      <DefaultLoader color="orange" />
    </div>
    <v-row v-else>
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </v-row>
  </v-container>
</template>

<script>
import HomeBill from '@/components/HomeBill'
import HomeCurrency from '@/components/HomeCurrency'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Bill'),
    }
  },
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency')
    console.log(this.currency)
    this.loading = false
  },
  data() {
    return {
      loading: true,
      currency: null,
    }
  },
  components: {
    HomeBill,
    HomeCurrency,
  },
  methods: {
    async refresh() {
      this.loading = true
      this.currency = await this.$store.dispatch('fetchCurrency')
      this.loading = false
    },
  },
}
</script>
