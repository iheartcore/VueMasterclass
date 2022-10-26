<script>
  import { allStore } from '@/stores/index'
  import { mapState } from 'pinia'

  export default {
    data() {
      return {
        userDropdownOpen: false,
        mobileNavMenu: false,
      }
    },
    computed: {
      ...mapState(allStore.authStore, {
        authUser: (store) => store.authUser,
      }),
    },
    created() {
      this.$router.beforeEach(() => {
        this.mobileNavMenu = false
      })
    },
    methods: {
      signOut() {
        allStore.authStore().signOut()
        this.$router.push({ name: 'Home' })
      },
    },
  }
</script>

<template>
  <header
    id="header"
    v-click-outside="() => (mobileNavMenu = false)"
    class="header"
  >
    <router-link :to="{ name: 'Home' }" class="logo">
      <img src="../assets/svg/vueschool-logo.svg" alt="logo" />
    </router-link>

    <div class="btn-hamburger" @click="mobileNavMenu = !mobileNavMenu">
      <div class="top bar"></div>
      <div class="middle bar"></div>
      <div class="bottom bar"></div>
    </div>

    <nav class="navbar" :class="{ 'navbar-open': mobileNavMenu }">
      <ul>
        <li v-if="authUser" class="navbar-user">
          <a
            v-click-outside="() => (userDropdownOpen = false)"
            @click.prevent="userDropdownOpen = !userDropdownOpen"
          >
            <img
              class="avatar-small"
              :src="authUser.avatar"
              :alt="`${authUser.name}'s profile pic`"
            />
            <span>
              {{ authUser.name }}
              <img
                class="icon-profile"
                src="../assets/svg/arrow-profile.svg"
                alt="profile icon"
              />
            </span>
          </a>

          <div id="user-dropdown" :class="{ 'active-drop': userDropdownOpen }">
            <div class="triangle-drop"></div>
            <ul class="dropdown-menu">
              <li class="dropdown-menu-item">
                <router-link :to="{ name: 'Profile' }">
                  View profile
                </router-link>
              </li>
              <li class="dropdown-menu-item">
                <a @click.prevent="signOut">Log Out</a>
              </li>
            </ul>
          </div>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <router-link :to="{ name: 'SignIn' }">Sign In</router-link>
        </li>
        <li v-if="!authUser" class="navbar-item">
          <router-link :to="{ name: 'Register' }">Register</router-link>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <router-link :to="{ name: 'Profile' }">View Profile</router-link>
        </li>
        <li v-if="authUser" class="navbar-mobile-item">
          <a @click.prevent="signOut"> Sign Out</a>
        </li>
      </ul>

      <!--      <ul>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="index.html">Home</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="category.html">Category</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="forum.html">Forum</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item">-->
      <!--          <a href="thread.html">Thread</a>-->
      <!--        </li>-->
      <!--        &lt;!&ndash; Show these option only on mobile&ndash;&gt;-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="profile.html">My Profile</a>-->
      <!--        </li>-->
      <!--        <li class="navbar-item mobile-only">-->
      <!--          <a href="#">Logout</a>-->
      <!--        </li>-->
      <!--      </ul>-->
    </nav>
  </header>
</template>
