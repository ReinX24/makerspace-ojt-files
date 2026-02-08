<script setup>
import { ref } from "vue";
const footerYear = ref(new Date().getFullYear()); // get the current year
</script>

<template>
  <footer>
    <p>&copy; {{ footerYear }}</p>
  </footer>
</template>

<style scoped>
footer {
  color: blue;
  position: fixed;
  bottom: 0;
  padding-bottom: 20px;
}
</style>
