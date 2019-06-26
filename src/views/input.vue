<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12 sm6>
        <v-subheader>Input</v-subheader>
        <form @submit.prevent="saveQuestion">
          <v-textarea
            v-model="body"
            @input="makePreview"
            @blur="$v.body.$touch()"
            full-width
            auto-grow
          ></v-textarea>
        <v-btn type="submit">Submit</v-btn>
        <v-btn >Cancel</v-btn>
        </form>
      </v-flex>
      <v-flex xs12 sm6>
        <v-card>
          <v-card-text>
            <div id="preview">
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { saveQuestion } from "../lib/api-service";
import { MathJax } from "mathjax"
export default {
  name: "QuestionCreate",
  data() {
    return {
      body: ""
    };
  },
  methods: {
    makePreview: function () {
      const body = this.body
      const input = body.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      document.querySelector('#preview').textContent = input;
      MathJax.Queue(["Typeset", MathJax, "preview"]);
    },
    async saveQuestion() {
      const body = this.body;
      const question = {
        body
      };
      await saveQuestion(question)
    }
  }
};
</script>