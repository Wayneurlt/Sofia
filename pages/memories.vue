<template>
    <HomeNavbar />
  <div class="min-h-screen bg-gradient-to-b from-pink-50 to-rose-100 p-4">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8 mt-28">
        <h1 class="text-4xl font-serif text-rose-800 mb-2">Our Memory Lane</h1>
        <p class="text-lg text-rose-600">Every moment with you becomes a treasure</p>
      </div>

      <!-- View Toggle -->
      <div class="flex justify-center mb-6">
        <button
          @click="viewMode = 'grid'"
          class="px-4 py-2 rounded-l-lg transition"
          :class="viewMode === 'grid' ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'"
        >
          <i class="fas fa-th-large mr-2"></i>Grid
        </button>
        <button
          @click="viewMode = 'timeline'"
          class="px-4 py-2 rounded-r-lg transition"
          :class="viewMode === 'timeline' ? 'bg-rose-500 text-white' : 'bg-white text-rose-500'"
        >
          <i class="fas fa-stream mr-2"></i>Timeline
        </button>
      </div>

      <!-- Add Memory Button -->
      <div class="text-center mb-8">
        <button
          @click="showAddMemoryModal = true"
          class="px-6 py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-lg transition flex items-center mx-auto"
        >
          <i class="fas fa-plus mr-2"></i> Add New Memory
        </button>
      </div>

      <!-- Grid View -->
      <div v-if="viewMode === 'grid'" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div
          v-for="(memory, index) in memories"
          :key="index"
          class="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-105"
        >
          <div class="relative">
            <img
              :src="memory.image"
              :alt="memory.caption"
              class="w-full h-64 object-cover"
            />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p class="text-white font-medium">{{ memory.caption }}</p>
              <p class="text-rose-200 text-sm">{{ formatDate(memory.date) }}</p>
            </div>
          </div>
          <div class="p-4">
            <button
              @click="openMemoryModal(index)"
              class="text-rose-500 hover:text-rose-700 text-sm font-medium"
            >
              View Details
            </button>
          </div>
        </div>
      </div>

      <!-- Timeline View -->
      <div v-if="viewMode === 'timeline'" class="relative pl-8">
        <div class="absolute left-0 top-0 bottom-0 w-1 bg-rose-200 rounded-full"></div>
        
        <div
          v-for="(memory, index) in sortedMemories"
          :key="index"
          class="relative mb-8 pl-8"
        >
          <div class="absolute left-0 top-4 w-4 h-4 rounded-full bg-rose-500 border-4 border-rose-100 -ml-2"></div>
          <div class="bg-white rounded-xl shadow-md overflow-hidden">
            <div class="flex flex-col md:flex-row">
              <div class="md:w-1/3">
                <img
                  :src="memory.image"
                  :alt="memory.caption"
                  class="w-full h-48 object-cover"
                />
              </div>
              <div class="p-4 md:w-2/3">
                <h3 class="text-lg font-medium text-rose-800">{{ memory.caption }}</h3>
                <p class="text-rose-500 mb-2">{{ formatDate(memory.date) }}</p>
                <p class="text-gray-700">{{ memory.description }}</p>
                <button
                  @click="openMemoryModal(index)"
                  class="mt-3 text-rose-500 hover:text-rose-700 text-sm font-medium"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Memory Modal -->
      <transition name="fade">
        <div
          v-if="showAddMemoryModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white rounded-xl shadow-xl w-full max-w-md">
            <div class="p-6">
              <h2 class="text-2xl font-medium text-rose-800 mb-4">Add New Memory</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-gray-700 mb-1">Upload Photo</label>
                  <input
                    type="file"
                    @change="handleImageUpload"
                    accept="image/*"
                    class="w-full px-3 py-2 border rounded-lg"
                  />
                  <div v-if="newMemory.imagePreview" class="mt-2">
                    <img :src="newMemory.imagePreview" class="h-32 object-contain border rounded" />
                  </div>
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-1">Caption</label>
                  <input
                    v-model="newMemory.caption"
                    type="text"
                    placeholder="What's this memory about?"
                    class="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-1">Date</label>
                  <input
                    v-model="newMemory.date"
                    type="date"
                    class="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                
                <div>
                  <label class="block text-gray-700 mb-1">Description</label>
                  <textarea
                    v-model="newMemory.description"
                    placeholder="Tell me more about this special moment..."
                    rows="3"
                    class="w-full px-3 py-2 border rounded-lg"
                  ></textarea>
                </div>
              </div>
              
              <div class="flex justify-end gap-3 mt-6">
                <button
                  @click="showAddMemoryModal = false"
                  class="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  @click="addMemory"
                  class="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
                >
                  Save Memory
                </button>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Memory Detail Modal -->
      <transition name="fade">
        <div
          v-if="selectedMemoryIndex !== null"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        >
          <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl">
            <div class="p-6">
              <button
                @click="selectedMemoryIndex = null"
                class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <i class="fas fa-times"></i>
              </button>
              
              <div class="flex flex-col md:flex-row gap-6">
                <div class="md:w-1/2">
                  <img
                    :src="memories[selectedMemoryIndex].image"
                    :alt="memories[selectedMemoryIndex].caption"
                    class="w-full h-64 md:h-full object-cover rounded-lg"
                  />
                </div>
                
                <div class="md:w-1/2">
                  <h2 class="text-2xl font-medium text-rose-800 mb-2">
                    {{ memories[selectedMemoryIndex].caption }}
                  </h2>
                  <p class="text-rose-500 mb-4">
                    {{ formatDate(memories[selectedMemoryIndex].date) }}
                  </p>
                  <p class="text-gray-700 whitespace-pre-line mb-6">
                    {{ memories[selectedMemoryIndex].description }}
                  </p>
                  
                  <div class="flex gap-3">
                    <button
                      @click="deleteMemory(selectedMemoryIndex)"
                      class="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg"
                    >
                      Delete
                    </button>
                    <button
                      @click="editMemory(selectedMemoryIndex)"
                      class="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-lg"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

