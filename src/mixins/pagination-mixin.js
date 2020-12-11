import _ from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 2,
      pageCount: 0,
      allItems: [],
      items: [],
    }
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = _.chunk(allItems, this.pageSize)
      this.pageCount = _.size(this.allItems)
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    },
  },
  watch: {
    page(value) {
      this.$router.push(`${this.$route.path}?page=${value}`)
      this.items = this.allItems[value - 1] || this.allItems[0]
    },
  },
}
