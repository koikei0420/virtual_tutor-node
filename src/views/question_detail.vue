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
          <v-btn :to="{ name: 'answer_input' }">Answer</v-btn>
        </v-flex>
        <v-flex xs11 ma-2 v-for="answer of answers" :key="answer.id">
          <v-card>
            <v-card-title primary-title>
              <vue-mathjax :formula="answer.body"></vue-mathjax>
            </v-card-title>
            <v-card-text>{{ answer.created_at }}</v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-layout>
</template>

<script>
import { getAnswers } from "../lib/api-service";
export default {
  name: "QuestionDetailView",
  data() {
    return {
      questionBody: "",
      questionCreatedAt: "",
      answers: []
    };
  },
  created: async function() {
    const questionID = this.$route.params.id
    const returnJson = await getAnswers(questionID);
    this.questionBody = returnJson.body;
    this.questionCreatedAt = returnJson.created_at;
    this.answers = returnJson.answers
  }
};
</script>