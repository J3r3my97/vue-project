<template>
  <div>
    <input type="text" class="todo-input" placeholder="Add an idea here" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <single-feed v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
      </single-feed>
    </transition-group>

    <div class="extra-container">
      <!-- component that finishs(checks) all the todos-->
      <todos-check-all> </todos-check-all>
      <!-- component that showing the remaining todos on the list  -->
      <feeds-counter></feeds-counter>
    </div>

    <div class="extra-container">

      <!-- Filters component -->
      <feeds-filter></feeds-filter>

      <!-- Clear completed todos component -->
      <clear-voted-feeds></clear-voted-feeds>

    </div>
  </div>

</template>

<script>
import SingleFeed from "./SingleFeed";
import FeedsCounter from "./FeedsCounter";
import TodosCheckAll from "./TodosCheckAll";
import FeedsFilter from "./FeedsFilter";
import ClearVotedFeeds from "./ClearVotedFeeds";

export default {
  name: "feed-list",
  components: {
    SingleFeed,
    FeedsCounter,
    TodosCheckAll,
    FeedsFilter,
    ClearVotedFeeds
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 0,
      beforeEditCache: "",
      filter: "all",
      todos: []
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.$store.dispatch("addTodo", {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false,
        editing: false,
        agree: 0,
        disagree: 0
      });

      this.newTodo = "";
      this.idForTodo++;
    },

    editTodo(todo) {
      todo.editing = true;
      this.beforeEditCache = todo.title;
    },
    doneEdit(todo) {
      if (todo.title.trim().length == 0) {
        todo.title = beforeEditCache;
      }
      todo.editing = false;
    },
    cancelEdit(todo) {
      todo.title = this.beforeEditCache;
      todo.editing = false;
    }
  },

  directives: {
    // focus: {
    //   // directive definition
    //   inserted: function(el) {
    //     el.focus();
    //   }
    // }
  },
  created() {
    this.$store.dispatch("getTodos");
    // event listener 是
    // eventBus.$on("TodoRemoved", id => this.removeTodo(id));
    // eventBus.$on("EditFinished", data => this.finishedEdit(data));
    // eventBus.$on("AllTodosChecked", () => this.checkAllTodos());
    // eventBus.$on(
    //   "filterChanged",
    //   filter => (this.$store.state.filter = filter)
    // );
    // eventBus.$on("completedTodosCleared", () => this.clearCompleted());
  },
  beforeDestroy() {
    // delete event listener
    // eventBus.$off("TodoRemoved", id => this.removeTodo(id));
    // eventBus.$off("EditFinished", data => this.finishedEdit(data));
    // eventBus.$off("AllTodosChecked", () => this.checkAllTodos());
    // eventBus.$off(
    //   "filterChanged",
    //   filter => (this.$store.state.filter = filter)
    // );
    // eventBus.$off("completedTodosCleared", () => this.clearCompleted());
  },

  computed: {
    remaining() {
      return this.$store.getters.remaining;
    },
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    },
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import url(https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css);

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.5s;
}

.remove-item {
  cursor: pointer;
  margin-left: 14px;
  &:hover {
    color: black;
  }
}
.todo-item-left {
  // later
  display: flex;
  align-items: center;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}
.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc; //override defaults
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  padding-top: 14px;
  margin-bottom: 14px;
}
button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}

// CSS Transitions
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
