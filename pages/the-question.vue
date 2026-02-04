<template>
  <div class="min-h-screen page-bg safe-area-padding question-page relative">
    <div class="question-inner max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-20 sm:pb-24 flex flex-col items-center justify-center relative z-10">
      <template v-if="!answered">
        <p v-if="showIntro" class="font-display text-xl sm:text-2xl text-stone-700 mb-4 sm:mb-6 animate-fade-in text-center">Sophia,</p>
        <p v-if="showIntro" class="font-body text-stone-500 text-base sm:text-lg mb-6 sm:mb-8 animate-fade-in text-center">There’s one thing I’ve been wanting to ask you.</p>
        <div v-if="showQuestion" class="text-center animate-fade-in w-full flex flex-col items-center">
          <div class="question-card">
            <h1 class="font-display text-2xl sm:text-4xl md:text-5xl font-medium text-stone-800 mb-10 sm:mb-12 leading-tight text-center tracking-tight">
              Will you be my Valentine?
            </h1>
            <div class="flex gap-3 sm:gap-4 justify-center flex-wrap">
              <button
                @click="handleYes"
                class="btn-yes touch-target font-display font-semibold"
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
                class="btn-no touch-target font-body"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </template>

      <template v-else>
        <!-- Celebration layer: confetti -->
        <div class="celebration-layer" aria-hidden="true">
          <div
            v-for="i in 50"
            :key="'confetti-' + i"
            class="confetti-piece"
            :style="getConfettiStyle(i)"
          />
        </div>

        <!-- Floating hearts (ambient) -->
        <div class="hearts-layer" aria-hidden="true">
          <div
            v-for="i in 12"
            :key="'heart-' + i"
            class="heart-float"
            :style="getHeartFloatStyle(i)"
          >
            ❤️
          </div>
        </div>

        <!-- Tap-to-spawn hearts -->
        <div
          v-for="h in tapHearts"
          :key="h.id"
          class="heart-tap"
          :style="{ left: h.x + 'px', top: h.y + 'px' }"
        >
          ❤️
        </div>

        <!-- Romantic moment right after she clicks Yes -->
        <Transition name="yes-moment">
          <div
            v-if="showYesMoment"
            class="yes-moment-overlay"
            aria-hidden="true"
          >
            <div class="yes-moment-inner">
              <span class="yes-moment-heart">❤️</span>
              <h2 class="yes-moment-title">She said yes</h2>
              <p class="yes-moment-sub font-body">Thank you, Sophia.</p>
            </div>
          </div>
        </Transition>

        <div
          v-show="!showYesMoment"
          class="text-center w-full success-content"
          @click="spawnHeart"
        >
          <h1 class="success-title font-display">You said yes.</h1>
          <p class="success-sub success-line-1 font-body">Thank you, Sophia. You just made me really happy.</p>
          <p class="success-sub success-line-2 font-body">I can’t wait to spend Valentine’s Day with you — and every day after.</p>
          <p class="success-sub success-line-3 font-body">I love you, Sophia.</p>
          <p class="tap-hint font-body">Tap anywhere to add more hearts</p>
          <div class="success-btns flex flex-col sm:flex-row gap-3 justify-center items-center">
            <NuxtLink
              to="/after-yes"
              class="success-btn success-btn-primary touch-target"
              @click.stop
            >
              See what’s next
            </NuxtLink>
            <NuxtLink
              to="/"
              class="success-btn touch-target"
              @click.stop
            >
              Back to start
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const answered = ref(false);
const showYesMoment = ref(false);
const noButtonMoved = ref(false);
const noButtonX = ref(0);
const noButtonY = ref(0);
const showIntro = ref(false);
const showQuestion = ref(false);
const tapHearts = ref<{ id: number; x: number; y: number }[]>([]);
let tapHeartId = 0;

onMounted(async () => {
  await new Promise((r) => setTimeout(r, 300));
  showIntro.value = true;
  await new Promise((r) => setTimeout(r, 1200));
  showQuestion.value = true;
});

const handleYes = async () => {
  answered.value = true;
  showYesMoment.value = true;
  // Notify wayneurlt@gmail.com (fire-and-forget)
  $fetch("/api/notify-yes", { method: "POST" }).catch(() => {});
  setTimeout(() => {
    showYesMoment.value = false;
  }, 2800);
};

