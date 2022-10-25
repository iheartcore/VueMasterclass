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
            .userStore()
            .signInWithEmailAndPassword({ data: this.formData })
          this.$router.push('/')
        } catch (e) {
          alert(e.message)
        }
      },
      async signInWithGoogle() {
        try {
          await allStore.userStore().signInWithGoogle()
          this.$router.push('/')
        } catch (e) {
          alert(e.message)
        }
      },
    },
  }
</script>

<template>
  <div class="flex-grid justify-center">
    <div class="col-2">
      <form @submit.prevent="signIn" class="card card-form">
        <h1 class="text-center">Login</h1>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            v-model="formData.email"
            id="email"
            type="text"
            class="form-input"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="formData.password"
            id="password"
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
        <button @click="signInWithGoogle" class="btn-red btn-xsmall">
          <i class="fa fa-google fa-btn"></i>Sign in with Google
        </button>
      </div>
    </div>
  </div>
</template>
