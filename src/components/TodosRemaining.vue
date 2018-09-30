<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "todos-remaining",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>