const moveNoButton = () => {
  noButtonMoved.value = true;
  noButtonX.value = Math.random() * (typeof window !== 'undefined' ? window.innerWidth - 180 : 200);
  noButtonY.value = Math.random() * (typeof window !== 'undefined' ? window.innerHeight - 80 : 200);
};

function spawnHeart(e: MouseEvent | TouchEvent) {
  const x = 'touches' in e ? e.touches[0]?.clientX ?? 0 : (e as MouseEvent).clientX;
  const y = 'touches' in e ? e.touches[0]?.clientY ?? 0 : (e as MouseEvent).clientY;
  const id = ++tapHeartId;
  tapHearts.value = [...tapHearts.value, { id, x: x - 24, y: y - 24 }];
  setTimeout(() => {
    tapHearts.value = tapHearts.value.filter((h) => h.id !== id);
  }, 2500);
}

function getConfettiStyle(i: number) {
  const colors = ['#e11d48', '#f43f5e', '#fb7185', '#fda4af', '#fecdd3', '#fce7f3'];
  const left = Math.random() * 100;
  const delay = Math.random() * 0.8;
  const duration = 2 + Math.random() * 1.5;
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = 6 + Math.random() * 8;
  const rotation = Math.random() * 360;
  return {
    left: `${left}%`,
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: color,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    transform: `rotate(${rotation}deg)`,
  };
}

function getHeartFloatStyle(i: number) {
  const left = Math.random() * 100;
  const delay = Math.random() * 4;
  const duration = 8 + Math.random() * 6;
  const size = 18 + Math.random() * 20;
  return {
    left: `${left}%`,
    fontSize: `${size}px`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    opacity: 0.4 + Math.random() * 0.4,
  };
}
</script>

<style scoped>
.safe-area-padding {
  padding-left: max(1rem, env(safe-area-inset-left));
  padding-right: max(1rem, env(safe-area-inset-right));
  padding-top: max(1rem, env(safe-area-inset-top));
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
/* Mobile: full viewport height and true center for the question block */
.question-page {
  min-height: 100dvh;
}
.question-inner {
  min-height: 100dvh;
}
@media (min-width: 640px) {
  .question-inner {
    min-height: 80vh;
  }
}
.question-card {
  background: linear-gradient(180deg, #ffffff 0%, #fefafb 50%, #fef7f8 100%);
  border-radius: 1.25rem;
  padding: 1.75rem 1.5rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.8), 0 4px 24px rgba(225, 29, 72, 0.12);
  border-left: 6px solid var(--accent, #e11d48);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
}
@media (min-width: 640px) {
  .question-card {
    padding: 3rem 2.5rem;
    border-radius: 1.5rem;
  }
}
.btn-yes {
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
.btn-yes:hover {
  background: var(--accent-hover, #be123c);
  box-shadow: 0 6px 20px rgba(225, 29, 72, 0.45);
}
.btn-yes:active {
  transform: scale(0.98);
}
.btn-no {
  padding: 0.875rem 2rem;
  min-height: 48px;
  font-size: 1rem;
  font-weight: 500;
  color: #78716c;
  background: transparent;
  border-radius: 9999px;
  border: 2px solid #d6d3d1;
  transition: border-color 0.2s, background 0.2s;
}
.btn-no:hover {
  border-color: #a8a29e;
  background: #fafaf9;
}
@media (max-width: 640px) {
  .btn-yes,
  .btn-no {
    padding: 1rem 2rem;
    min-height: 52px;
    font-size: 1.0625rem;
  }
}
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

/* ——— Romantic moment right after Yes ——— */
.yes-moment-overlay {
  position: fixed;
  inset: 0;
  z-index: 25;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(254, 242, 245, 0.98) 0%, rgba(252, 231, 243, 0.98) 50%, rgba(254, 247, 248, 0.98) 100%);
  padding: 2rem;
}
.yes-moment-inner {
  text-align: center;
}
.yes-moment-heart {
  display: block;
  font-size: clamp(4rem, 20vw, 8rem);
  line-height: 1;
  margin-bottom: 1rem;
  animation: yes-heart-pulse 1s ease-in-out infinite;
}
.yes-moment-title {
  font-size: clamp(1.75rem, 8vw, 3rem);
  font-weight: 600;
  color: #e11d48;
  margin-bottom: 0.5rem;
  letter-spacing: 0.02em;
}
.yes-moment-sub {
  font-size: clamp(1rem, 4vw, 1.25rem);
  color: #78716c;
}
.yes-moment-enter-active {
  transition: opacity 0.4s ease-out;
}
.yes-moment-leave-active {
  transition: opacity 0.6s ease-in;
}
.yes-moment-enter-from,
.yes-moment-leave-to {
  opacity: 0;
}
@keyframes yes-heart-pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.15);
    opacity: 0.9;
  }
}

