<template>
  <div class="nav">
    <a @click="$router.push('dashboard'); $event.preventDefault()" href="/dashboard">
      <img class="nav__logo nav__logo--img u-img-responsive" alt="BriteApps" src="../assets/briteappslogonotagline.png">
    </a>
    <a v-for="module in modules" @click="$router.push(module.link); $event.preventDefault()" :href="module.link" class="nav__link" :class="{ 'nav__link--active' : activeModule === module.link }">
      <icon class="u-mr1" scale="0.75" :name="module.icon"></icon>
      {{ module.name }}
    </a>

    <a href="/login" @click="logout(); $event.preventDefault()" class="nav__link nav__link--last u-mr4">Logout</a>
  </div>
</template>

<script>

import {mapActions} from 'vuex'

export default {
  name: 'ba-header',
  props: {
    activeModule: String,
  },
  data () {
    let modules = [
      {
        link: 'builds',
        name: 'Builds',
        icon: 'rocket',
      },
      {
        link: 'settings',
        name: 'Settings',
        icon: 'cog',
      },
      {
        link: 'content',
        name: 'Content',
        icon: 'font',
      },
    ]
    return {
      modules,
    }
  },
  methods: {
    ...mapActions('login', ['logout'])
  },

}
</script>
<style scoped lang="scss">
  @import "../styles/variables";

  .nav {
    height: 3rem;
    background-color: #144852;
    vertical-align: center;
  }

  .nav__logo {
    max-width: 160px;
    display: inline-block;
    vertical-align: middle;
  }

  .nav__logo--img {
    filter: brightness(100);
  }

  .nav__link-container {
    display: inline;
  }

  .nav__link {
    color: $color-extra-light-silver;
    display: inline-block;
    text-decoration: none;
    vertical-align: center;
    margin: 0 1em;
    padding: 0.5em;
    border-radius: 6px;
    background-color: transparent;
    will-change: background-color;
    transition: background-color 100ms;
  }

  .nav__link--last {
    float: right;
    display: block;
    margin: 0.5em;
  }

  .nav__link--active {
    background-color: rgba(255, 255, 255, 0.1);
    color: $gray--005;

  }

  .nav__link:hover {
    background-color: rgba(255, 255, 255, 0.2);
    color: $gray--005;
  }
</style>