interface Memory {
  image: string;
  imageFile?: File;
  caption: string;
  date: string;
  description: string;
}

// State
const viewMode = ref<'grid' | 'timeline'>('grid');
const showAddMemoryModal = ref(false);
const selectedMemoryIndex = ref<number | null>(null);
const memories = ref<Memory[]>([
  {
    image: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'Our First Date',
    date: '2022-05-15',
    description: 'That little café downtown where we talked for hours without realizing how much time had passed.'
  },
  {
    image: 'https://images.unsplash.com/photo-1494774157365-9e04c6720e47?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    caption: 'Beach Sunset',
    date: '2022-08-20',
    description: 'Walking hand in hand as the sun dipped below the horizon, promising each other forever.'
  }
]);

const newMemory = ref<Omit<Memory, 'image'> & { imagePreview: string | null }>({
  imagePreview: null,
  caption: '',
  date: new Date().toISOString().split('T')[0],
  description: ''
});

// Computed
const sortedMemories = computed(() => {
  return [...memories.value].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

// Methods
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newMemory.value.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(input.files[0]);
  }
};

const addMemory = () => {
  if (!newMemory.value.imagePreview || !newMemory.value.caption) return;
  
  memories.value.push({
    image: newMemory.value.imagePreview,
    caption: newMemory.value.caption,
    date: newMemory.value.date,
    description: newMemory.value.description
  });
  
  resetNewMemory();
  showAddMemoryModal.value = false;
};

const resetNewMemory = () => {
  newMemory.value = {
    imagePreview: null,
    caption: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  };
};

const openMemoryModal = (index: number) => {
  selectedMemoryIndex.value = index;
};

const deleteMemory = (index: number) => {
  memories.value.splice(index, 1);
  selectedMemoryIndex.value = null;
};

const editMemory = (index: number) => {
  const memory = memories.value[index];
  newMemory.value = {
    imagePreview: memory.image,
    caption: memory.caption,
    date: memory.date,
    description: memory.description
  };
  selectedMemoryIndex.value = null;
  showAddMemoryModal.value = true;
  
  // Remove the old memory if saved
  memories.value.splice(index, 1);
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>