<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-layout row wrap fill-height justify-space-around>
          <v-flex xs12 ma-2 v-for="question of questions" :key="question.id">
            <v-card :to="{ name: 'questions', params: { id : question.id }}">
              <v-card-title primary-title>
                <vue-mathjax :formula="question.body"></vue-mathjax>
              </v-card-title>
              <v-card-text>{{ question.created_at }}</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { getQuestions } from "../lib/api-service";
export default {
  name: "QuestionView",
  data() {
    return {
      questions: []
    };
  },
  created: async function() {
    const questions = await getQuestions();
    this.questions = questions;
  }
};
</script>