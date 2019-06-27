<template>
  <v-layout justify-center align-start>
    <v-container
        fluid
        grid-list-md
      >
      <v-layout row wrap>
        <v-flex xs6>
          <v-subheader>Input</v-subheader>
          <form @submit.prevent="saveQuestion">
            <v-card>
              <v-textarea
                v-model="body"
                full-width
                auto-grow
              ></v-textarea>
            </v-card>
            <v-btn type="submit">Submit</v-btn>
            <v-btn :to="{name: 'top'}">Cancel</v-btn>
          </form>
        </v-flex>
        <v-flex xs6>
          <v-subheader>Preview</v-subheader>
          <v-card>
            <v-card-title>
              <vue-mathjax :formula="body"></vue-mathjax>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { saveQuestion } from "../lib/api-service";
export default {
  name: "QuestionCreate",
  data() {
    return {
      body: ""
    };
  },
  methods: {
    async saveQuestion() {
      const body = this.body;
      const question = {
        body
      };
      await saveQuestion(question)
      this.$router.push({ name: "top" });
    }
  }
};
</script>