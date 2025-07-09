<template>
    <home-navbar/>
  <div class="min-h-screen bg-gradient-to-b from-purple-50 to-pink-100 p-4">
    <div class="max-w-2xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-serif text-purple-800 mb-2">Our Love Quiz</h1>
        <p class="text-lg text-purple-600">How well do we really know each other?</p>
      </div>

      <!-- Quiz Intro -->
      <div v-if="quizState === 'intro'" class="bg-white rounded-xl shadow-md p-6 text-center">
        <img src="/assets/images/hop.png" alt="Couple Quiz" class="mx-auto w-40 h-40 object-contain mb-4">
        <h2 class="text-2xl font-medium text-black mb-4">Ready to test our connection?</h2>
        <p class="text-gray-700 mb-6">We'll each answer {{ questions.length }} questions about our relationship. Let's see how well we know each other!</p>
        <button
          @click="startQuiz"
          class="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition transform hover:scale-105"
        >
          Start Quiz
        </button>
      </div>

      <!-- Quiz Questions -->
      <div v-if="quizState === 'questions'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-sm font-medium text-purple-600">Question {{ currentQuestionIndex + 1 }} of {{ questions.length }}</span>
            <div class="w-full bg-purple-100 rounded-full h-2.5 ml-4">
              <div
                class="bg-purple-600 h-2.5 rounded-full transition-all duration-300"
                :style="{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }"
              ></div>
            </div>
          </div>

          <h2 class="text-xl font-medium text-purple-800 mb-6">{{ currentQuestion.text }}</h2>

          <div class="space-y-3">
            <button
              v-for="(option, index) in currentQuestion.options"
              :key="index"
              @click="selectAnswer(option)"
              class="w-full p-4 text-left border border-purple-200 rounded-lg hover:bg-purple-50 transition"
              :class="{ 'bg-purple-100 border-purple-400': selectedAnswer === option }"
            >
              {{ option }}
            </button>
          </div>
        </div>

        <div class="flex justify-between">
          <button
            v-if="currentQuestionIndex > 0"
            @click="prevQuestion"
            class="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition"
          >
            Back
          </button>
          <div v-else></div>
          
          <button
            v-if="selectedAnswer"
            @click="nextQuestion"
            class="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition"
          >
            {{ currentQuestionIndex === questions.length - 1 ? 'See Results' : 'Next' }}
          </button>
        </div>
      </div>

      <!-- Quiz Results -->
      <div v-if="quizState === 'results'" class="bg-white rounded-xl shadow-md p-6 text-center">
        <div class="mb-6">
          <div class="relative inline-block">
            <div class="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center mx-auto">
              <span class="text-4xl font-bold text-purple-600">{{ score }}%</span>
            </div>
            <div class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Compatibility Score
            </div>
          </div>
        </div>

        <h2 class="text-2xl font-medium text-purple-800 mb-4">{{ resultTitle }}</h2>
        <p class="text-gray-700 mb-6">{{ resultMessage }}</p>

        <div class="bg-purple-50 rounded-lg p-4 mb-6 text-left">
          <h3 class="font-medium text-purple-700 mb-3">Quiz Summary</h3>
          <div v-for="(feedback, index) in questionFeedback" :key="index" class="mb-3 last:mb-0">
            <p class="text-sm text-purple-600 font-medium">{{ questions[index].text }}</p>
            <p class="text-sm" :class="feedback.correct ? 'text-green-600' : 'text-red-600'">
              {{ feedback.message }}
            </p>
          </div>
        </div>

        <button
          @click="restartQuiz"
          class="px-8 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-full shadow-lg transition transform hover:scale-105"
        >
          Take Quiz Again
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Question {
  text: string;
  options: string[];
  correctAnswer: string;
  funFact: string;
}

interface QuestionFeedback {
  correct: boolean;
  message: string;
}

// Quiz state: 'intro', 'questions', or 'results'
const quizState = ref('intro');
const currentQuestionIndex = ref(0);
const selectedAnswer = ref('');
const answers = ref<string[]>([]);
const questionFeedback = ref<QuestionFeedback[]>([]);

