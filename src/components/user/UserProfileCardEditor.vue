<script>
  import { allStore } from '@/stores'

  export default {
    props: {
      user: {
        type: Object,
        required: true,
      },
    },
    emits: ['ready'],
    data() {
      return {
        activeUser: { ...this.user },
      }
    },
    created() {
      this.$emit('ready')
    },
    methods: {
      save() {
        allStore.userStore().saveUser({
          activeUser: { ...this.activeUser },
        })

        this.$router.push({ name: 'Profile' })
      },
      cancel() {
        this.$router.push({ name: 'Profile' })
      },
    },
  }
</script>

<template>
  <form @submit.prevent="save">
    <div class="profile-card">
      <p class="text-center">
        <img
          :src="user.avatar"
          :alt="`${user.name}`"
          class="avatar-xlarge img-update"
        />
      </p>

      <div class="form-group">
        <input
          v-model="activeUser.username"
          type="text"
          placeholder="Username"
          class="form-input text-lead text-bold"
        />
      </div>

      <div class="form-group">
        <input
          v-model="activeUser.name"
          type="text"
          placeholder="Full Name"
          class="form-input text-lead"
        />
      </div>

      <div class="form-group">
        <label for="user_bio">Bio</label>
        <textarea
          id="user_bio"
          v-model="activeUser.bio"
          class="form-input"
          placeholder="Write a few words about yourself."
        ></textarea>
      </div>

      <div class="stats">
        <span>{{ user.postsCount }} posts</span>
        <span>{{ user.threadsCount }} threads</span>
      </div>

      <hr />

      <div class="form-group">
        <label class="form-label" for="user_website">Website</label>
        <input
          id="user_website"
          v-model="activeUser.website"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_email">Email</label>
        <input
          id="user_email"
          v-model="activeUser.email"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="user_location">Location</label>
        <input
          id="user_location"
          v-model="activeUser.location"
          autocomplete="off"
          class="form-input"
        />
      </div>

      <div class="btn-group space-between">
        <button class="btn-ghost" @click.prevent="cancel">Cancel</button>
        <button type="submit" class="btn-blue">Save</button>
      </div>
    </div>
  </form>
</template>
