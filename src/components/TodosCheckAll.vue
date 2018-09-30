<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
</template>

<script>
export default {
  name: "todos-checkall",
  props: {
    // anyRemaining: {
    //   type: Boolean,
    //   required: true
    // }
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    }
  },
  methods: {
    checkAllTodos() {
      this.$store.dispatch("checkAll", event.target.checked);
    }
  }
};
</script>