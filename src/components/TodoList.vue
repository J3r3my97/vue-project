<template>
  <div>
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
      <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining">
      </todo-item>
    </transition-group>

    <div class="extra-container">
      <!-- component that finishs(checks) all the todos-->
      <todos-check-all :anyRemaining="anyRemaining"> </todos-check-all>
      <!-- component that showing the remaining todos on the list  -->
      <todos-remaining :remaining="remaining"></todos-remaining>
    </div>

    <div class="extra-container">

      <!-- Filters component -->
      <todos-filter></todos-filter>

      <!-- Clear completed todos component -->
      <todos-clear-completed :showClearCompletedButton="showClearCompletedButton"></todos-clear-completed>

    </div>
  </div>

</template>

<script>
import TodoItem from "./TodoItem";
import TodosRemaining from "./TodosRemaining";
import TodosCheckAll from "./TodosCheckAll";
import TodosFilter from "./TodosFilter";
import TodosClearCompleted from "./TodosClearCompleted";

export default {
  name: "todo-list",
  components: {
    TodoItem,
    TodosRemaining,
    TodosCheckAll,
    TodosFilter,
    TodosClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache: "",
      filter: "all",
      todos: [
        {
          id: 1,
          title: "Something",
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: "Hello World!",
          completed: false,
          editing: false
        }
      ]
    };
  },

  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }
      this.todos.push({
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });

      this.newTodo = "";
      this.idForTodo++;
    },

    removeTodo(id) {
      const index = this.todos.findIndex(item => item.id == id);
      this.todos.splice(index, 1);
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
    },
    checkAllTodos() {
      this.todos.forEach(todo => (todo.completed = event.target.checked));
    },
    clearCompleted() {
      this.todos = this.todos.filter(todo => !todo.completed);
    },
    finishedEdit(data) {
      const index = this.todos.findIndex(item => item.id == data.id);
      this.todos.splice(index, 1, data);
    }
  },

  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  created() {
    // event listener 是
    eventBus.$on("TodoRemoved", id => this.removeTodo(id));
    eventBus.$on("EditFinished", data => this.finishedEdit(data));
    eventBus.$on("AllTodosChecked", () => this.checkAllTodos());
    eventBus.$on("filterChanged", filter => (this.filter = filter));
    eventBus.$on("completedTodosCleared", () => this.clearCompleted());
  },
  beforeDestroy() {
    // delete event listener
    eventBus.$off("TodoRemoved", id => this.removeTodo(id));
    eventBus.$off("EditFinished", data => this.finishedEdit(data));
    eventBus.$off("AllTodosChecked", () => this.checkAllTodos());
    eventBus.$off("filterChanged", filter => (this.filter = filter));
    eventBus.$off("completedTodosCleared", () => this.clearCompleted());
  },

  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining() {
      return this.remaining != 0;
    },
    todosFiltered() {
      if (this.filter == "all") {
        return this.todos;
      } else if (this.filter == "active") {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter == "completed") {
        return this.todos.filter(todo => todo.completed);
        return;
      }
      // default case
      return this.todos;
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0;
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
