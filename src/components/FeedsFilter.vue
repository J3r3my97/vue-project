<template>
  <div>
    <button :class="{ active: filter == 'all' }" @click="changeTodoFilter('all')">All</button>
    <button :class="{ active: filter == 'active' }" @click="changeTodoFilter('active')">Active</button>
    <button :class="{ active: filter == 'completed' }" @click="changeTodoFilter('completed')">Completed</button>
  </div>
</template>

<script>
export default {
  name: "feeds-filter",
  data() {
    return {};
  },
  props: {},
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },

  methods: {
    changeTodoFilter(filter) {
      this.$store.dispatch("updateFilter", filter);
    }
  }
};
</script>