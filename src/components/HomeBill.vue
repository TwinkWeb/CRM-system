<template>
  <v-col cols="4">
    <v-card color="primary" min-height="320px" width="100%">
      <v-card-title class="white--text">Счёт в валюте</v-card-title>
      <v-divider
        class="mx-4"
        style="color: white; background-color: white"
      ></v-divider>
      <v-card-text
        ><h1
          v-for="cur in currencies"
          :key="cur"
          class="white--text mb-4"
          style="text-transform: uppercase "
        >
          {{ getCurrency(cur) | currency(cur) }}
        </h1></v-card-text
      >
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
  props: ['rates'],
  computed: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates['RUB'] / this.rates['EUR'])
      )
    },
  },
  methods: {
    getCurrency(currency) {
      return Math.floor(this.base * this.rates[currency])
    },
  },
}
</script>

<style></style>
