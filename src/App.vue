<template>
  <v-app>
    <v-toolbar>
      <v-toolbar-title><router-link to="/">Virtual Tutor</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn flat><router-link to="/questions/input">New Question</router-link></v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <router-view></router-view>
    <v-footer>Design by K.Koike</v-footer>
  </v-app>
</template>