// Questions about your relationship (customize these!)
const questions = ref<Question[]>([
  {
    text: "Where was our first date?",
    options: ["Coffee shop downtown", "That Italian restaurant", "City park", "I actually don't remember"],
    correctAnswer: "That Italian restaurant",
    funFact: "You spilled wine on your shirt but played it off so smoothly!"
  },
  {
    text: "What's my favorite comfort food?",
    options: ["Pizza", "Ice cream", "Mac & cheese", "Chocolate"],
    correctAnswer: "Ice cream",
    funFact: "Especially mint chocolate chip, even though you think it tastes like toothpaste!"
  },
  {
    text: "What silly nickname do I call you when no one's around?",
    options: ["Sweetheart", "Babe", "Goofball", "Snugglebug"],
    correctAnswer: "Goofball",
    funFact: "It started that time you tripped over nothing in the parking lot"
  },
  {
    text: "What's the most embarrassing song I secretly love?",
    options: ["Baby Shark", "Barbie Girl", "MMMBop", "All of the above"],
    correctAnswer: "All of the above",
    funFact: "But you'll never admit this in public"
  },
  {
    text: "What's my weirdest habit?",
    options: ["Talking to plants", "Counting steps out loud", "Organizing by color", "Singing in the shower"],
    correctAnswer: "Organizing by color",
    funFact: "Your rainbow-organized bookshelf is actually kinda impressive"
  }
]);

// Current question
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value];
});

// Calculate score
const score = computed(() => {
  const correctCount = answers.value.reduce((count, answer, index) => {
    return count + (answer === questions.value[index].correctAnswer ? 1 : 0);
  }, 0);
  return Math.round((correctCount / questions.value.length) * 100);
});

// Result title based on score
const resultTitle = computed(() => {
  if (score.value >= 90) return "Soulmates!";
  if (score.value >= 70) return "Perfect Match!";
  if (score.value >= 50) return "Great Connection!";
  if (score.value >= 30) return "Getting There!";
  return "Oops! Need more dates!";
});

// Result message based on score
const resultMessage = computed(() => {
  if (score.value >= 90) {
    return "You know each other inside out! Our connection is so strong it's almost scary. Relationship goals achieved!";
  }
  if (score.value >= 70) {
    return "We've got an amazing connection! You know most of what makes each other tick, with just enough mystery to keep things interesting.";
  }
  if (score.value >= 50) {
    return "We're on the right track! You know the important stuff about each other, with plenty more to discover. More dates = higher score!";
  }
  if (score.value >= 30) {
    return "We're still learning about each other! Don't worry - this just means we have lots of fun discoveries ahead.";
  }
  return "Did we just meet? Just kidding! Maybe we should spend more time asking each other deep questions... or at least pay more attention!";
});

// Start the quiz
const startQuiz = () => {
  quizState.value = 'questions';
  currentQuestionIndex.value = 0;
  selectedAnswer.value = '';
  answers.value = [];
  questionFeedback.value = [];
};

// Select an answer
const selectAnswer = (answer: string) => {
  selectedAnswer.value = answer;
};

// Go to next question
const nextQuestion = () => {
  answers.value.push(selectedAnswer.value);
  
  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
    selectedAnswer.value = '';
  } else {
    generateFeedback();
    quizState.value = 'results';
  }
};

// Go to previous question
const prevQuestion = () => {
  currentQuestionIndex.value--;
  selectedAnswer.value = answers.value[currentQuestionIndex.value];
};

// Generate feedback for all questions
const generateFeedback = () => {
  questionFeedback.value = questions.value.map((question, index) => {
    const correct = answers.value[index] === question.correctAnswer;
    return {
      correct,
      message: correct 
        ? `You're right! ${question.funFact}`
        : `Actually: ${question.correctAnswer}. ${question.funFact}`
    };
  });
};

// Restart quiz
const restartQuiz = () => {
  quizState.value = 'intro';
  currentQuestionIndex.value = 0;
  selectedAnswer.value = '';
  answers.value = [];
  questionFeedback.value = [];
};
</script>

<style scoped>
.progress-bar {
  transition: width 0.3s ease;
}
</style>