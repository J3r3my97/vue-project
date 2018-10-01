<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <!-- Checkbox for finish todo -->
      <input type="checkbox" v-model="completed" @change="doneEdit">
      <!-- Normal State  -->
      <div v-if="!editing" class="todo-item-label" :class="{ completed: completed }" @dblclick="editTodo">{{title}}
      </div>
      <!-- Editing State -->
      <input v-else class="todo-item-edit" type="text" v-model="title" @blur="doneEdit" @keyup.enter="doneEdit" @keyup.esc="cancelEdit" v-focus>

    </div>
      <div>
        <button @click="agree">Agree</button>
        <button @click="disagree">Disagree</button>

        <span class="remove-item" @click="removeTodo(todo.id)">
          &times;
        </span>
      </div>

    </div>
</template>

<script>
export default {
  name: "single-feed",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  methods: {
    removeTodo(id) {
      this.$store.dispatch("deleteTodo", id);
    },
    editTodo() {
      this.editing = true;
      this.beforeEditCache = this.title;
    },
    doneEdit() {
      if (this.title.trim().length == 0) {
        this.title = beforeEditCache;
      }
      this.editing = false;

      this.$store.dispatch("editTodo", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      eventBus.$emit("EditFinished", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    agree() {},
    disagree() {}
  },

  watch: {
    checkAll() {
      if (this.checkAll) {
        this.completed = true;
      } else {
        this.completed = this.todo.completed;
      }
    }
  },
  created() {
    eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    eventBus.$off("pluralize", this.handlePluralize);
  }
};
</script>
