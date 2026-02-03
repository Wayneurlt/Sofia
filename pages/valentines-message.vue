<template>
  <div class="min-h-screen page-bg font-sans safe-areas">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24 sm:pb-32">
      <header class="text-center mb-12 sm:mb-20 px-1">
        <p class="text-rose-600 text-sm sm:text-base font-medium uppercase tracking-wider mb-3">
          For you, Sophia
        </p>
        <h1 class="text-xl sm:text-3xl md:text-4xl font-light text-stone-800 leading-tight [font-family:Georgia,serif] max-w-xl mx-auto">
          A few things that make my heart full
        </h1>
        <p class="text-stone-500 text-sm sm:text-base mt-3 sm:mt-4 max-w-md mx-auto px-2">
          and why I wanted to ask you
        </p>
        <p class="text-stone-400 text-sm mt-2 sm:mt-3 max-w-sm mx-auto [font-family:Georgia,serif]">
          Thank you for being you. You’re the best part of my days.
        </p>
        <div class="w-12 h-0.5 bg-rose-400 rounded-full mx-auto mt-5 sm:mt-6 opacity-80" />
      </header>

      <!-- Moment 1: Image left, text right (stack on mobile) -->
      <section v-if="showMemory1" class="animate-fade-in mb-14 sm:mb-28">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          <div class="md:col-span-6 order-2 md:order-1">
            <div class="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-lg max-w-sm mx-auto md:max-w-none">
              <img
                src="/assets/images/1.jpeg"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="md:col-span-6 order-1 md:order-2 md:pl-2 px-1">
            <span class="text-rose-400 text-2xl sm:text-3xl [font-family:Georgia,serif] font-light">1</span>
            <p class="mt-3 sm:mt-4 text-stone-700 text-base sm:text-xl leading-relaxed [font-family:Georgia,serif]">
              Being with you feels like home. I feel most like myself when we’re together — and I fall for you a little more every day.
            </p>
          </div>
        </div>
      </section>

      <!-- Moment 2: Text left, image right -->
      <section v-if="showMemory2" class="animate-fade-in mb-14 sm:mb-28">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          <div class="md:col-span-6 px-1">
            <span class="text-rose-400 text-2xl sm:text-3xl [font-family:Georgia,serif] font-light">2</span>
            <p class="mt-3 sm:mt-4 text-stone-700 text-base sm:text-xl leading-relaxed [font-family:Georgia,serif]">
              Your laugh is one of my favourite sounds in the world. I hope I get to hear it for a long, long time.
            </p>
          </div>
          <div class="md:col-span-6">
            <div class="aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-lg max-w-sm mx-auto md:max-w-none">
              <img
                src="/assets/images/2.jpeg"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Moment 3: Full-width image, then text -->
      <section v-if="showMemory3" class="animate-fade-in mb-14 sm:mb-28">
        <div class="aspect-[3/4] sm:aspect-[4/3] max-w-xl sm:max-w-2xl mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-stone-100 shadow-lg">
          <img
            src="/assets/images/3.jpeg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div class="max-w-xl mx-auto mt-6 sm:mt-10 text-center px-2">
          <span class="text-rose-400 text-2xl sm:text-3xl [font-family:Georgia,serif] font-light">3</span>
          <p class="mt-3 sm:mt-4 text-stone-700 text-base sm:text-xl leading-relaxed [font-family:Georgia,serif]">
            And honestly, I think you’re the most amazing person I know. So I have one question for you, Sophia.
          </p>
        </div>
      </section>

      <!-- CTA -->
      <footer v-if="showFinal" class="text-center animate-fade-in pt-2 px-2">
        <p class="text-stone-600 mb-6 sm:mb-8 text-base sm:text-lg [font-family:Georgia,serif]">So that’s why I’m asking you, Sophia...</p>
        <NuxtLink
          to="/the-question"
          class="btn-primary touch-target"
        >
          Continue
        </NuxtLink>
      </footer>
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
.safe-areas {
  padding-top: max(0.5rem, env(safe-area-inset-top));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
  padding-left: max(0.5rem, env(safe-area-inset-left));
  padding-right: max(0.5rem, env(safe-area-inset-right));
}
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 2rem;
  min-height: 48px;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--accent, #e11d48);
  border-radius: 9999px;
  transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
  box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);
}
.btn-primary:hover {
  background: var(--accent-hover, #be123c);
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.45);
}
.btn-primary:active {
  transform: scale(0.98);
}
@media (max-width: 640px) {
  .btn-primary {
    padding: 1rem 2rem;
    min-height: 52px;
    font-size: 1.0625rem;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
</style>
