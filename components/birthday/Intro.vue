<template>
  <div ref="rootRef" class="intro-root fixed inset-0 z-50 bg-black overflow-hidden">
    <!-- Falling hearts -->
    <div
      class="rain-layer absolute inset-0"
      :class="{ 'rain-layer--fade': phase === 'netflix' }"
      aria-hidden="true"
    >
      <div class="rain-field pointer-events-none absolute inset-0">
        <div
          v-for="d in drops"
          :key="d.id"
          class="drop drop-heart"
          :style="{
            left: d.left + '%',
            animationDuration: d.duration + 's',
            animationDelay: d.delay + 's',
            opacity: d.opacity,
            fontSize: d.size + 'px',
          }"
        >
          ♡
        </div>
      </div>

      <!-- Centered: "Sophia" -->
      <div class="rain-center">
        <div class="rain-title font-display">Sophia</div>
      </div>
    </div>

    <!-- Netflix-style name (after countdown) -->
    <div class="netflix-layer absolute inset-0 flex items-center justify-center">
      <div
        ref="textRef"
        class="intro-text font-display text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] uppercase opacity-0"
        style="text-shadow: 0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3);"
      >
        {{ name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{ name?: string }>(),
  { name: 'Sophia' }
);

const emit = defineEmits<{ complete: [] }>();
const rootRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

const phase = ref<'rain' | 'netflix'>('rain');

type Drop = {
  id: number;
  left: number;
  duration: number;
  delay: number;
  opacity: number;
  size: number;
};

const drops = ref<Drop[]>([]);
let dropId = 0;

function buildDrops() {
  const out: Drop[] = [];
  const count = 65;

  for (let i = 0; i < count; i++) {
    out.push({
      id: ++dropId,
      left: Math.random() * 100,
      duration: 5 + Math.random() * 4,
      delay: Math.random() * 4,
      opacity: 0.2 + Math.random() * 0.5,
      size: 18 + Math.random() * 28,
    });
  }
  drops.value = out;
}

async function startNetflix() {
  phase.value = 'netflix';
  await new Promise((r) => setTimeout(r, 600));

  if (!textRef.value || !rootRef.value) return;

  const gsap = (await import('gsap')).default;
  const text = textRef.value;
  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(rootRef.value, {
        duration: 1.2,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => emit('complete'),
      });
    },
  });

  tl.fromTo(
    text,
    { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' }
  )
    .to(text, { duration: 2.2, scale: 1.05, opacity: 1, ease: 'power1.inOut' })
    .to(text, { duration: 1.5, opacity: 0.95, scale: 1.02, ease: 'power1.inOut' });
}

onMounted(() => {
  buildDrops();
  setTimeout(() => startNetflix(), 4000);
});
</script>

<style scoped>
.intro-root {
  min-height: 100dvh;
  min-height: 100vh;
}

.rain-layer {
  opacity: 1;
  transition: opacity 0.8s ease-out;
}
.rain-layer--fade {
  opacity: 0;
}

.rain-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
}

.rain-title {
  font-size: clamp(2rem, 6vw, 3.75rem);
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.88);
  text-shadow: 0 0 40px rgba(249, 168, 212, 0.2);
}

.drop {
  position: absolute;
  top: -15vh;
  animation-name: fall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  will-change: transform;
}

.drop-heart {
  color: #fb7185;
  font-weight: 400;
  text-shadow: 0 0 20px rgba(251, 113, 133, 0.45);
}

@keyframes fall {
  0% { transform: translateY(-15vh); opacity: 0; }
  5% { opacity: 1; }
  100% { transform: translateY(135vh); opacity: 0.08; }
}
</style>
