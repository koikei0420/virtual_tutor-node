<template>
  <v-container fluid>
    <v-layout>
      <v-flex xs12>
        <v-layout row wrap fill-height justify-space-around>
          <v-flex xs12 ma-2 v-for="question of questions" :key="question.id">
            <v-card>
              <v-card-title primary-title>
                <h4 class="headline mb-0">{{ question.body }}</h4>
                <p class="headline mb-0">{{ question.created_at }}</p>
              </v-card-title>
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