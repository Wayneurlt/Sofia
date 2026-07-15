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

    <!-- Book: two leaves that alternate, so one folds away while the other unfolds underneath -->
    <div
      class="book-stage relative mx-3 sm:mx-4 max-w-xl w-full"
      @touchstart.passive="onTouchStart"
      @touchend.passive="onTouchEnd"
    >
      <div class="leaf" :class="leafClasses('A')">
        <div ref="paperRef" class="leaf-face leaf-face--front letter-paper">
          <div ref="letterInnerRef" class="letter-inner font-body whitespace-pre-wrap">{{ leaves.A }}</div>
        </div>
        <div class="leaf-face leaf-face--back" />
      </div>
      <div class="leaf" :class="leafClasses('B')">
        <div class="leaf-face leaf-face--front letter-paper">
          <div class="letter-inner font-body whitespace-pre-wrap">{{ leaves.B }}</div>
        </div>
        <div class="leaf-face leaf-face--back" />
      </div>

      <!-- Hidden twin used only to measure how much text fits on one page -->
      <div ref="measurerPaperRef" class="letter-paper measurer" aria-hidden="true">
        <div ref="measurerInnerRef" class="letter-inner measurer-inner font-body whitespace-pre-wrap" />
      </div>
    </div>

    <!-- Page indicator -->
    <div v-if="pages.length > 1 && !isFadingOut" class="page-indicator absolute z-20">
      {{ pageIndex + 1 }} / {{ pages.length }}
    </div>

    <!-- Previous / next page controls -->
    <template v-if="pages.length > 1 && !isFadingOut">
      <button
        type="button"
        class="nav-btn nav-btn--prev absolute z-20"
        :class="{ 'nav-btn--hidden': pageIndex === 0 }"
        aria-label="Previous page"
        @click="goPrev"
      >
        <span aria-hidden="true">‹</span>
      </button>
      <button
        type="button"
        class="nav-btn nav-btn--next absolute z-20"
        aria-label="Next page"
        @click="goNext"
      >
        <span aria-hidden="true">›</span>
      </button>
    </template>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ complete: [] }>();

const rootRef = ref<HTMLElement | null>(null);
const paperRef = ref<HTMLElement | null>(null);
const letterInnerRef = ref<HTMLElement | null>(null);
const measurerPaperRef = ref<HTMLElement | null>(null);
const measurerInnerRef = ref<HTMLElement | null>(null);

type LeafKey = 'A' | 'B';

const pages = ref<string[]>([]);
const pageIndex = ref(0);
const leaves = reactive<{ A: string; B: string }>({ A: '', B: '' });
const topLeaf = ref<LeafKey>('A');
const isFlipping = ref(false);
const flipDir = ref<'forward' | 'backward' | null>(null);

const isFadingOut = ref(false);

const FLIP_DURATION_MS = 650;

let disposed = false;
let endingStarted = false;
let touchStartX = 0;
let touchStartY = 0;

function leafClasses(key: LeafKey) {
  const isTop = topLeaf.value === key;
  return {
    'leaf--top': isTop,
    'leaf--flip-forward': isFlipping.value && isTop && flipDir.value === 'forward',
    'leaf--flip-backward': isFlipping.value && isTop && flipDir.value === 'backward',
  };
}

/** Splits `text` into page-sized chunks that fit within `pageHeightPx`, measured using `measurerEl`. */
function paginateText(text: string, pageHeightPx: number, measurerEl: HTMLElement): string[] {
  if (pageHeightPx <= 0) return [text];
  const tokens = text.split(/(\s+)/).filter((t) => t.length > 0);
  const result: string[] = [];
  let current = '';
  for (const token of tokens) {
    const candidate = current + token;
    measurerEl.textContent = candidate;
    if (measurerEl.scrollHeight > pageHeightPx && current.trim().length > 0) {
      result.push(current.replace(/\s+$/, ''));
      current = token.replace(/^\s+/, '');
    } else {
      current = candidate;
    }
  }
  if (current.trim().length > 0) result.push(current.replace(/\s+$/, ''));
  return result.length > 0 ? result : [text];
}

