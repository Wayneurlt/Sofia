<template>
    <div class="min-h-screen flex items-center justify-center bg-pink-100 font-sans">
      <div class="text-center p-8 bg-transparent rounded-2xl max-w-md mx-4">
        <!-- Placeholder image (replace with your own) -->
        <img src="/assets/images/hey.png" alt="Cute Illustration" class="mx-auto mb-6 w-32 h-32  object-cover" />
        
        <h1 class="text-5xl text-pink-600 mb-6 animate-fade-in">Heyyy Sofia!</h1>
        <!-- <p class="text-gray-700 text-lg mb-6 animate-fade-in delay-100">You are amazing, and don't you ever forget it!</p> -->
        
        <div class="flex flex-col items-center mt-6">
          <NuxtLink 
            to="/page1" 
            class="px-6 py-3 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600 transition duration-300 transform hover:scale-105"
          >
            Next
          </NuxtLink>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional logic needed for now
  </script>
  
  <style scoped>
  /* Custom animations */
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fade-in 1s ease-out;
  }
  
  .delay-100 {
    animation-delay: 0.1s;
  }
  </style>