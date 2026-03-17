<template>
  <div
    class="final-section fixed inset-0 z-30 flex flex-col items-center justify-center overflow-hidden"
    :class="{ 'final-section--after-video': videoEnded }"
  >
    <!-- Dark base -->
    <div class="final-bg absolute inset-0 pointer-events-none" />
    <!-- Warm glow after video ends -->
    <div class="final-bg-glow absolute inset-0 pointer-events-none" />
    <div class="final-vignette absolute inset-0 pointer-events-none" />

    <div class="final-content relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center">
      <!-- Video: disappears after it ends -->
      <Transition name="video-out">
        <div
          v-if="!videoEnded"
          class="video-wrap relative w-full aspect-video max-h-[50vh] sm:max-h-[60vh] rounded-lg overflow-hidden shadow-2xl bg-stone-900/80 flex items-center justify-center"
        >
          <video
            ref="videoRef"
            class="w-full h-full object-contain"
            playsinline
            muted
            autoplay
            :src="videoSrc"
            @ended="onVideoEnded"
            @error="onVideoError"
          >
          </video>
          <p v-if="videoError" class="absolute font-body text-stone-500 text-center px-4">
            Add <code class="text-stone-400">public/videos/birthday-ending.mp4</code> for your video.
          </p>
        </div>
      </Transition>

      <!-- Shown while video is visible -->
      <Transition name="video-out">
        <p
          v-if="!videoEnded"
          class="final-text font-display text-2xl sm:text-3xl md:text-4xl text-white/95 mt-8 sm:mt-10 text-center tracking-wide"
        >
          This is just the beginning…
        </p>
      </Transition>

      <!-- Shown after video ends: two lines + heart for impact -->
      <Transition name="birthday-msg-in">
        <div v-if="videoEnded" class="birthday-msg-wrap text-center">
          <p class="birthday-msg birthday-msg-line1 font-display text-2xl sm:text-3xl md:text-4xl text-white/95">
            happy birthday babe... you have my heart !!!
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
// Import from assets so Vite serves the correct path (required for Nuxt)
import heartMp4 from '~/assets/mp4/heart.mp4';

const videoRef = ref<HTMLVideoElement | null>(null);
const videoSrc = heartMp4;
const videoError = ref(false);
const videoEnded = ref(false);

function onVideoEnded() {
  videoEnded.value = true;
}

function onVideoError() {
  videoError.value = true;
  setTimeout(() => {
    videoEnded.value = true;
  }, 1500);
}

function checkVideoEnded() {
  const video = videoRef.value;
  if (!video) return;
  if (video.ended || (video.duration > 0 && video.currentTime >= video.duration - 0.5)) {
    onVideoEnded();
    video.removeEventListener('timeupdate', checkVideoEnded);
  }
}

onMounted(() => {
  const video = videoRef.value;
  if (!video) return;
  video.play().catch(() => {});
  video.addEventListener('timeupdate', checkVideoEnded);
});

onBeforeUnmount(() => {
  videoRef.value?.removeEventListener('timeupdate', checkVideoEnded);
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

/* After video: subtle warm undertone */
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

.final-text {
  text-shadow:
    0 0 20px rgba(255, 255, 255, 0.15),
    0 0 40px rgba(255, 255, 255, 0.08);
  animation: text-glow 4s ease-in-out infinite;
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

/* Video and "just the beginning" fade out when video ends */
.video-out-leave-active {
  transition: opacity 1s ease-out;
}
.video-out-leave-to {
  opacity: 0;
}

/* Birthday message: gentle scale + fade, feels like a reveal */
.birthday-msg-wrap {
  max-width: 28rem;
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
