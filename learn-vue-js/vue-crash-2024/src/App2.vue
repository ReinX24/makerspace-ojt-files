<script>
export default {
  data() {
    return {
      name: "Rein",
      status: "pending",
      tasks: ["Task One", "Task Two", "Task Three"],
      link: "https://google.com",
    };
  },
  methods: {
    toggleStatus() {
      if (this.status === "active") {
        this.status = "pending";
      } else if (this.status === "pending") {
        this.status = "inactive";
      } else {
        this.status = "active";
      }
    },
  },
};
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>

    <h3>Tasks:</h3>
    <ul>
      <li v-for="task in tasks" :key="task">{{ task }}</li>
    </ul>
    <!-- <a v-bind:href="link" target="_blank">Click for Google</a> -->
    <a :href="link" target="_blank">Click for Google</a>
    <br />
    <button @click="toggleStatus">Change Status</button>
  </div>
</template>

<style scoped></style>