/** Measures the available page area and splits the letter into pages that each fit without scrolling. */
async function preparePages() {
  const full = useLetterContent();
  await nextTick();
  if (document.fonts?.ready) {
    await document.fonts.ready.catch(() => {});
  }

  const realPaper = paperRef.value;
  const realInner = letterInnerRef.value;
  const measurerPaper = measurerPaperRef.value;
  const measurerInner = measurerInnerRef.value;
  if (!realPaper || !realInner || !measurerPaper || !measurerInner) {
    pages.value = [full];
    return;
  }

  measurerPaper.style.width = `${realPaper.clientWidth}px`;
  const pageHeightPx = realInner.clientHeight;
  pages.value = paginateText(full, pageHeightPx, measurerInner);
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

async function proceedToEnding() {
  if (endingStarted || disposed) return;
  endingStarted = true;
  isFadingOut.value = true;
  await new Promise((r) => setTimeout(r, 2200));
  emit('complete');
}

/** Folds the current page away in `direction` and unfolds the target page underneath, already fully written. */
async function flipTo(targetIndex: number, direction: 'forward' | 'backward') {
  if (isFlipping.value || disposed) return;
  const outgoingKey = topLeaf.value;
  const incomingKey: LeafKey = outgoingKey === 'A' ? 'B' : 'A';

  leaves[incomingKey] = pages.value[targetIndex] ?? '';

  flipDir.value = direction;
  isFlipping.value = true;
  await new Promise((r) => setTimeout(r, FLIP_DURATION_MS));
  if (disposed) return;
  isFlipping.value = false;
  flipDir.value = null;
  topLeaf.value = incomingKey;
  pageIndex.value = targetIndex;
}

function goNext() {
  if (isFadingOut.value || isFlipping.value) return;
  if (pageIndex.value >= pages.value.length - 1) {
    proceedToEnding();
    return;
  }
  flipTo(pageIndex.value + 1, 'forward');
}

function goPrev() {
  if (isFadingOut.value || isFlipping.value) return;
  if (pageIndex.value <= 0) return;
  flipTo(pageIndex.value - 1, 'backward');
}

function onTouchStart(e: TouchEvent) {
  const t = e.touches[0];
  touchStartX = t.clientX;
  touchStartY = t.clientY;
}

function onTouchEnd(e: TouchEvent) {
  const t = e.changedTouches[0];
  const dx = t.clientX - touchStartX;
  const dy = t.clientY - touchStartY;
  if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (dx < 0) goNext();
  else goPrev();
}

async function initBook() {
  await preparePages();
  if (pages.value.length === 0 || disposed) return;
  leaves[topLeaf.value] = pages.value[0];
}

onMounted(() => {
  initBook();
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

/* Book stage: gives the pages real 3D space to fold in, and a stable box for the two absolutely-stacked leaves */
.book-stage {
  perspective: 1600px;
  height: 65vh;
  height: 65dvh;
  min-height: 280px;
  max-height: 560px;
}

@media (min-width: 640px) {
  .book-stage {
    height: 70vh;
    height: 70dvh;
    min-height: 320px;
    max-height: 620px;
  }
}

/* Bound spine shadow along the left edge, so the page reads as part of a book rather than a loose sheet */
.book-stage::before {
  content: '';
  position: absolute;
  left: -3px;
  top: 3%;
  bottom: 3%;
  width: 16px;
  background: linear-gradient(to right, rgba(35, 24, 12, 0.5), rgba(35, 24, 12, 0.1) 65%, transparent);
  filter: blur(1.5px);
  z-index: 3;
  pointer-events: none;
  border-radius: 6px;
}

/* Sliver of stacked page edges peeking out on the right, hinting at the pages still to come */
.book-stage::after {
  content: '';
  position: absolute;
  right: -4px;
  top: 2.5%;
  bottom: 2.5%;
  width: 7px;
  background: repeating-linear-gradient(to bottom, #e7d8ae 0px, #e7d8ae 2px, #dccca0 2px, #dccca0 3px);
  box-shadow: 1px 0 3px rgba(0, 0, 0, 0.18);
  border-radius: 0 4px 4px 0;
  z-index: 0;
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
  overflow: hidden;
}

@media (min-width: 640px) {
  .letter-paper {
    padding: 2rem 2.5rem 2.5rem 3rem;
  }
}

/* The two leaves stack exactly on top of each other and fill the book stage. Each leaf has a
   front face (the text) and a back face (blank paper), so turning it actually shows the back
   of the page mid-fold instead of the leaf just vanishing. */
.leaf {
  position: absolute;
  inset: 0;
  z-index: 1;
  transform-style: preserve-3d;
  transform-origin: left center;
  will-change: transform;
}

.leaf--top {
  z-index: 2;
}

.leaf--flip-forward {
  animation: flip-forward 0.65s ease-in-out forwards;
}

.leaf--flip-backward {
  animation: flip-backward 0.65s ease-in-out forwards;
}

@keyframes flip-forward {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(-178deg);
  }
}

@keyframes flip-backward {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(178deg);
  }
}

.leaf-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
}

.leaf-face--back {
  transform: rotateY(180deg);
  background: linear-gradient(135deg, #ecdcb6 0%, #e2d0a4 55%, #ead9b2 100%);
  border-radius: 2px;
  border: 1px solid rgba(120, 95, 50, 0.2);
  box-shadow: inset 0 0 24px rgba(120, 95, 50, 0.18);
}

/* A shadow that sweeps across the front face as it folds, simulating the crease */
.leaf-face--front::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0, 0, 0, 0.3), transparent 45%);
  opacity: 0;
  pointer-events: none;
}

