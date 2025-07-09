<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-serif text-indigo-800 mb-2">Our Future Adventures</h1>
        <p class="text-lg text-indigo-600">Dreaming together makes the journey sweeter</p>
      </div>

      <!-- Tabs Navigation -->
      <div class="flex border-b border-indigo-200 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 font-medium transition"
          :class="activeTab === tab.id ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-indigo-400 hover:text-indigo-600'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Bucket List Tab -->
      <div v-if="activeTab === 'bucket-list'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-medium text-black mb-4">Our Bucket List</h2>
          
          <div class="flex mb-4">
            <input
              v-model="newBucketItem"
              @keyup.enter="addBucketItem"
              type="text"
              placeholder="Add something we should do together..."
              class="flex-1 px-4 py-2 border border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            />
            <button
              @click="addBucketItem"
              class="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600 transition"
            >
              Add
            </button>
          </div>
          
          <div class="space-y-3">
            <div
              v-for="(item, index) in bucketList"
              :key="index"
              class="flex items-center p-3 bg-indigo-50 rounded-lg"
            >
              <input
                type="checkbox"
                v-model="item.completed"
                @change="saveBucketList"
                class="h-5 w-5 text-indigo-600 rounded mr-3"
              />
              <span
                class="flex-1"
                :class="{ 'line-through text-gray-500': item.completed }"
              >{{ item.text }}</span>
              <button
                @click="removeBucketItem(index)"
                class="text-red-400 hover:text-red-600"
              >
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Date Planner Tab -->
      <div v-if="activeTab === 'date-planner'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-medium text-indigo-700 mb-4">Plan Our Next Date</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-black mb-2">Date Idea</label>
              <input
                v-model="newDateIdea"
                type="text"
                placeholder="Dinner at that new Italian place"
                class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
            
            <div>
              <label class="block text-black mb-2">When</label>
              <input
                v-model="newDateWhen"
                type="date"
                class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
            </div>
          </div>
          
          <div class="mt-4">
            <label class="block text-black mb-2">Notes</label>
            <textarea
              v-model="newDateNotes"
              placeholder="Any special details to remember..."
              rows="3"
              class="w-full px-4 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
            ></textarea>
          </div>
          
          <button
            @click="addDatePlan"
            class="mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Save Date Plan
          </button>
          
          <div class="mt-6 space-y-4">
            <h3 class="text-xl font-medium text-indigo-700">Upcoming Dates</h3>
            <div
              v-for="(date, index) in datePlans"
              :key="index"
              class="p-4 border border-indigo-100 rounded-lg hover:bg-indigo-50 transition"
            >
              <div class="flex justify-between items-start">
                <div>
                  <h4 class="font-medium text-indigo-800">{{ date.idea }}</h4>
                  <p class="text-indigo-600">{{ formatDate(date.when) }}</p>
                  <p v-if="date.notes" class="text-gray-700 mt-1">{{ date.notes }}</p>
                </div>
                <button
                  @click="removeDatePlan(index)"
                  class="text-red-400 hover:text-red-600"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Dream Board Tab -->
      <div v-if="activeTab === 'dream-board'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-medium text-indigo-700 mb-4">Our Dream Board</h2>
          
          <div class="grid md:grid-cols-2 gap-4 mb-6">
            <div class="p-4 bg-indigo-50 rounded-lg">
              <h3 class="font-medium text-indigo-800 mb-2">Future Home</h3>
              <textarea
                v-model="dreamBoard.home"
                placeholder="Describe our dream home..."
                rows="3"
                class="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
              ></textarea>
            </div>
            
            <div class="p-4 bg-indigo-50 rounded-lg">
              <h3 class="font-medium text-indigo-800 mb-2">Travel Dreams</h3>
              <textarea
                v-model="dreamBoard.travel"
                placeholder="Places we want to visit together..."
                rows="3"
                class="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
              ></textarea>
            </div>
            
            <div class="p-4 bg-indigo-50 rounded-lg">
              <h3 class="font-medium text-indigo-800 mb-2">Life Goals</h3>
              <textarea
                v-model="dreamBoard.lifeGoals"
                placeholder="What we want to achieve together..."
                rows="3"
                class="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
              ></textarea>
            </div>
            
            <div class="p-4 bg-indigo-50 rounded-lg">
              <h3 class="font-medium text-indigo-800 mb-2">Special Memories to Make</h3>
              <textarea
                v-model="dreamBoard.memories"
                placeholder="Special moments we want to experience..."
                rows="3"
                class="w-full px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white text-black"
              ></textarea>
            </div>
          </div>
          
          <button
            @click="saveDreamBoard"
            class="px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            Save Our Dreams
          </button>
        </div>
      </div>

      <!-- Spin the Wheel Tab -->
      <div v-if="activeTab === 'spin-wheel'" class="space-y-6">
        <div class="bg-white rounded-xl shadow-md p-6">
          <h2 class="text-2xl font-medium text-indigo-700 mb-4">Date Idea Generator</h2>
          
          <div class="flex flex-col items-center">
            <div class="relative w-64 h-64 mb-8">
              <div
                ref="wheel"
                class="wheel w-full h-full rounded-full border border-black relative overflow-hidden transition-transform duration-5000 ease-out"
                :style="{ transform: `rotate(${wheelRotation}deg)` }"
              >
                <div
                  v-for="(option, index) in dateOptions"
                  :key="index"
                  class="wheel-option absolute w-full h-full"
                  :style="getWheelOptionStyle(index)"
                >
                  <span class="wheel-text text-black">{{ option }}</span>
                </div>
              </div>
              
              <div class="wheel-center absolute top-1/2 left-1/2 w-8 h-8 bg-indigo-600 rounded-full -ml-4 -mt-4 z-10"></div>
              <div class="wheel-pointer absolute top-0 left-1/2 w-6 h-6 bg-indigo-600 transform -translate-x-1/2 -translate-y-1/2 rotate-45 z-10"></div>
            </div>
            
            <button
              @click="spinWheel"
              class="px-8 py-3 bg-indigo-500 text-white rounded-full shadow-lg hover:bg-indigo-600 transition transform hover:scale-105"
              :disabled="isSpinning"
            >
              {{ isSpinning ? 'Spinning...' : 'Spin the Wheel!' }}
            </button>
            
            <div v-if="selectedOption" class="mt-6 text-center">
              <h3 class="text-xl font-medium text-indigo-800 mb-2">Your Date Idea:</h3>
              <p class="text-2xl text-indigo-600 font-medium">{{ selectedOption }}</p>
              <button
                @click="addToPlans"
                class="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Add to Date Plans
              </button>
            </div>
          </div>
          
          <div class="mt-8">
            <h3 class="text-xl font-medium text-indigo-700 mb-3">Customize Date Ideas</h3>
            <div class="flex mb-4">
              <input
                v-model="newDateOption"
                @keyup.enter="addDateOption"
                type="text"
                placeholder="Add a new date idea..."
                class="flex-1 px-4 py-2 border border-black rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
              />
              <button
                @click="addDateOption"
                class="px-4 py-2 bg-indigo-500 text-white rounded-r-lg hover:bg-indigo-600 transition"
              >
                Add
              </button>
            </div>
            
            <div class="space-y-2">
              <div
                v-for="(option, index) in dateOptions"
                :key="index"
                class="flex items-center p-2 bg-indigo-50 rounded text-black"
              >
                <span class="flex-1">{{ option }}</span>
                <button
                  @click="removeDateOption(index)"
                  class="text-red-400 hover:text-red-600 ml-2"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Types