/* ——— Success / celebration ——— */
.celebration-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  overflow: hidden;
}
.confetti-piece {
  position: absolute;
  top: -20px;
  border-radius: 2px;
  animation: confetti-fall linear forwards;
}
@keyframes confetti-fall {
  to {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.hearts-layer {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  overflow: hidden;
}
.heart-float {
  position: absolute;
  bottom: -50px;
  animation: heart-rise linear infinite;
}
@keyframes heart-rise {
  to {
    transform: translateY(-120vh) rotate(20deg);
    opacity: 0;
  }
}

.heart-tap {
  position: fixed;
  width: 48px;
  height: 48px;
  margin-left: 0;
  margin-top: 0;
  pointer-events: none;
  z-index: 20;
  font-size: 48px;
  line-height: 1;
  animation: heart-tap-rise 2.5s ease-out forwards;
}
@keyframes heart-tap-rise {
  from {
    transform: scale(0.5);
    opacity: 1;
  }
  20% {
    transform: scale(1.2);
    opacity: 1;
  }
  to {
    transform: translateY(-150px) scale(1);
    opacity: 0;
  }
}

.success-content {
  position: relative;
  z-index: 15;
  padding: 1.5rem 1rem 2rem;
  cursor: pointer;
}
.success-title {
  font-size: clamp(2rem, 6vw, 3.5rem);
  font-weight: 600;
  color: #e11d48;
  margin-bottom: 1rem;
  animation: success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}
.success-sub {
  color: #44403c;
  margin-bottom: 0.5rem;
  opacity: 0;
  animation: success-fade-in 0.5s ease-out forwards;
}
.success-line-1 {
  font-size: 1.25rem;
  animation-delay: 0.4s;
  animation-fill-mode: forwards;
}
.success-line-2 {
  font-size: 1rem;
  color: #78716c;
  margin-bottom: 0.5rem;
  animation-delay: 0.7s;
  animation-fill-mode: forwards;
}
.success-line-3 {
  font-size: 0.9375rem;
  color: #78716c;
  margin-bottom: 1rem;
  animation-delay: 0.95s;
  animation-fill-mode: forwards;
}
.tap-hint {
  font-size: 0.8125rem;
  color: #a8a29e;
  margin-bottom: 1.25rem;
  opacity: 0;
  animation: success-fade-in 0.5s ease-out 1.15s forwards;
}
@media (min-width: 640px) {
  .tap-hint { font-size: 0.875rem; margin-bottom: 1.5rem; }
}
.success-btns {
  opacity: 0;
  animation: success-fade-in 0.5s ease-out 1.35s forwards;
}
.success-btn {
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
.success-btn-primary {
  font-family: var(--font-display);
  font-weight: 600;
  letter-spacing: 0.02em;
  color: #fff;
  background: linear-gradient(135deg, var(--accent, #e11d48) 0%, #be123c 100%);
  border-color: transparent;
  box-shadow: 0 4px 18px rgba(225, 29, 72, 0.4);
}
.success-btn-primary:hover {
  background: linear-gradient(135deg, #f43f5e 0%, var(--accent-hover, #be123c) 100%);
  border-color: transparent;
  color: #fff;
  box-shadow: 0 8px 24px rgba(225, 29, 72, 0.45);
  transform: translateY(-1px);
}
.success-btn:hover {
  border-color: #e11d48;
  background: #fef7f8;
  color: #e11d48;
}
@keyframes success-pop {
  from {
    opacity: 0;
    transform: scale(0.3);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes success-fade-in {
  to {
    opacity: 1;
  }
}
</style>
