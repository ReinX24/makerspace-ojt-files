<script setup>
import { ref, onMounted } from "vue";

const name = ref("Rein Solis");
const status = ref("active");
const tasks = ref(["Task One", "Task Two", "Task Three"]);
const link = ref("https://www.google.com");
const newTask = ref("");

const toggleStatus = () => {
  if (status.value === "active") {
    status.value = "pending";
  } else if (status.value === "pending") {
    status.value = "inactive";
  } else {
    status.value = "active";
  }
};

const addTask = () => {
  if (newTask.value.trim() !== "") {
    // Adding the newTask to our array
    tasks.value.push(newTask.value);
    // Clearing the newTask value
    newTask.value = "";
  }
};

const deleteTask = (index) => {
  // Removing the element from our array
  tasks.value.splice(index, 1);
};

// This runs as the page is loaded
onMounted(async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    const data = await response.json();
    tasks.value = data.map((task) => {
      return task.title;
    });
  } catch (error) {
    console.error("Error fetching tasks");
  }
});
</script>

<template>
  <div>
    <h1>{{ name }}</h1>
    <p v-if="status === 'active'">User is active</p>
    <p v-else-if="status === 'pending'">User is pending</p>
    <p v-else>User is inactive</p>

    <form @submit.prevent="addTask">
      <label for="newTask">Add Task</label>
      <input type="text" id="newTask" name="newTask" v-model="newTask" />

      <button type="submit">Submit</button>
    </form>

    <h3>Tasks:</h3>
    <ul>
      <li v-for="(task, index) in tasks" :key="task">
        <span>
          {{ task }}
        </span>

        <!-- Delete button for the task -->
        <button @click="deleteTask(index)">x</button>
      </li>
    </ul>

    <!-- <a v-bind:href="link" target="_blank">Click for Google</a> -->
    <a :href="link" target="_blank">Click for Google</a>
    <br />
    <button @click="toggleStatus">Change Status</button>
  </div>
</template>

<style scoped></style>
