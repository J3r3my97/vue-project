import Vue from "vue";
import Vuex from "vuex";
import db from "../firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [],
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
    },
    getTodos(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    addTodo(context, todo) {
      setTimeout(() => {
        db.collection("todos")
          .add({
            title: todo.title,
            completed: false,
            timestamp: new Date()
          })
          .then(docRef => {
            context.commit("addTodo", {
              id: docRef.id,
              title: todo.title,
              completed: false
            });
          });
      }, 1);
    },
    clearCompleted(context) {
      db.collection("todos")
        .where("completed", "==", true)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.delete().then(() => {
              context.commit("clearCompleted");
            });
          });
        });
    },
    updateFilter(context, filter) {
      setTimeout(() => {
        context.commit("updateFilter", filter);
      }, 100);
    },
    checkAll(context, checked) {
      db.collection("todos")
        .get()
        .then(QuerySnapshot => {
          QuerySnapshot.forEach(doc => {
            doc.ref
              .update({
                completed: checked
              })
              .then(() => {
                context.commit("checkAll", checked);
              });
          });
        });
    },
    deleteTodo(context, id) {
      setTimeout(() => {
        db.collection("todos")
          .doc(id)
          .delete()
          .then(() => {
            context.commit("deleteTodo", id);
          });
      }, 10);
    },
    editTodo(context, todo) {
      setTimeout(() => {
        db.collection("todos")
          .doc(todo.id)
          .set({
            id: todo.id,
            title: todo.title,
            completed: todo.completed,
            timestamp: new Date()
          })
          .then(() => {
            context.commit("editTodo", todo);
          });
      }, 100);
    },
    getTodos(context) {
      db.collection("todos")
        .get()
        .then(QuerySnapshot => {
          let temp = [];
          QuerySnapshot.forEach(doc => {
            console.log(doc.data());
            let data = {
              id: doc.id,
              title: doc.data().title,
              completed: doc.data().completed,
              timestamp: doc.data().timestamp
            };
            temp.push(data);
          });

          let sorted = temp.sort((a, b) => {
            return a.timestamp.seconds - b.timestamp.seconds;
          });
          context.commit("getTodos", sorted);
        });
    }
  }
});
