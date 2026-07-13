<template>
  <div class="final-section final-section--after-video fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden">
    <!-- Dark base -->
    <div class="final-bg absolute inset-0 pointer-events-none" />
    <!-- Warm glow -->
    <div class="final-bg-glow absolute inset-0 pointer-events-none" />
    <div class="final-vignette absolute inset-0 pointer-events-none" />

    <div class="final-content relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
      <Transition name="birthday-msg-in">
        <div v-if="revealed" class="birthday-msg-wrap text-center">
          <p class="birthday-msg birthday-msg-line1 font-display text-2xl sm:text-3xl md:text-4xl text-white/95">
            i'm not going anywhere, Sophia. not now, not ever.
          </p>
          <p class="birthday-msg-heart font-display text-4xl sm:text-5xl md:text-6xl mt-2 sm:mt-3" aria-hidden="true">
            ❤️
          </p>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
const revealed = ref(false);

onMounted(() => {
  setTimeout(() => {
    revealed.value = true;
  }, 300);
});
</script>

<style scoped>
.final-section {
  min-height: 100dvh;
  min-height: 100vh;
  transition: background-color 1.5s ease-out;
}

.final-bg {
  background-color: #0c0a09;
}

.final-section--after-video .final-bg {
  background: linear-gradient(180deg, #1a1215 0%, #0f0c0e 50%, #0c0a09 100%);
}

.final-bg-glow {
  opacity: 0;
  background: radial-gradient(
    ellipse 100% 80% at 50% 50%,
    rgba(190, 18, 60, 0.12) 0%,
    rgba(136, 19, 55, 0.06) 40%,
    transparent 70%
  );
  transition: opacity 1.5s ease-out 0.5s;
  pointer-events: none;
}

.final-section--after-video .final-bg-glow {
  opacity: 1;
}

.final-vignette {
  background: radial-gradient(
    ellipse 80% 70% at 50% 50%,
    transparent 40%,
    rgba(0, 0, 0, 0.35) 100%
  );
}

@keyframes text-glow {
  0%,
  100% {
    opacity: 0.95;
    text-shadow: 0 0 20px rgba(255, 255, 255, 0.15), 0 0 40px rgba(255, 255, 255, 0.08);
  }
  50% {
    opacity: 1;
    text-shadow: 0 0 28px rgba(255, 255, 255, 0.2), 0 0 56px rgba(255, 255, 255, 0.12);
  }
}

.birthday-msg-wrap {
  max-width: 36rem;
}

.birthday-msg-in-enter-active .birthday-msg-line1 {
  animation: msg-line-in 1.4s ease-out 0.2s both;
}

.birthday-msg-in-enter-active .birthday-msg-heart {
  animation: heart-in 1.6s ease-out 0.6s both;
}

.birthday-msg-in-enter-active {
  transition: opacity 0.8s ease-out 0.15s;
}
.birthday-msg-in-enter-from {
  opacity: 0;
}
.birthday-msg-in-enter-to {
  opacity: 1;
}

@keyframes msg-line-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes heart-in {
  from {
    opacity: 0;
    transform: scale(0.6);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.birthday-msg-line1 {
  text-shadow:
    0 0 24px rgba(255, 255, 255, 0.18),
    0 0 48px rgba(225, 29, 72, 0.12);
  animation: text-glow 4s ease-in-out infinite 1.5s;
}

.birthday-msg-heart {
  display: inline-block;
  filter: drop-shadow(0 0 12px rgba(225, 29, 72, 0.35));
  animation: heart-pulse 2s ease-in-out infinite 2s;
}

@keyframes heart-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
}
</style>
