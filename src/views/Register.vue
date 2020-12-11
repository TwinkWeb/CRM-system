<template>
  <v-row class="d-flex  justify-center ">
    <v-col class="white relative" md="4">
      <v-form
        class=""
        ref="form"
        @submit.prevent="submitHandler"
        lazy-validation
      >
        <v-card flat><h1>Домашняя бухгалтерия</h1></v-card>
        <v-text-field
          :rules="[() => !!email || 'Введите email']"
          ref="email"
          v-model.trim="email"
          label="E-mail"
          required
        ></v-text-field>
        <v-text-field
          :rules="[() => !!password || 'Поле не должно быть пустым']"
          ref="password"
          v-model.trim="password"
          type="password"
          label="Пароль"
          required
        ></v-text-field>
        <v-text-field
          ref="name"
          v-model.trim="name"
          :rules="[() => !!name || 'Поле name не должно быть пустым']"
          label="Имя"
          required
        ></v-text-field>
        <v-checkbox
          v-model="checkboxValue"
          color="orange"
          label="Я принимаю правила"
        ></v-checkbox>

        <v-btn color="orange" class="white--text" block type="submit"
          >Войти
          <v-icon right>
            mdi-telegram
          </v-icon>
        </v-btn>
        <div class="flexcontainer">
          <p style="margin-bottom: 0; margin-right: 10px;">Есть аккаунт?</p>
          <v-btn
            type="submit"
            color="orange"
            text
            @click="$router.push('/login')"
            >Войти</v-btn
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
      name: '',
      checkboxValue: false,
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
        name: this.name,
      }
    },
  },
  methods: {
    async submitHandler() {
      if (!this.form.email || !this.form.password || !this.form.name) {
        Object.keys(this.form).forEach((f) => {
          if (!this.form[f]) this.$refs[f].validate(true)
        })
        return false
      }

      if (!this.checkboxValue) {
        return false
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        checkbox: this.checkboxValue,
      }
      await this.$store.dispatch('register', formData)
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
