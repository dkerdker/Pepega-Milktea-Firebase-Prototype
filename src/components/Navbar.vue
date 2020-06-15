<template>
  <div class="navbar">
    <nav class="nav-extended teal darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Index' }">
          <span class="nav-title"><strong>Pepega Milk Tea</strong></span>
        </router-link>
        <a href class="btn-floating btn-large halfway-fab orange">
          <router-link :to="{ name: 'AddDrink' }">
            <i class="material-icons">add</i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style>
.navbar nav {
  padding: 0 3rem;
}
</style>