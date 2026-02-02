<template>
  <nav
    :class="[
      'px-4 sm:px-6 py-3 fixed top-0 w-full z-[1000] transition-colors duration-200',
      isScrolled ? 'bg-[#faf9f7]/95 border-b border-stone-200' : 'bg-transparent'
    ]"
  >
    <div class="flex justify-between items-center max-w-3xl mx-auto">
      <NuxtLink to="/" class="text-stone-600 hover:text-stone-800 text-sm font-medium transition-colors">
        For Sofia
      </NuxtLink>
      <NuxtLink
        to="/the-question"
        class="text-stone-600 hover:text-stone-800 text-sm font-medium transition-colors"
      >
        Skip to question
      </NuxtLink>
    </div>
  </nav>
</template>

<script setup lang="ts">
const isScrolled = ref(false);
onMounted(() => {
  window.addEventListener('scroll', () => {
    isScrolled.value = window.scrollY > 20;
  });
});
</script>
