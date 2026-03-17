<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>
  </UApp>
</template>

<style>
/* Soft page transition so navigation feels seamless */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>

<script setup lang="ts">
</script>
