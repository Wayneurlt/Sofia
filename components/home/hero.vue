<template>
    <div class="min-h-screen flex items-center justify-center bg-[#faf9f7] font-sans">
      <div class="text-center p-8 sm:p-12 max-w-md mx-4">
        <!-- Image -->
        <div v-if="showImage" class="animate-fade-in mb-8">
          <img 
            src="/assets/images/hey.png" 
            alt="For Sofia" 
            class="mx-auto w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full"
          />
        </div>
        
        <!-- Name -->
        <h1 v-if="showName" class="text-4xl sm:text-5xl font-light text-stone-700 mb-6 animate-fade-in">
          Sofia
        </h1>
        
        <!-- Message -->
        <div v-if="showMessage" class="animate-fade-in mb-10 px-2">
          <p class="text-lg sm:text-xl text-stone-500 leading-relaxed">
            I have something to ask you.
          </p>
        </div>
        
        <!-- Button -->
        <div v-if="showButton" class="animate-fade-in">
          <NuxtLink 
            to="/valentines-message" 
            class="inline-block px-8 sm:px-10 py-3 sm:py-3.5 text-stone-600 text-base font-medium rounded-full border border-stone-300 hover:border-stone-400 hover:bg-stone-50 transition-colors duration-200"
          >
            Continue
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const showImage = ref(false);
  const showName = ref(false);
  const showMessage = ref(false);
  const showButton = ref(false);
  
  onMounted(async () => {
    // Quick sequence of reveals
    await new Promise(resolve => setTimeout(resolve, 200));
    showImage.value = true;
    
    await new Promise(resolve => setTimeout(resolve, 250));
    showName.value = true;
    
    await new Promise(resolve => setTimeout(resolve, 250));
    showMessage.value = true;
    
    await new Promise(resolve => setTimeout(resolve, 300));
    showButton.value = true;
  });
  
  </script>
  
  <style scoped>
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
    animation: fade-in 0.4s ease-out;
  }
  </style>