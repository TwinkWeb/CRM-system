<template>
  <v-app>
    <v-card>
      <v-app-bar color="orange">
        <div class="d-flex align-center">
          <v-btn
            class="mx-2"
            color="white"
            dark
            small
            fab
            outlined
            @click.stop="drawer = !drawer"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
          <p class="white--text" style="margin-bottom: 0">
            {{ date | date('datetime') }}
          </p>
        </div>

        <v-spacer></v-spacer>

        <v-menu transition="slide-y-transition" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text color="white" v-bind="attrs" v-on="on">
              {{ name }}
              <v-icon>mdi-arrow-collapse-down</v-icon>
            </v-btn>
          </template>
          <v-list-item-group color="orange">
            <v-list>
              <v-list-item :to="'/profile'">
                <v-list-item-icon>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Профиль</v-list-item-title>
              </v-list-item>
              <v-list-item @click="logout">
                <v-list-item-icon>
                  <v-icon>mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-title>Выйти</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-list-item-group>
        </v-menu>
      </v-app-bar>
    </v-card>
    <v-card style="height: 100%;" class="d-flex">
      <v-navigation-drawer v-model="drawer" class="white " absolute temporary>
        <v-list>
          <v-list-item
            :to="item.route"
            v-for="item in items"
            :key="item.title"
            link
          >
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="grey lighten-5">
        <router-view></router-view>
      </v-main>
    </v-card>
    <v-btn
      @click="$router.push('/record')"
      color="orange"
      absolute
      right
      style="bottom: 4%"
      fab
      ><v-icon color="white">mdi-plus</v-icon></v-btn
    >
  </v-app>
</template>

<script>
import localizeFilter from '../filters/localizeFilter'
export default {
  async mounted() {
    setInterval(() => {
      this.date = new Date()
    }, 1000)
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo')
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name
    },
  },

  data() {
    return {
      date: new Date(),
      drawer: true,
      items: [
        { title: localizeFilter('Menu_Bill'), route: '/' },
        { title: localizeFilter('Menu_History'), route: '/history' },
        { title: localizeFilter('Menu_Planning'), route: '/planning' },
        { title: localizeFilter('Menu_NewRecord'), route: '/record' },
        { title: localizeFilter('Menu_Categories'), route: '/categories' },
      ],
      menuItems: [
        { title: 'Профиль', icon: 'mdi-account', route: '/profile' },
        { title: 'Выйти', icon: 'mdi-logout', route: '/' },
      ],
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    },
  },
}
</script>

<style></style>
