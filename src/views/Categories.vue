<template
  ><v-container>
    <h1>Категории</h1>
    <v-divider></v-divider>
    <div
      v-if="loading"
      style="width: 100%; display: flex; align-items: center; height: 300px; justify-content: center"
    >
      <DefaultLoader color="orange" />
    </div>
    <v-row v-else>
      <CategoryCreate @created="addNewCategory" />
      <CategoryEdit
        v-if="categories.length"
        :key="categories.length + updateCount"
        @updated="updateCategories"
        :categories="categories"
      />
      <v-col v-else>
        <div style="width: 100%; display: flex; justify-content: center;">
          <h1>Категорий пока нет</h1>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate'
import CategoryEdit from '@/components/CategoryEdit'

export default {
  metaInfo() {
    return {
      title: this.$title('Menu_Categories'),
    }
  },
  data() {
    return {
      categories: [],
      loading: true,
      updateCount: 0,
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    console.log(this.categories)
    this.loading = false
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      console.log(this.categories)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    },
  },
  name: 'Categories',
  components: {
    CategoryCreate,
    CategoryEdit,
  },
}
</script>

<style></style>
