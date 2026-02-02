<template>
  <div class="min-h-screen bg-[#faf9f7] font-sans">
    <HomeNavbar />
    <div class="max-w-xl mx-auto px-4 pt-24 pb-16 flex flex-col items-center justify-center min-h-[80vh]">
      <template v-if="!answered">
        <p v-if="showIntro" class="text-xl text-stone-600 mb-8 animate-fade-in">Sofia,</p>
        <div v-if="showQuestion" class="text-center animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-light text-stone-700 mb-12 leading-tight">
            Will you be my Valentine?
          </h1>
          <div class="flex gap-4 justify-center flex-wrap">
            <button
              @click="handleYes"
              class="px-10 py-3.5 text-stone-700 text-base font-medium rounded-full border-2 border-stone-400 hover:bg-stone-100 transition-colors duration-200"
            >
              Yes
            </button>
            <button
              @mouseenter="moveNoButton"
              @click="moveNoButton"
              :style="
                noButtonMoved
                  ? { position: 'fixed', left: noButtonX + 'px', top: noButtonY + 'px', zIndex: 50 }
                  : {}
              "
              class="px-10 py-3.5 text-stone-400 text-base font-medium rounded-full border border-stone-300 hover:bg-stone-50 transition-all duration-200"
            >
              No
            </button>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="text-center animate-fade-in">
          <h1 class="text-3xl sm:text-4xl font-light text-stone-700 mb-8">Perfect.</h1>
          <p class="text-xl text-stone-600 mb-4">I'm really glad you said yes.</p>
          <p class="text-stone-500 mb-12">Looking forward to spending Valentine's Day with you.</p>
          <NuxtLink
            to="/"
            class="inline-block px-8 py-3 text-stone-600 text-base font-medium rounded-full border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-colors duration-200"
          >
            Start over
          </NuxtLink>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const answered = ref(false);
const noButtonMoved = ref(false);
const noButtonX = ref(0);
const noButtonY = ref(0);
const showIntro = ref(false);
const showQuestion = ref(false);

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 300));
  showIntro.value = true;
  await new Promise((r) => setTimeout(r, 1200));
  showQuestion.value = true;
});

const handleYes = () => {
  answered.value = true;
};

const moveNoButton = () => {
  noButtonMoved.value = true;
  noButtonX.value = Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 180 : 200);
  noButtonY.value = Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 80 : 200);
};
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.5s ease-out;
}
</style>
