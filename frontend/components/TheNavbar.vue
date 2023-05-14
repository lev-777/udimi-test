<script lang="ts">
  import Logo from '~/components/TheLogo.vue'
  import { useAuthStore } from '~/store/auth/authState'

  export default {
    components: {
      Logo
    },

    setup() {
      const auth = useAuthStore()
      const logout = async () => {
        await auth.logout()
        await navigateTo('/')
      }
      return {
        logout
      }
    }
  }
</script>

<template>
  <nav class='navbar'>
    <div class='navbar-brand'><logo></logo></div>

    <div class='navbar-nav'>
      <ul class='flex'>
        <li class='nav-item'>
          <nuxt-link active-class='active' class='nav-link' to='/projects'>
            Projects
          </nuxt-link>
        </li>
        <li class='nav-item'>
          <a @click.prevent='logout' class='nav-link' href='#'>
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang='scss' scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fafafa;
    box-shadow: 0 0 5px rgb(0 0 0 / 25%);
  }

  .navbar-brand {
  }

  .navbar-nav {
    font-size: .7rem;
  }

  li {
    padding: 5px 14px;
    list-style: none;

    a {
      text-decoration: none;
      text-transform: uppercase;
      color: #595959;
    }
  }
</style>
