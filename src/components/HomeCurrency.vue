<template>
  <v-col cols="8"
    ><v-card color="purple" min-height="320px" width="100%">
      <v-card-title class="white--text">Курс валют</v-card-title>
      <div style="width: 100%" class="pa-4">
        <v-simple-table color="transparent" class="">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">
                  Валюта
                </th>
                <th class="text-left">
                  Курс
                </th>
                <th class="text-left">
                  Дата
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="cur in currencies" :key="cur">
                <td>{{ cur }}</td>
                <td>{{ rates[cur].toFixed(2) }}</td>
                <td>{{ date | date('date') }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['rates', 'date'],
  data() {
    return {
      currencies: ['RUB', 'USD', 'EUR'],
    }
  },
}
</script>
<style scoped></style>