.leaf--flip-forward .leaf-face--front::after,
.leaf--flip-backward .leaf-face--front::after {
  animation: fold-shadow 0.65s ease-in-out forwards;
}

@keyframes fold-shadow {
  0% {
    opacity: 0;
  }
  45% {
    opacity: 1;
  }
  55% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

/* Hidden measuring twin: never shown, never clipped, so text can grow freely while we measure it */
.letter-paper.measurer {
  position: fixed;
  top: 0;
  left: -9999px;
  visibility: hidden;
  pointer-events: none;
  height: auto;
  overflow: visible;
  box-shadow: none;
}

.letter-inner.measurer-inner {
  height: auto;
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
  height: 100%;
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
    padding-left: 0.5rem;
    font-size: 1.25rem;
    background-position: 0 0.25rem;
  }
}

/* Page indicator */
.page-indicator {
  bottom: max(0.75rem, env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  padding: 0.35rem 0.85rem;
  border-radius: 9999px;
  background: rgba(61, 53, 40, 0.6);
  color: #f5e6c8;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  pointer-events: none;
  z-index: 20;
}

/* Previous / next page buttons, flanking the book at a reachable height */
.nav-btn {
  top: 50%;
  transform: translateY(-50%);
  width: 2.75rem;
  height: 2.75rem;
  min-width: 44px;
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  border: 1px solid rgba(245, 230, 200, 0.28);
  background: rgba(61, 53, 40, 0.55);
  color: #f5e6c8;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  transition: opacity 0.2s ease, background-color 0.2s ease, transform 0.15s ease;
}

.nav-btn--prev {
  left: max(0.5rem, env(safe-area-inset-left));
}

.nav-btn--next {
  right: max(0.5rem, env(safe-area-inset-right));
}

.nav-btn--hidden {
  opacity: 0;
  pointer-events: none;
}

.nav-btn:hover {
  background: rgba(61, 53, 40, 0.75);
}

.nav-btn:active {
  transform: translateY(-50%) scale(0.92);
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
