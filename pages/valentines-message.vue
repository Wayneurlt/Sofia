<template>
  <div class="min-h-screen bg-[#faf9f7] font-sans">
    <HomeNavbar />
    <div class="max-w-2xl mx-auto px-4 pt-24 pb-16">
      <h1 class="text-2xl sm:text-3xl font-light text-stone-700 mb-12 text-center">
        A few things I wanted to show you
      </h1>

      <div class="space-y-16">
        <div v-if="showMemory1" class="animate-fade-in">
          <div class="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/assets/images/1.jpeg"
              alt=""
              class="w-full h-72 sm:h-80 object-cover"
            />
            <div class="p-6 sm:p-8">
              <p class="text-stone-600 text-lg leading-relaxed">
                I really like spending time with you.
              </p>
            </div>
          </div>
        </div>

        <div v-if="showMemory2" class="animate-fade-in">
          <div class="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/assets/images/2.jpeg"
              alt=""
              class="w-full h-72 sm:h-80 object-cover"
            />
            <div class="p-6 sm:p-8">
              <p class="text-stone-600 text-lg leading-relaxed">
                You make me laugh more than anyone else.
              </p>
            </div>
          </div>
        </div>

        <div v-if="showMemory3" class="animate-fade-in">
          <div class="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
            <img
              src="/assets/images/3.jpeg"
              alt=""
              class="w-full h-72 sm:h-80 object-cover"
            />
            <div class="p-6 sm:p-8">
              <p class="text-stone-600 text-lg leading-relaxed">
                And honestly, I think you're pretty great.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div v-if="showFinal" class="mt-16 text-center animate-fade-in">
        <p class="text-stone-500 mb-8">So...</p>
        <NuxtLink
          to="/the-question"
          class="inline-block px-8 py-3 text-stone-600 text-base font-medium rounded-full border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-colors duration-200"
        >
          Continue
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showMemory1 = ref(false);
const showMemory2 = ref(false);
const showMemory3 = ref(false);
const showFinal = ref(false);

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 400));
  showMemory1.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  showMemory2.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  showMemory3.value = true;
  await new Promise((r) => setTimeout(r, 1500));
  showFinal.value = true;
});
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
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
