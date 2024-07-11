<template>
  <section class="previous-rulings">
    <div class="previous-rulings__title">
      <h2 class="previous-rulings__title-text">Previous Rulings</h2>
      <div class="previous-rulings__view-picker">
        <select v-model="selectedView" class="select">
          <option value="grid">Grid</option>
          <option value="list">List</option>
        </select>
      </div>
    </div>
    <div class="previous-rulings__card-container">
      <LoadingSpinner v-if="loading" />
      <div v-else :class="containerClass">
        <PreviousCard
          v-for="profile in profiles"
          :key="profile.id"
          :profile="profile"
          @vote-cast="handleVoteCast"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import PreviousCard from "./PreviousCard.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import { ref, onMounted, onUnmounted, computed } from "vue";
import { db } from "../../firebase";
import { updateDoc, doc } from "firebase/firestore";

import { fetchProfiles } from "../utils/fetchProfiles";
import { manageResizeEvent } from "../utils/mobileView";

const profiles = ref([]);
const loading = ref(true);
fetchProfiles(profiles, loading);

// Function to switch between grid and list view in tablet and desktop
const selectedView = ref("grid");
const containerClass = computed(() => {
  return selectedView.value === "grid"
    ? "card-container__grid"
    : "card-container__list";
});

// Function for mobile view
manageResizeEvent(selectedView, onMounted, onUnmounted);

// Function to update the votes in the database
const handleVoteCast = async ({ id, voteType }) => {
  const profileDocRef = doc(db, "profiles", id);
  const updatedProfile = profiles.value.find((profile) => profile.id === id);
  if (voteType === "positive") {
    updatedProfile.votes.positive++;
  } else {
    updatedProfile.votes.negative++;
  }
  await updateDoc(profileDocRef, {
    votes: {
      positive: updatedProfile.votes.positive,
      negative: updatedProfile.votes.negative,
    },
  });
};
</script>

<style scoped>
.previous-rulings {
  margin: 1rem;
}

.previous-rulings__title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.previous-rulings__title-text {
  padding: 0.5rem 0;
  font-weight: 300;
  font-size: 2rem;
}

.previous-rulings__view-picker {
  display: none;
}

.previous-rulings__card-container {
  height: 100%;
  overflow: hidden;
  position: relative;
}

.card-container__grid {
  display: grid;
  grid-template-columns: repeat(1, auto);
  gap: 0.75rem;
  grid-auto-flow: column;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
}

.card-container__grid::-webkit-scrollbar {
  display: none;
}

@media screen and (min-width: 768px) {
  .previous-rulings__title-text {
    padding: 0.5rem 0;
    font-weight: 300;
    font-size: 2rem;
  }

  .previous-rulings__view-picker {
    display: block;
    padding: 0.5rem 0;
  }

  .select {
    padding: 0.5rem;
    font-size: 0.8rem;
    min-width: 10rem;
    text-align: center;
    border: 2px solid var(--color-darker-gray);
  }

  .card-container__grid {
    grid-template-columns: repeat(2, auto);
    gap: 0.75rem;
    grid-auto-flow: row;
    overflow-x: hidden;
    overflow-y: auto;
    scroll-snap-type: none;
  }

  /* List Styles */
  .card-container__list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
}

@media screen and (min-width: 1100px) {
  .previous-rulings__title-text {
    font-size: 2.5rem;
  }

  .previous-rulings {
    margin: 0;
  }
  .card-container__grid {
    grid-template-columns: repeat(3, auto);
    gap: 1.5rem;
  }
}
</style>
