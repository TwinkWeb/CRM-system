<template>
  <v-row class="d-flex  justify-center ">
    <v-col class="white relative" md="4">
      <v-form class="" @submit.prevent="submitHandler" lazy-validation>
        <v-card flat><h1>Домашняя бухгалтерия</h1></v-card>

        <v-text-field
          ref="email"
          label="E-mail"
          type="email"
          v-model.trim="email"
          :rules="[() => !!email || 'This field is required']"
          required
        ></v-text-field>

        <v-text-field
          ref="password"
          type="password"
          v-model.trim="password"
          :rules="[() => !!password || 'This field is required']"
          label="Пароль"
          required
        ></v-text-field>

        <v-btn color="orange" type="submit" class="white--text" block
          >Войти
          <v-icon right>
            mdi-telegram
          </v-icon>
        </v-btn>
        <div class="flexcontainer">
          <p style="margin-bottom: 0">Нет аккаунта?</p>
          <v-btn color="orange" text @click="$router.push('/register')"
            >Зарегистрироваться</v-btn
          >
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
      }
    },
  },
  methods: {
    async submitHandler() {
      if (!this.form.email || !this.form.password) {
        Object.keys(this.form).forEach((f) => {
          if (!this.form[f]) this.$refs[f].validate(true)
        })
        return false
      }
      const formData = {
        email: this.email,
        password: this.password,
      }

      await this.$store.dispatch('login', formData)
      this.$router.push('/')
    },
  },
}
</script>

<style>
.flexcontainer {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin-top: 10px;
  position: relative;
}
</style>
