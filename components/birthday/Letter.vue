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

    <!-- Paper letter: yellow sheet with ruled lines -->
    <div class="letter-paper relative z-10 mx-4 max-w-xl w-full max-h-[85vh] overflow-y-auto flex flex-col">
      <div class="letter-inner font-body text-lg sm:text-xl whitespace-pre-wrap">
        {{ displayedText }}<span v-if="showCursor" class="cursor">|</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ complete: [] }>();

const rootRef = ref<HTMLElement | null>(null);
const displayedText = ref('');
const showCursor = ref(true);
const isFadingOut = ref(false);

const { playTypingSound } = useTypingSound();

const TYPING_BASE_MS = 95;
const PAUSE_COMMA_MS = 420;
const PAUSE_PERIOD_MS = 900;
const PAUSE_NEWLINE_MS = 550;

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

/** Append text with typing animation to current displayedText */
async function typeString(appendText: string) {
  const base = displayedText.value;
  for (let i = 0; i <= appendText.length; i++) {
    if (i > 0) playTypingSound();
    displayedText.value = base + appendText.slice(0, i);
    const char = appendText[i];
    let delay = TYPING_BASE_MS;
    if (char === ',') delay = PAUSE_COMMA_MS;
    else if (char === '.' || char === '!' || char === '?') delay = PAUSE_PERIOD_MS;
    else if (char === '\n') delay = PAUSE_NEWLINE_MS;
    await new Promise((r) => setTimeout(r, delay));
  }
}

async function runTyping() {
  const full = useLetterContent();
  for (let i = 0; i <= full.length; i++) {
    if (i > 0) playTypingSound();
    displayedText.value = full.slice(0, i);
    const char = full[i];
    let delay = TYPING_BASE_MS;
    if (char === ',') delay = PAUSE_COMMA_MS;
    else if (char === '.' || char === '!' || char === '?') delay = PAUSE_PERIOD_MS;
    else if (char === '\n') delay = PAUSE_NEWLINE_MS;
    await new Promise((r) => setTimeout(r, delay));
  }
  // Cursor keeps blinking; nothing for ~5 seconds
  await new Promise((r) => setTimeout(r, 5000));
  // Type "Wait…"
  await typeString('Wait…');
  await new Promise((r) => setTimeout(r, PAUSE_PERIOD_MS));
  // New line, then type the line
  await typeString('\n\nI don\'t think words are enough for you.');
  await new Promise((r) => setTimeout(r, 2000));
  // Fade out screen, then go to video
  isFadingOut.value = true;
  await new Promise((r) => setTimeout(r, 2200));
  showCursor.value = false;
  emit('complete');
}

onMounted(() => {
  setTimeout(() => runTyping(), 400);
});
</script>

<style scoped>
.letter-section {
  min-height: 100dvh;
  min-height: 100vh;
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

/* Yellow paper sheet: authentic look */
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
  padding: 2rem 2.5rem 2.5rem 3rem;
  min-height: 280px;
}

/* Notepad-style vertical line (optional authentic touch) */
.letter-paper::before {
  content: '';
  position: absolute;
  left: 1.75rem;
  top: 2rem;
  bottom: 2.5rem;
  width: 2px;
  background: linear-gradient(to bottom, rgba(180, 80, 60, 0.35), rgba(180, 80, 60, 0.15));
  border-radius: 1px;
  pointer-events: none;
}

/* Ruled paper: horizontal lines for writing (line height matches rule spacing) */
.letter-inner {
  --line-height: 2rem;
  min-height: 200px;
  color: #3d3528;
  padding-left: 0.5rem;
  line-height: var(--line-height);
  background-image: repeating-linear-gradient(
    to bottom,
    transparent 0,
    transparent calc(var(--line-height) - 1px),
    rgba(120, 95, 50, 0.18) calc(var(--line-height) - 1px),
    rgba(120, 95, 50, 0.18) var(--line-height)
  );
  background-origin: content-box;
  background-position: 0 0.25rem;
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
