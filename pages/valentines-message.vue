<template>
  <div class="min-h-screen page-bg safe-areas relative">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24 sm:pb-32 relative z-10">
      <header class="text-center mb-12 sm:mb-20 px-1">
        <p class="font-display text-rose-600 text-sm sm:text-base font-medium uppercase tracking-[0.2em] mb-3">
          For you, Sophia
        </p>
        <h1 class="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-stone-800 leading-tight max-w-xl mx-auto">
          A few things that make my heart full
        </h1>
        <p class="font-body text-stone-500 text-sm sm:text-base mt-3 sm:mt-4 max-w-md mx-auto px-2">
          and why I wanted to ask you
        </p>
        <div class="w-16 h-0.5 bg-gradient-to-r from-transparent via-rose-400 to-transparent rounded-full mx-auto mt-6 sm:mt-8 opacity-90" />
      </header>

      <!-- Moment 1: Image left, text right (stack on mobile) -->
      <section v-if="showMemory1" class="animate-fade-in mb-14 sm:mb-28">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          <div class="md:col-span-6 order-2 md:order-1">
            <div class="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 shadow-card border border-white/60 max-w-sm mx-auto md:max-w-none">
              <img
                src="/assets/images/1.jpeg"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
          </div>
          <div class="md:col-span-6 order-1 md:order-2 md:pl-2 px-1">
            <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-rose-600 font-display text-xl sm:text-2xl font-medium">1</span>
            <p class="mt-4 sm:mt-5 font-body text-stone-700 text-base sm:text-xl leading-relaxed">
              When I’m with you I feel at ease. I can be myself. You make the ordinary moments feel good — that’s one of the things that fills my heart.
            </p>
          </div>
        </div>
      </section>

      <!-- Moment 2: Text left, image right -->
      <section v-if="showMemory2" class="animate-fade-in mb-14 sm:mb-28">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 lg:gap-14 items-center">
          <div class="md:col-span-6 px-1">
            <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-rose-600 font-display text-xl sm:text-2xl font-medium">2</span>
            <p class="mt-4 sm:mt-5 font-body text-stone-700 text-base sm:text-xl leading-relaxed">
              I love your laugh. It’s one of my favourite sounds — I could listen to it for a long time. I hope I get to.
            </p>
          </div>
          <div class="md:col-span-6">
            <div class="aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 shadow-card border border-white/60 max-w-sm mx-auto md:max-w-none">
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
        <div class="aspect-[3/4] sm:aspect-[4/3] max-w-xl sm:max-w-2xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-100 shadow-card border border-white/60">
          <img
            src="/assets/images/3.jpeg"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>
        <div class="max-w-xl mx-auto mt-6 sm:mt-10 text-center px-2">
          <span class="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-rose-600 font-display text-xl sm:text-2xl font-medium mx-auto">3</span>
          <p class="mt-4 sm:mt-5 font-body text-stone-700 text-base sm:text-xl leading-relaxed">
            And you matter to me — more than I know how to put into words. So I have one question for you, Sophia.
          </p>
        </div>
      </section>

      <!-- CTA -->
      <footer v-if="showFinal" class="text-center animate-fade-in pt-2 px-2">
        <p class="font-body text-stone-600 mb-6 sm:mb-8 text-base sm:text-lg">So that’s why I’m asking you, Sophia.</p>
        <NuxtLink
          to="/the-question"
          class="btn-primary touch-target font-display font-medium"
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
  font-size: 1.0625rem;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(135deg, var(--accent, #e11d48) 0%, #be123c 100%);
  border-radius: 9999px;
  transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
  box-shadow: 0 4px 18px rgba(225, 29, 72, 0.4), 0 2px 6px rgba(0, 0, 0, 0.06);
}
.btn-primary:hover {
  background: linear-gradient(135deg, #f43f5e 0%, var(--accent-hover, #be123c) 100%);
  box-shadow: 0 8px 24px rgba(225, 29, 72, 0.45);
  transform: translateY(-1px);
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
