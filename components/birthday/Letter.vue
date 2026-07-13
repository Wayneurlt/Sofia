<template>
  <div
    ref="rootRef"
    class="letter-section fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
    :class="{ 'letter-section--fade-out': isFadingOut }"
  >
    <!-- Soft blurred romantic background -->
    <div class="letter-bg absolute inset-0" />

    <!-- Floating particles (ambient) -->
    <div class="particles absolute inset-0 pointer-events-none overflow-hidden">
      <div
        v-for="i in 20"
        :key="i"
        class="particle absolute rounded-full bg-rose-300/30"
        :style="getParticleStyle(i)"
      />
    </div>

    <!-- Paper letter: yellow sheet with ruled lines (mobile-friendly) -->
    <div ref="paperRef" class="letter-paper relative z-10 mx-3 sm:mx-4 max-w-xl w-full overflow-y-auto">
      <div class="letter-inner font-body whitespace-pre-wrap">
        {{ displayedText }}<span ref="endAnchorRef" class="end-anchor" aria-hidden="true" /><span v-if="showCursor" class="cursor">|</span>
      </div>
    </div>

    <!-- Pause/resume control for the typing animation -->
    <button
      v-if="!isFadingOut"
      type="button"
      class="pause-btn absolute z-20"
      :aria-label="isPaused ? 'Resume letter' : 'Pause letter'"
      :aria-pressed="isPaused"
      @click="togglePause"
    >
      <span aria-hidden="true">{{ isPaused ? '▶' : '❚❚' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ complete: [] }>();

const rootRef = ref<HTMLElement | null>(null);
const paperRef = ref<HTMLElement | null>(null);
const endAnchorRef = ref<HTMLElement | null>(null);
const displayedText = ref('');
const showCursor = ref(true);
const isFadingOut = ref(false);
const isPaused = ref(false);

const { playTypingSound } = useTypingSound();

const TYPING_BASE_MS = 42;
const PAUSE_COMMA_MS = 220;
const PAUSE_PERIOD_MS = 450;
const PAUSE_NEWLINE_MS = 260;

let disposed = false;

function togglePause() {
  isPaused.value = !isPaused.value;
}

/** Waits `ms` milliseconds, but holds (without losing progress) while isPaused is true. */
function waitPausable(ms: number) {
  return new Promise<void>((resolve) => {
    let remaining = ms;
    function tick() {
      if (disposed) {
        resolve();
        return;
      }
      if (isPaused.value) {
        setTimeout(tick, 100);
        return;
      }
      const chunk = Math.min(remaining, 50);
      remaining -= chunk;
      setTimeout(remaining > 0 ? tick : resolve, chunk);
    }
    tick();
  });
}

/** Keeps whatever is currently being typed vertically centered in the visible letter area. */
async function centerOnCursor() {
  await nextTick();
  const container = paperRef.value;
  const anchor = endAnchorRef.value;
  if (!container || !anchor) return;
  const target = anchor.offsetTop - container.clientHeight / 2 + anchor.offsetHeight / 2;
  container.scrollTop = Math.max(0, target);
}

function getParticleStyle(i: number) {
  const size = 4 + Math.random() * 8;
  const left = Math.random() * 100;
  const duration = 12 + Math.random() * 10;
  const delay = Math.random() * 5;
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    top: `${Math.random() * 100}%`,
    animation: `float ${duration}s ease-in-out ${delay}s infinite`,
    opacity: 0.2 + Math.random() * 0.3,
  };
}

async function runTyping() {
  const full = useLetterContent();
  for (let i = 0; i <= full.length; i++) {
    displayedText.value = full.slice(0, i);
    const char = full[i];
    if (i > 0) playTypingSound(char);
    let delay = TYPING_BASE_MS;
    if (char === ',') delay = PAUSE_COMMA_MS;
    else if (char === '.' || char === '!' || char === '?') delay = PAUSE_PERIOD_MS;
    else if (char === '\n') delay = PAUSE_NEWLINE_MS;
    await centerOnCursor();
    await waitPausable(delay);
  }
  // Cursor keeps blinking; nothing for ~5 seconds
  await waitPausable(5000);
  // Fade out screen, then go to final message
  isFadingOut.value = true;
  await new Promise((r) => setTimeout(r, 2200));
  showCursor.value = false;
  emit('complete');
}

onMounted(() => {
  setTimeout(() => runTyping(), 400);
});

onBeforeUnmount(() => {
  disposed = true;
});
</script>

