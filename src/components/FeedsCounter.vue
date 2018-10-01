<template>
  <div> You have {{ remaining }} feed(s)</div>
</template>

<script>
export default {
  name: "feeds-counter",
  computed: {
    remaining() {
      return this.$store.getters.remaining;
    }
  }
};
</script>