interface BucketItem {
  text: string;
  completed: boolean;
}

interface DatePlan {
  idea: string;
  when: string;
  notes: string;
}

interface DreamBoard {
  home: string;
  travel: string;
  lifeGoals: string;
  memories: string;
}

// Tabs
const tabs = [
  { id: 'bucket-list', label: 'Bucket List' },
  { id: 'date-planner', label: 'Date Planner' },
  { id: 'dream-board', label: 'Dream Board' },
  { id: 'spin-wheel', label: 'Spin the Wheel' }
];
const activeTab = ref('bucket-list');

// Bucket List
const newBucketItem = ref('');
const bucketList = ref<BucketItem[]>([]);

// Date Planner
const newDateIdea = ref('');
const newDateWhen = ref(new Date().toISOString().split('T')[0]);
const newDateNotes = ref('');
const datePlans = ref<DatePlan[]>([]);

// Dream Board
const dreamBoard = ref<DreamBoard>({
  home: '',
  travel: '',
  lifeGoals: '',
  memories: ''
});

// Spin the Wheel
const wheel = ref<HTMLElement | null>(null);
const wheelRotation = ref(0);
const isSpinning = ref(false);
const selectedOption = ref('');
const newDateOption = ref('');
const dateOptions = ref([
  'Romantic Dinner at Home',
  'Picnic in the Park',
  'Museum Date',
  'Beach Sunset',
  'Movie Marathon',
  'Try a New Restaurant',
  'Road Trip Adventure',
  'Stargazing Night'
]);

