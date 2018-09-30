<template>
  <div>{{ remaining }} items left</div>
</template>

<script>
export default {
  name: "todos-remaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>