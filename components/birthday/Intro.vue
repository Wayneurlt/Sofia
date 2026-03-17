<template>
  <div
    ref="rootRef"
    class="intro-root fixed inset-0 z-50 flex items-center justify-center bg-black"
  >
    <div
      ref="textRef"
      class="intro-text font-display text-white text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] uppercase opacity-0"
      style="text-shadow: 0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,255,255,0.3);"
    >
      Sophia
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{ complete: [] }>();
const rootRef = ref<HTMLElement | null>(null);
const textRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  if (!textRef.value || !rootRef.value) return;

  const gsap = (await import('gsap')).default;
  const text = textRef.value;
  const tl = gsap.timeline({
    onComplete: () => {
      // Brief hold then fade out entire intro and emit
      gsap.to(rootRef.value, {
        duration: 1.2,
        opacity: 0,
        ease: 'power2.inOut',
        onComplete: () => emit('complete'),
      });
    },
  });

  // Netflix-style: start with glow, fade in, slight zoom
  tl.fromTo(
    text,
    { opacity: 0, scale: 0.8, filter: 'blur(8px)' },
    { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power2.out' }
  )
    .to(text, {
      duration: 2.2,
      scale: 1.05,
      opacity: 1,
      ease: 'power1.inOut',
    })
    .to(text, {
      duration: 1.5,
      opacity: 0.95,
      scale: 1.02,
      ease: 'power1.inOut',
    });
});
</script>

<style scoped>
.intro-root {
  min-height: 100dvh;
  min-height: 100vh;
}
</style>
