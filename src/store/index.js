import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
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
    ],
    filter: "all"
  },
  getters: {
    remaining(state) {
      return state.todos.filter(todo => !todo.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter(todo => !todo.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter(todo => todo.completed);
        return;
      }
      // default case
      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter(todo => todo.completed).length > 0;
    }
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false
      });
    },
    clearCompleted(state) {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    checkAll(state, checked) {
      state.todos.forEach(todo => (todo.completed = checked));
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex(item => item.id == id);
      state.todos.splice(index, 1);
    },
    editTodo(state, todo) {
      const index = state.todos.findIndex(item => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing
      });
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        context.commit("addTodo", todo);
      }, 1000);
    },
    clearCompleted(context) {
      setTimeout(() => {
        context.commit("clearCompleted");
      }, 1000);
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit("updateFilter", filter);
      }, 1000);
    },
    checkAll(context, checked) {
      setTimeout(() => {
        context.commit("checkAll", checked);
      }, 1000);
    },
    deleteTodo(context, id) {
      setTimeout(() => {
        context.commit("deleteTodo", id);
      }, 1000);
    },
    editTodo(context, todo) {
      setTimeout(() => {
        context.commit("editTodo", todo);
      }, 1000);
    }
  }
});
