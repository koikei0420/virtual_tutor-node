<template>
  <v-layout justify-center>
    <v-container
        fluid
        grid-list-md
      >
      <v-layout row wrap>
        <v-flex xs12>
          <v-card>
            <v-card-title primary-title>
              <h3>Question: </h3>
              <vue-mathjax :formula="questionBody"></vue-mathjax>
            </v-card-title>
            <v-card-text>{{ questionCreatedAt }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs6>
          <v-subheader>Input</v-subheader>
          <form @submit.prevent="saveAnswer">
            <v-card>
              <v-textarea
                v-model="body"
                full-width
                auto-grow
              ></v-textarea>
            </v-card>
            <v-btn type="submit">Submit</v-btn>
            <v-btn :to="{name: 'questions'}">Cancel</v-btn>
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
import { getAnswers, saveAnswer } from "../lib/api-service";
export default {
  name: "AnswerCreate",
  data() {
    return {
      body: "",
      questionBody: "None texts",
      questionCreatedAt: "0123456789"
    };
  },
  methods: {
    async saveAnswer() {
      const body = this.body;
      const questionID = this.$route.params.id;
      const answer = {
        body
      };
      await saveAnswer(answer, questionID)
      this.$router.push({ name: "questions", params: { id : questionID } });
    }
  },
  created: async function() {
    const questionID = this.$route.params.id
    const returnJson = await getAnswers(questionID);
    this.questionBody = returnJson.body;
    this.questionCreatedAt = returnJson.created_at;
  }
};
</script>