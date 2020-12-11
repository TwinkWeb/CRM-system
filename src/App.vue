<!-- @format -->

<template>
  <div class="">
    <component :key="locale" :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue'
import EmptyLayout from '@/layout/empty-layout.vue'

export default {
  name: 'App',

  data: () => ({}),
  components: {
    MainLayout,
    EmptyLayout,
  },
  computed: {
    locale() {
      return this.$store.getters.info.locale
    },
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
}
</script>
