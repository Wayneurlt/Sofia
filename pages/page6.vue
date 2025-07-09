<template>
  <home-navbar/>
  <div class="min-h-screen flex items-center justify-center bg-pink-50 font-sans">
    <div class="text-center p-8 bg-transparent rounded-2xl max-w-md mx-4">
      <img 
        src="/assets/images/quest.png" 
        alt="Couple Illustration" 
        class="mx-auto mb-6 w-32 h-32 object-cover"
      />

      <h1 class="text-4xl text-rose-600 mb-4 font-serif italic">
        My Cherie,
      </h1>
      <p class="text-xl text-gray-700 mb-6">
        Are you ready for this beautiful journey called "us"?
      </p>
      
      <!-- Buttons Container -->
      <div v-if="!formVisible" class="flex justify-center gap-4 mt-6 relative">
        <button
          @click="handleYesClick"
          class="px-6 py-3 bg-rose-500 text-white rounded-full shadow-lg hover:bg-rose-600 transition duration-300 transform hover:scale-105 font-medium"
        >
          Always and Forever!
        </button>
        
        <button
          @click="moveNoButton"
          :style="noButtonStyle"
          class="px-6 py-3 bg-gray-400 text-white rounded-full shadow-lg hover:bg-gray-500 transition duration-300 transform hover:scale-105 font-medium"
          ref="noButtonRef"
        >
          I need more time...
        </button>
      </div>

      <!-- Floating Hearts Animation -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          v-for="(heart, index) in hearts" 
          :key="index"
          class="absolute text-rose-400 opacity-70"
          :style="heart.style"
        >
          ❤
        </div>
      </div>

      <!-- Toast Notification -->
      <transition name="fade">
        <div 
          v-if="notification.show"
          class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white"
          :class="notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'"
        >
          {{ notification.message }}
        </div>
      </transition>
    </div>

    <!-- Commitment Form -->
    <transition name="fade">
      <div v-if="formVisible" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mx-4">
          <h2 class="text-2xl font-semibold text-rose-600 mb-4 text-center">Our Adventure Awaits</h2>
          
          <div class="mb-6 text-center">
            <p class="text-gray-700 mb-4">Choose how you'd like to celebrate "us" today:</p>
            
            <div class="grid grid-cols-1 gap-4 text-black">
              <button
                @click="navigateToMemories"
                class="p-4 bg-rose-100 hover:bg-rose-200 rounded-lg transition flex items-center justify-center"
              >
                <span class="mr-2">📸</span> Memory Lane Gallery
              </button>
              
              <!-- <button
                @click="startLoveQuiz"
                class="p-4 bg-rose-100 hover:bg-rose-200 rounded-lg transition flex items-center justify-center"
              >
                <span class="mr-2">💑</span> Our Love Quiz
              </button> -->
              
              <button
                @click="startAdventureGame"
                class="p-4 bg-rose-100 hover:bg-rose-200 rounded-lg transition flex items-center justify-center"
              >
                <span class="mr-2">✨</span> Future Adventures
              </button>
            </div>
          </div>
          
          <button
            @click=""
            class="w-full py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition text-black"
          >
            Maybe later
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

// Types
interface Notification {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

interface ButtonStyle {
  position: 'static' | 'fixed';
  left: string;
  top: string;
  transition: string;
}

interface Heart {
  style: {
    left: string;
    top: string;
    fontSize: string;
    animation: string;
  };
}

// Router setup
const router = useRouter();

// Refs and reactive state
const formVisible = ref(false);
const noButtonRef = ref<HTMLButtonElement | null>(null);
const hearts = ref<Heart[]>([]);

const notification = reactive<Notification>({
  show: false,
  message: '',
  type: 'success'
});

const noButtonStyle = reactive<ButtonStyle>({
  position: 'static',
  left: '0px',
  top: '0px',
  transition: 'all 0.3s ease'
});

// Create floating hearts
const createHearts = () => {
  const newHearts: Heart[] = [];
  for (let i = 0; i < 15; i++) {
    newHearts.push({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        fontSize: `${Math.random() * 20 + 10}px`,
        animation: `float ${Math.random() * 6 + 3}s linear infinite`
      }
    });
  }
  hearts.value = newHearts;
};

// Handle YES button click
const handleYesClick = () => {
  formVisible.value = true;
  showNotification("I knew you'd say yes! ❤️", 'success');
};

// Navigation functions
const navigateToMemories = () => {
  router.push('/memories');
};

const startLoveQuiz = () => {
  router.push('/love-quiz');
};

const startAdventureGame = () => {
  router.push('/future-adventures');
};

// Show notification
const showNotification = (message: string, type: 'success' | 'error') => {
  notification.show = true;
  notification.message = message;
  notification.type = type;

  setTimeout(() => {
    notification.show = false;
  }, 3000);
};

// Move NO button
const moveNoButton = () => {
  if (!noButtonRef.value) return;

  const buttonWidth = noButtonRef.value.offsetWidth;
  const buttonHeight = noButtonRef.value.offsetHeight;
  
  const maxX = window.innerWidth - buttonWidth - 20;
  const maxY = window.innerHeight - buttonHeight - 20;

  const randX = Math.max(0, Math.floor(Math.random() * maxX));
  const randY = Math.max(0, Math.floor(Math.random() * maxY));

  Object.assign(noButtonStyle, {
    position: 'fixed',
    left: `${randX}px`,
    top: `${randY}px`
  });
  
  showNotification("Take your time, Alaa Sofia ❤️", 'success');
};

// Initialize
onMounted(() => {
  createHearts();
});
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>