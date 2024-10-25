<script setup lang="ts">
// import QueryBuilder from "@/components/QueryBuilder.vue";
import Matrix from "@/components/MatrixComponents/Matrix.vue";

const matrix_data = {
  "input_values": {
    "1_2": "Bank Statement",
    "1_3": "Cashbook",
    "2_1": "Opening Balance",
    "2_2": "config(2_2)",
    "2_3": "config(2_3)",
    "3_1": "Closing Balance",
    "3_2": "config(3_2)",
    "3_3": "config(3_3)",
    "6_2": "Reconciled Cashbook",
    "6_3": "Unreconciled Cashbook",
    "7_1": "Cashbook Money Out",
    "7_2": "config(7_2)",
    "7_3": "config(7_3)",
    "8_1": "Cashbook Money In",
    "8_2": "config(8_2)",
    "8_3": "config(8_3)",
    "11_2": "Reconciled Bank Statement",
    "11_3": "Uneconciled Bank Statement",
    "12_1": "Bank Statement Money Out",
    "12_2": "config(12_2)",
    "12_3": "config(12_3)",
    "13_1": "Bank Statement Money In",
    "13_2": "config(13_2)",
    "13_3": "config(13_3)"
  },
  "style": {
    "3_1": {
      "text-decoration": "underline"
    },
    "6_3": {
      "text-decoration": "underline"
    },
    "8_1": {
      "text-decoration": "underline"
    },
    "11_2": {
      "text-decoration": "underline"
    },
    "11_3": {
      "text-decoration": "underline"
    },
    "12_1": {
      "text-decoration": "underline"
    },
    "13_1": {
      "text-decoration": "underline"
    }
  },
  "widths": {
    "1": 150,
    "2": 150,
    "3": 150
  },
  cols:3,
  rows: 13
}
</script>

<template>
  <div class="h-[100vh] w-[100vw] p-44">
    <!--<QueryBuilder />-->
    <Matrix view-only :data="matrix_data" />
  </div>
</template>

<style>
</style>
