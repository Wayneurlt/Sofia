<template>
    <div class="min-h-screen flex items-center justify-center hero-bg safe-area-padding relative overflow-hidden">
      <!-- Soft decorative blurs -->
      <div class="absolute top-1/4 -left-20 w-64 h-64 rounded-full bg-rose-200/30 blur-3xl pointer-events-none" />
      <div class="absolute bottom-1/4 -right-20 w-72 h-72 rounded-full bg-pink-200/25 blur-3xl pointer-events-none" />
      <div class="absolute inset-0 bg-[radial-gradient(rgba(225,29,72,0.06)_1px,transparent_1px)] bg-[length:28px_28px] pointer-events-none" />

      <div class="text-center px-5 py-8 sm:p-12 max-w-md mx-auto w-full relative z-10">
        <!-- Image -->
        <div v-if="showImage" class="animate-fade-in mb-6 sm:mb-8">
          <div class="inline-flex p-1 rounded-full bg-gradient-to-br from-rose-300 via-rose-400 to-pink-400 shadow-soft ring-4 ring-white/80">
            <img 
              src="/assets/images/hey.png" 
              alt="For Sophia" 
              class="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-full"
            />
          </div>
        </div>
        
        <!-- Name -->
        <h1 v-if="showName" class="font-display text-4xl sm:text-5xl md:text-6xl font-medium text-stone-800 mb-4 sm:mb-6 animate-fade-in tracking-tight">
          Sophia
        </h1>
        
        <!-- Message -->
        <div v-if="showMessage" class="animate-fade-in mb-8 sm:mb-10 px-2 font-body">
          <p class="text-base sm:text-lg text-stone-600 leading-relaxed mb-3">
            I’ve been thinking about you.
          </p>
          <p class="text-lg sm:text-xl text-stone-700 leading-relaxed mb-2">
            There’s something I’ve wanted to ask you for a long time.
          </p>
          <p class="text-base sm:text-lg text-rose-600 font-semibold">
            Will you take a look?
          </p>
        </div>
        
        <!-- Button -->
        <div v-if="showButton" class="animate-fade-in">
          <NuxtLink 
            to="/valentines-message" 
            class="hero-btn touch-target font-display font-medium"
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
    background: linear-gradient(165deg, #fef5f7 0%, #fce4ef 25%, #fce7f3 50%, #fdf2f4 75%, #fef9fb 100%);
    background-attachment: fixed;
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
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(225, 29, 72, 0.12);
  }
  .hero-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.875rem 2rem;
    min-height: 48px;
    font-size: 1.0625rem;
    letter-spacing: 0.02em;
    color: #fff;
    background: linear-gradient(135deg, var(--accent, #e11d48) 0%, #be123c 100%);
    border-radius: 9999px;
    transition: background 0.25s, box-shadow 0.25s, transform 0.15s;
    box-shadow: 0 4px 18px rgba(225, 29, 72, 0.4), 0 2px 6px rgba(0, 0, 0, 0.06);
  }
  .hero-btn:hover {
    background: linear-gradient(135deg, #f43f5e 0%, var(--accent-hover, #be123c) 100%);
    box-shadow: 0 8px 24px rgba(225, 29, 72, 0.45), 0 4px 10px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
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
      transform: translateY(14px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
  </style>