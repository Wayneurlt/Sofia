<template>
    <div class="min-h-screen flex items-center justify-center hero-bg font-sans safe-area-padding">
      <div class="text-center px-5 py-8 sm:p-12 max-w-md mx-auto w-full">
        <!-- Image -->
        <div v-if="showImage" class="animate-fade-in mb-6 sm:mb-8">
          <img 
            src="/assets/images/hey.png" 
            alt="For Sophia" 
            class="mx-auto w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full ring-4 ring-rose-300 shadow-soft"
          />
        </div>
        
        <!-- Name -->
        <h1 v-if="showName" class="text-4xl sm:text-5xl font-light text-stone-800 mb-4 sm:mb-6 animate-fade-in tracking-tight [font-family:Georgia,serif]">
          Sophia
        </h1>
        
        <!-- Message -->
        <div v-if="showMessage" class="animate-fade-in mb-8 sm:mb-10 px-2">
          <p class="text-base sm:text-lg text-stone-500 leading-relaxed mb-2 [font-family:Georgia,serif]">
            I’ve been thinking about you.
          </p>
          <p class="text-lg sm:text-xl text-stone-700 leading-relaxed mb-1 [font-family:Georgia,serif]">
            You light up my days — and there’s something I’ve been wanting to ask you for a while.
          </p>
          <p class="text-base sm:text-lg text-rose-600 font-medium [font-family:Georgia,serif]">
            Will you take a look?
          </p>
        </div>
        
        <!-- Button -->
        <div v-if="showButton" class="animate-fade-in">
          <NuxtLink 
            to="/valentines-message" 
            class="hero-btn touch-target"
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
  .hero-bg {
    background: linear-gradient(165deg, #fef7f8 0%, #fce7f3 35%, #fdf2f4 70%, #fef7f8 100%);
  }
  .safe-area-padding {
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
    padding-top: max(1rem, env(safe-area-inset-top));
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
  }
  @media (max-width: 380px) {
    .hero-bg h1 { font-size: 1.875rem; }
    .hero-bg p { font-size: 1rem; }
  }
  .shadow-soft {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  }
  .hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    min-height: 48px;
    font-size: 1rem;
    font-weight: 600;
    color: #fff;
    background: var(--accent, #e11d48);
    border-radius: 9999px;
    transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
    box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);
  }
  .hero-btn:hover {
    background: var(--accent-hover, #be123c);
    box-shadow: 0 6px 20px rgba(225, 29, 72, 0.45);
  }
  .hero-btn:active {
    transform: scale(0.98);
  }
  @media (max-width: 640px) {
    .hero-btn {
      padding: 1rem 2rem;
      min-height: 52px;
      font-size: 1.0625rem;
    }
  }
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