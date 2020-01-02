<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  data() {
    return {
      title: 'This is header component',
      isActiveUserArea: false
    };
  },
  computed: {
    expandedSidebar() {
      return this.$store.state.layout.expandedSidebar;
    }
  },
  methods: {
    ...mapActions('auth', ['logOut']),
    ...mapActions('layout', ['toggleSidebar']),
    onToggleUserArea() {
      this.isActiveUserArea = !this.isActiveUserArea;
    },
    onLogout() {
      this.logOut()
        .then(res => {
          this.$router.push('/login');
        })
        .catch(err => {});
    },
    onToggleSidebar(){
      this.toggleSidebar();
    }
  }
};
</script>

<template>
  <header id="header">
    <div class="header">
      <div class="top-left">
        <div class="navbar-header">
          <a class="navbar-brand" href="./"
            ><img src="../../assets/images/app-logo.png" alt="Logo"
          /></a>
          <a href="#" class="hamburger-container" v-on:click.stop.prevent="onToggleSidebar">
            <svg
              data-v-49e15297=""
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              class="hamburger" :class="{'active': expandedSidebar}"
            >
              <path
                data-v-49e15297=""
                d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
      <div class="top-right">
        <div class="header-menu">
          <div class="user-area float-right">
            <a
              href="#"
              class="user-profile active"
              v-on:click.stop.prevent="onToggleUserArea"
            >
            </a>

            <div
              class="user-menu animated flipInY "
              :class="{ active: this.isActiveUserArea }"
            >
              <a class="nav-link" href="#"
                ><i class="fa fa-user"></i>My Profile</a
              >

              <a class="nav-link" href="#"
                ><i class="fa fa-bell-o"></i>Notifications
                <span class="count">13</span></a
              >

              <a class="nav-link" href="#"><i class="fa fa-cog"></i>Settings</a>

              <a class="nav-link" href="#" v-on:click.stop.prevent="onLogout"
                ><i class="fa fa-power-off"></i>Logout</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="overlay" :class="{ 'is-open': this.isActiveUserArea }" v-on:click.stop.prevent="onToggleUserArea"></div>
  </header>
</template>

<style lang="scss" scoped>
@import 'src/theme/components/_variables.scss';
.header {
  background-color: $background-color-white;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  padding: 0 30px;
  height: 55px;
  border-bottom: 1px solid $border-color-gray;
  .top-left {
    float: left;
  }
  .navbar-brand {
    width: 250px;
    margin-right: 0;
  }
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
    &.active {
      transform: rotate(180deg);
    }
  }
  .header-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 55px;
  }
  .user-area {
    position: relative;
  }
  .user-profile {
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: $border-color-gray2;
    border-radius: 50%;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      right: -3px;
      bottom: 10px;
      background: #868e96;
      width: 11px;
      height: 11px;
      border-radius: 100%;
      border: 2px solid white;
      z-index: 1;
    }
    &.active {
      &::after {
        background: #49a342;
      }
    }
  }
  .user-menu {
    position: absolute;
    top: 48px;
    width: 200px;
    height: auto;
    right: 0;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.15);
    border: none;
    transition: all 0.3s ease-in-out;
    border-radius: 0 0 0.25rem 0.25rem;
    opacity: 0;
    display: none;
    overflow: hidden;
    background-color: $background-color-white;
    &.active {
      display: block;
      opacity: 1;
    }
  }
}
</style>
