<template>
  <div>
    <transition name="fade">
      <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Voted Feed(s)</button>
    </transition>
  </div>

</template>

<script>
export default {
  name: "clear-voted-feed",
  data() {
    return {};
  },
  props: {
    // showClearCompletedButton: {
    //   type: Boolean,
    //   required: true
    // }
  },
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },

  methods: {
    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    }
  }
};
</script>