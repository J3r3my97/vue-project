<template>
  <div>
    <transition name="fade">
      <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
    </transition>
  </div>

</template>

<script>
export default {
  name: "todos-clear-completed",
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
      this.$store.commit("clearCompleted");
    }
  }
};
</script>