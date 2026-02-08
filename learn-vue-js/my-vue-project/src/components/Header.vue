<script setup>
import { ref } from "vue";
const emoji = ref("✌🏻");
</script>

<template>
  <header>
    <span>{{ emoji }}</span>
  </header>
</template>

<style scoped>
header span {
  font-size: 3rem;
}
</style>