<style scoped>
.letter-section {
  min-height: 100dvh;
  min-height: 100vh;
  padding: max(0.5rem, env(safe-area-inset-top)) max(0.75rem, env(safe-area-inset-right)) max(0.5rem, env(safe-area-inset-bottom)) max(0.75rem, env(safe-area-inset-left));
  box-sizing: border-box;
  transition: opacity 2s ease-out;
}
.letter-section--fade-out {
  opacity: 0;
  pointer-events: none;
}

.letter-bg {
  background: linear-gradient(165deg, #e8dfc8 0%, #ddd4b8 25%, #e2d9be 60%, #ebe2cc 100%);
}
.letter-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 30%, rgba(220, 200, 150, 0.4), transparent 55%);
  pointer-events: none;
}

/* Yellow paper sheet: authentic look, mobile-friendly */
.letter-paper {
  --paper: #f5e6c8;
  --paper-dark: #ebdcb8;
  --paper-edge: #e2d4a8;
  --paper-shadow: rgba(80, 60, 30, 0.25);
  background-color: var(--paper);
  background-image:
    linear-gradient(180deg, var(--paper-dark) 0%, var(--paper) 8%, var(--paper) 92%, var(--paper-edge) 100%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  box-shadow:
    0 1px 1px rgba(255, 255, 255, 0.6) inset,
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 8px 16px var(--paper-shadow),
    0 20px 40px var(--paper-shadow),
    0 0 0 1px rgba(90, 70, 40, 0.12);
  border-radius: 2px;
  border: 1px solid rgba(120, 95, 50, 0.2);
  padding: 1.25rem 1.5rem 1.5rem 2rem;
  min-height: 200px;
  max-height: calc(100dvh - 1.5rem);
  max-height: calc(100vh - 1.5rem);
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-y;
}

@media (min-width: 640px) {
  .letter-paper {
    padding: 2rem 2.5rem 2.5rem 3rem;
    min-height: 280px;
    max-height: 85vh;
  }
}

/* Notepad-style vertical line */
.letter-paper::before {
  content: '';
  position: absolute;
  left: 1.25rem;
  top: 1.25rem;
  bottom: 1.5rem;
  width: 2px;
  background: linear-gradient(to bottom, rgba(180, 80, 60, 0.35), rgba(180, 80, 60, 0.15));
  border-radius: 1px;
  pointer-events: none;
}

@media (min-width: 640px) {
  .letter-paper::before {
    left: 1.75rem;
    top: 2rem;
    bottom: 2.5rem;
  }
}

/* Ruled paper: line height scales for mobile */
.letter-inner {
  --line-height: 1.75rem;
  min-height: 160px;
  color: #3d3528;
  padding-left: 0.35rem;
  line-height: var(--line-height);
  font-size: 1rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(var(--line-height) - 1px),
    rgba(120, 95, 50, 0.18) calc(var(--line-height) - 1px),
    rgba(120, 95, 50, 0.18) var(--line-height)
  );
  background-origin: content-box;
  background-position: 0 0.2rem;
}

@media (min-width: 640px) {
  .letter-inner {
    --line-height: 2rem;
    min-height: 200px;
    padding-left: 0.5rem;
    font-size: 1.25rem;
    background-position: 0 0.25rem;
  }
}

/* Pause/resume control: fixed in the corner so it stays reachable regardless of scroll position */
.pause-btn {
  top: max(0.75rem, env(safe-area-inset-top));
  right: max(0.75rem, env(safe-area-inset-right));
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(245, 230, 200, 0.28);
  background: rgba(61, 53, 40, 0.72);
  color: #f5e6c8;
  font-size: 0.9rem;
  line-height: 1;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.28);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: background-color 0.2s ease, transform 0.15s ease, opacity 0.4s ease;
}

.pause-btn:hover {
  background: rgba(61, 53, 40, 0.85);
}

.pause-btn:active {
  transform: scale(0.92);
}

@media (min-width: 640px) {
  .pause-btn {
    width: 3rem;
    height: 3rem;
    font-size: 1rem;
  }
}

.end-anchor {
  display: inline-block;
  width: 0;
  height: 1em;
  vertical-align: middle;
}

.cursor {
  display: inline-block;
  font-weight: 300;
  color: var(--accent, #e11d48);
  animation: blink 0.9s step-end infinite;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.3;
  }
  25% {
    transform: translate(10px, -15px) scale(1.05);
    opacity: 0.5;
  }
  50% {
    transform: translate(-5px, -30px) scale(0.95);
    opacity: 0.4;
  }
  75% {
    transform: translate(15px, -10px) scale(1.02);
    opacity: 0.45;
  }
}
</style>
