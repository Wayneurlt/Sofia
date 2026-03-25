<template>
  <div class="birthday-experience min-h-screen bg-black">
    <!-- Section 1: Cinematic Intro -->
    <BirthdayIntro
      v-if="section === 'intro'"
      name="Sophia"
      @complete="goToLetter"
    />

    <!-- Section 2 & 3: Letter then Final (smooth transition between them) -->
    <Transition name="section" mode="out-in">
      <BirthdayLetter
        v-if="section === 'letter'"
        key="letter"
        @complete="goToFinal"
      />
      <BirthdayFinal
        v-else-if="section === 'final'"
        key="final"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
type Section = 'intro' | 'letter' | 'final';
const section = ref<Section>('intro');

function goToLetter() {
  section.value = 'letter';
}

function goToFinal() {
  section.value = 'final';
}
</script>

<style>
/* Smooth section transitions (letter ↔ final) */
.section-enter-active,
.section-leave-active {
  transition: opacity 1.2s ease-out;
}
.section-enter-from,
.section-leave-to {
  opacity: 0;
}
</style>
