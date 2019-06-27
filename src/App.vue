<template>
  <v-app>
    <v-toolbar>
      <router-link to="/" tag="span" class="logo">
        <v-toolbar-title>
          Virtual Tutor
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/questions/input">
        <v-btn fab dark color="indigo">
          <v-icon dark>edit</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>
    <router-view></router-view>
    <v-footer>Design by K.Koike</v-footer>
  </v-app>
</template>

