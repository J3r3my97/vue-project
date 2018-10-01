<template>
  <div id="app" class="container">
    <!-- <img src="./assets/logo.png" class="logo"> -->
    <feed-list></feed-list>

    <router-view></router-view>
  </div>
</template>

<script>
import FeedList from "./components/Feedlist";

export default {
  name: "App",
  components: {
    FeedList
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
.container {
  max-width: 600px;
  margin: 0 auto;
}
.logo {
  display: block;
  margin: 20px auto;
  height: 75px;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
