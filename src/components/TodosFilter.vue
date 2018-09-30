<template>
    <div>
        <button :class="{ active: filter == 'all' }" @click="changeTodoFilter('all')">All</button>
        <button :class="{ active: filter == 'active' }" @click="changeTodoFilter('active')">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="changeTodoFilter('completed')">Completed</button>
    </div>
</template>

<script>
export default {
  name: "todos-filter",
  data() {
    return {
      filter: "all"
    };
  },
  props: {},

  methods: {
    changeTodoFilter(filter) {
      this.filter = filter;
      eventBus.$emit("filterChanged", filter);
    }
  }
};
</script>