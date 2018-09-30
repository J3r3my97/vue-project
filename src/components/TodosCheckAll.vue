<template>
  <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
</template>

<script>
export default {
  name: "todos-checkall",
  props: {
    anyRemaining: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    checkAllTodos() {
      eventBus.$emit("checkAllTodos", this.anyRemaining);
    }
  }
};
</script>