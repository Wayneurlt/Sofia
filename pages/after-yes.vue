<template>
  <div class="min-h-screen page-bg font-sans safe-area-padding after-yes-page">
    <div class="after-yes-inner max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24 flex flex-col items-center justify-center text-center">
      <p v-if="showLine1" class="text-rose-600 text-sm sm:text-base font-medium uppercase tracking-wider mb-4 animate-fade-in">
        You said yes
      </p>
      <h1 v-if="showTitle" class="text-2xl sm:text-4xl font-light text-stone-800 mb-6 sm:mb-8 leading-tight [font-family:Georgia,serif] animate-fade-in">
        So here’s what’s next
      </h1>
      <div v-if="showBody" class="space-y-4 sm:space-y-5 animate-fade-in max-w-md">
        <p class="text-stone-700 text-base sm:text-lg leading-relaxed [font-family:Georgia,serif]">
          Valentine’s Day — I’ll be there. I already can’t wait to spend it with you, Sophia. It’s going to be special.
        </p>
        <p class="text-stone-600 text-base sm:text-lg leading-relaxed [font-family:Georgia,serif]">
          Until then, I’ll be thinking of you. Thank you for saying yes. You’ve made my heart full.
        </p>
      </div>
      <div v-if="showDivider" class="w-12 h-0.5 bg-rose-300 rounded-full my-8 opacity-80 animate-fade-in" />
      <p v-if="showClosing" class="text-stone-500 text-sm sm:text-base [font-family:Georgia,serif] animate-fade-in">
        I’m so glad you’re in my life. I love you, Sophia.
      </p>
      <NuxtLink
        v-if="showCta"
        to="/"
        class="after-yes-btn touch-target mt-8 animate-fade-in"
      >
        Back to start
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const showLine1 = ref(false);
const showTitle = ref(false);
const showBody = ref(false);
const showDivider = ref(false);
const showClosing = ref(false);
const showCta = ref(false);

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 400));
  showLine1.value = true;
  await new Promise((r) => setTimeout(r, 500));
  showTitle.value = true;
  await new Promise((r) => setTimeout(r, 600));
  showBody.value = true;
  await new Promise((r) => setTimeout(r, 500));
  showDivider.value = true;
  await new Promise((r) => setTimeout(r, 400));
  showClosing.value = true;
  await new Promise((r) => setTimeout(r, 500));
  showCta.value = true;
});
</script>

<style scoped>
.safe-area-padding {
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
.after-yes-page {
  min-height: 100dvh;
}
.after-yes-inner {
  min-height: 100dvh;
}
@media (min-width: 640px) {
  .after-yes-inner {
    min-height: 80vh;
  }
}
.after-yes-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.875rem 1.5rem;
  min-height: 48px;
  font-size: 1rem;
  font-weight: 500;
  color: #57534e;
  background: #fff;
  border: 2px solid #d6d3d1;
  border-radius: 9999px;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
}
.after-yes-btn:hover {
  border-color: var(--accent, #e11d48);
  background: #fef7f8;
  color: var(--accent, #e11d48);
}
@media (max-width: 640px) {
  .after-yes-btn {
    padding: 1rem 2rem;
    min-height: 52px;
    font-size: 1.0625rem;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out forwards;
}
</style>
