<template>
  <aside class="main-sidebar">
    <nav class="main-nav">
      <router-link class="nav-item" to="/" exact>
        <i class="fa fa-fw fa-home"></i>
        HOME
      </router-link>
      <router-link v-for="nav in navs" :key="nav.label" class="nav-item" :to="nav.route">
        <i class="fa fa-fw" :class="nav.iconClass"></i>
        {{ nav.label }}
      </router-link>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'main-sidebar',
  data () {
    return {
      navs: [
        {
          label: 'ARTICLE',
          route: '/article',
          iconClass: 'fa-home'
        },
        {
          label: 'WORKLOG',
          route: '/worklog',
          iconClass: 'fa-home'
        },
        {
          label: 'THINK',
          route: '/think',
          iconClass: 'fa-home'
        },
        {
          label: 'MUSIC',
          route: '/music',
          iconClass: 'fa-home'
        },
        {
          label: 'ABOUT',
          route: '/about',
          iconClass: 'fa-home'
        }
      ]
    }
  }
}
</script>

<style scoped>
.main-sidebar {
  position: fixed;
  width: 10em;
}

.nav-item {
  display: block;
  line-height: 2.6;
  text-decoration: none;
}

.nav-item .fa {
  margin-left: 1em;
  margin-right: .5em;
}

.nav-item.router-link-active {
  color: #108ee9;
  background-color: rgba(255, 255, 255, .8);
}
</style>

