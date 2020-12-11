<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            <strong> #</strong>
          </th>
          <th class="text-left">
            <strong> Сумма</strong>
          </th>
          <th class="text-left">
            <strong> Дата</strong>
          </th>
          <th class="text-left">
            <strong> Категория</strong>
          </th>
          <th class="text-left">
            <strong> Тип</strong>
          </th>
          <th class="text-left">
            <strong> Открыть</strong>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, idx) in records" :key="idx">
          <td>{{ idx + 1 }}</td>
          <td>{{ record.amount | currency('RUB') }}</td>
          <td>{{ record.date | date('datetime') }}</td>
          <td>{{ record.categoryName }}</td>
          <td :class="record.typeClass + '--text'">{{ record.typeText }}</td>

          <td>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  @click="$router.push('/details/' + record.id)"
                  v-bind="attrs"
                  v-on="on"
                  color="green"
                >
                  <v-icon color="white">mdi-book-open-variant</v-icon></v-btn
                >
              </template>
              <span>{{ record.categoryName }}</span>
            </v-tooltip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {}
  },
}
</script>
