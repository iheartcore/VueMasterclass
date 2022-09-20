<script>
import { useStore } from '../stores'
import { mapState } from 'Pinia'

export default {
  computed: {
    ...mapState(useStore, {
      user: store => store.authUser,
      posts: store => store.$state.posts,
      threads: store => store.$state.threads
    }),
    userPostsCount () {
      return this.userPosts.length
    },
    userThreadsCount () {
      return this.userThreads.length
    },
    userPosts () {
      return this.posts.filter(posts => posts.userId === this.user.id)
    },
    userThreads () {
      return this.threads.filter(posts => posts.userId === this.user.id)
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <div class="profile-card">
          <p class="text-center">
            <img
                :src="user.avatar"
                :alt="`${user.name}'s profile picture`"
                class="avatar-xlarge"
            />
          </p>

          <h1 class="title">{{ user.username }}</h1>
          <p class="text-lead">{{ user.name }}</p>
          <p class="text-justify">
            {{ user.bio || 'No bio specified.' }}
          </p>

          <span class="online">{{ user.username }} is online</span>

          <div class="stats">
            <span>{{ userPostsCount }} posts</span>
            <span>{{ userThreadsCount }} threads</span>
          </div>
          <hr>
          <p v-if="user.website" class="text-large text-center"><i class="fa fa-globe"></i> <a :href="user.website">{{ user.website }}</a></p>
        </div>

        <p class="text-xsmall text-faded text-center">Member since june 2003, last visited 4 hours ago</p>

        <div class="text-center">
          <hr>
          <a href="edit-profile.html" class="btn-green btn-small">Edit Profile</a>
        </div>
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead">
              {{ user.username }}'s recent activity
          </span>
          <a href="#">See only started threads?</a>
        </div>

        <hr>

        <PostList :posts="userPosts" />

        <div class="activity-list">
          <div class="activity">
            <div class="activity-header">
              <img src="http://i.imgur.com/s0AzOkO.png" alt="" class="hide-mobile avatar-small">
              <p class="title">
                Wasabi vs horseraddish?
                <span>Joker replied to Robin's topic in Cooking</span>
              </p>
            </div>

            <div class="post-content">
              <div>
                <blockquote class="small">
                  <div class="author">
                    <a href="/user/robin" class=""> robin</a>
                    <span class="time">a month ago</span>
                    <i class="fa fa-caret-down"></i>
                  </div>

                  <div class="quote">
                    <p>Is horseradish and Wasabi the same thing? I&amp;#39;ve heard so many different things.</p>
                  </div>
                </blockquote>

                <p>They're not the same!</p>
              </div>
            </div>

            <div class="thread-details">
              <span>2 days ago</span>
              <span>1 comment</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
