<template>
  <v-container class="pa-3">
    <v-row>
      <v-col cols="12">
        <h1>{{ 'ProfileTitle' | localize }}</h1>
        <v-divider></v-divider>

        <v-col cols="6">
          <v-form @submit.prevent="submitHandler">
            <v-text-field
              ref="name"
              label="Name"
              type="text"
              v-model="name"
              required
            ></v-text-field>

            <v-switch
              class="mb-6"
              label="English"
              color="orange"
              v-model="isRuLocale"
              hide-details
            ></v-switch>
            <v-btn color="orange" type="submit" class="white--text mt-3">{{
              'Update' | localize
            }}</v-btn>
          </v-form>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  metaInfo() {
    return {
      title: this.$title('ProfileTitle'),
    }
  },
  data() {
    return {
      name: '',
      isRuLocale: false,
    }
  },
  mounted() {
    setTimeout(() => {
      this.name = this.info.name
      console.log(this.info.locale)
      this.isRuLocale = !(this.info.locale === 'ru-RU')
    }, 1000)
  },
  computed: {
    ...mapGetters(['info']),
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      await this.updateInfo({
        name: this.name,
        locale: !this.isRuLocale ? 'ru-RU' : 'en-US',
      })
    },
  },
}
</script>

<style scoped></style>
