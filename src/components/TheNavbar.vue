<template>
  <nav class="nav-wrapper">
    <a class="logo">Во что играть?</a>
    <ul class="list-nav">
      <li>
        <router-link to="/">Заявки</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
export default {
}
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  background: red;
  align-items: center;
  justify-content: space-between;
  .logo {
    color: white;
    font-size: 28px;
    font-weight: bold;
    padding-left: 10px;
  }
  .list-nav {
    list-style-type: none;
    display: flex;
    li {
      margin-right: 15px;
      a {
        color: white;
        text-decoration: none;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
}

</style>
