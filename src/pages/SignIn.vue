<script>
  import { allStore } from '@/stores'

  export default {
    emits: ['ready'],
    data() {
      return {
        formData: {
          email: '',
          password: '',
        },
      }
    },
    created() {
      this.$emit('ready')
    },
    methods: {
      async signIn() {
        try {
          await allStore
            .authStore()
            .signInWithEmailAndPassword({ data: this.formData })
          this.successRedirect()
        } catch (e) {
          alert(e.message)
        }
      },
      async signInWithGoogle() {
        try {
          await allStore.authStore().signInWithGoogle()
          this.successRedirect()
        } catch (e) {
          alert(e.message)
        }
      },
      successRedirect() {
        const redirectTo = this.$route.query.redirectTo || { name: 'Home' }

        this.$router.push(redirectTo)
      },
    },
  }
</script>

<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form class="card card-form" @submit.prevent="signIn">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            id="password"
            v-model="formData.password"
            type="password"
            class="form-input"
          />
        </div>

        <div class="push-top">
          <button type="submit" class="btn-blue btn-block">Log in</button>
        </div>

        <div class="form-actions text-right">
          <router-link :to="{ name: 'Register' }"
            >Create an account?</router-link
          >
        </div>
      </form>

      <div class="push-top text-center">
        <button class="btn-red btn-xsmall" @click="signInWithGoogle">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