// Initialize data from localStorage
onMounted(() => {
  loadBucketList();
  loadDatePlans();
  loadDreamBoard();
  loadDateOptions();
});

// Format date
const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Bucket List Methods
const addBucketItem = () => {
  if (newBucketItem.value.trim()) {
    bucketList.value.push({
      text: newBucketItem.value.trim(),
      completed: false
    });
    newBucketItem.value = '';
    saveBucketList();
  }
};

const removeBucketItem = (index: number) => {
  bucketList.value.splice(index, 1);
  saveBucketList();
};

const saveBucketList = () => {
  localStorage.setItem('couple-bucket-list', JSON.stringify(bucketList.value));
};

const loadBucketList = () => {
  const saved = localStorage.getItem('couple-bucket-list');
  if (saved) {
    bucketList.value = JSON.parse(saved);
  }
};

// Date Planner Methods
const addDatePlan = () => {
  if (newDateIdea.value.trim()) {
    datePlans.value.push({
      idea: newDateIdea.value.trim(),
      when: newDateWhen.value,
      notes: newDateNotes.value
    });
    newDateIdea.value = '';
    newDateNotes.value = '';
    saveDatePlans();
  }
};

const removeDatePlan = (index: number) => {
  datePlans.value.splice(index, 1);
  saveDatePlans();
};

const saveDatePlans = () => {
  localStorage.setItem('couple-date-plans', JSON.stringify(datePlans.value));
};

const loadDatePlans = () => {
  const saved = localStorage.getItem('couple-date-plans');
  if (saved) {
    datePlans.value = JSON.parse(saved);
  }
};

// Dream Board Methods
const saveDreamBoard = () => {
  localStorage.setItem('couple-dream-board', JSON.stringify(dreamBoard.value));
};

const loadDreamBoard = () => {
  const saved = localStorage.getItem('couple-dream-board');
  if (saved) {
    dreamBoard.value = JSON.parse(saved);
  }
};

// Spin the Wheel Methods
const getWheelOptionStyle = (index: number) => {
  const segmentAngle = 360 / dateOptions.value.length;
  const angle = segmentAngle * index;
  return {
    transform: `rotate(${angle}deg)`,
    clipPath: 'polygon(50% 50%, 50% 0, 100% 0)'
  };
};

const spinWheel = () => {
  if (isSpinning.value || dateOptions.value.length === 0) return;
  
  isSpinning.value = true;
  selectedOption.value = '';
  
  // Random rotation (5-10 full rotations plus segment offset)
  const segmentAngle = 360 / dateOptions.value.length;
  const extraRotations = 5 + Math.floor(Math.random() * 5);
  const randomSegment = Math.floor(Math.random() * dateOptions.value.length);
  const targetRotation = 360 * extraRotations + (360 - segmentAngle * randomSegment);
  
  wheelRotation.value = targetRotation;
  
  setTimeout(() => {
    isSpinning.value = false;
    selectedOption.value = dateOptions.value[randomSegment];
  }, 5000);
};

const addDateOption = () => {
  if (newDateOption.value.trim() && !dateOptions.value.includes(newDateOption.value.trim())) {
    dateOptions.value.push(newDateOption.value.trim());
    newDateOption.value = '';
    saveDateOptions();
  }
};

const removeDateOption = (index: number) => {
  dateOptions.value.splice(index, 1);
  saveDateOptions();
};

const addToPlans = () => {
  if (selectedOption.value) {
    newDateIdea.value = selectedOption.value;
    activeTab.value = 'date-planner';
    selectedOption.value = '';
  }
};

const saveDateOptions = () => {
  localStorage.setItem('couple-date-options', JSON.stringify(dateOptions.value));
};

const loadDateOptions = () => {
  const saved = localStorage.getItem('couple-date-options');
  if (saved) {
    dateOptions.value = JSON.parse(saved);
  }
};
</script>

<style scoped>
.wheel {
  transform-origin: center;
}

.wheel-option {
  transform-origin: bottom right;
}

.wheel-text {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%) rotate(90deg);
  transform-origin: left center;
  white-space: nowrap;
  font-weight: 500;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.wheel-option:nth-child(odd) {
  background-color: #6366f1;
}

.wheel-option:nth-child(even) {
  background-color: #818cf8;
}

.wheel-pointer {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
</style>