<template>
  <div class="previous-card">
    <img
      :src="profile.picture"
      :alt="profile.name"
      class="previous-card__picture"
    />
    <div class="previous-card__content">
      <div class="previous-card__content-wrapper">
        <div class="previous-card__top">
          <div class="previous-card__acceptance">
            <div
              v-if="profile.votes.positive >= profile.votes.negative"
              class="icon-button"
              aria-label="thumbs up"
            >
              <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
            </div>
            <div v-else class="icon-button" aria-label="thumbs down">
              <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
            </div>
          </div>
          <div class="previous-card__title">
            <h2 class="previous-card__name">
              {{ profile.name }}
            </h2>
            <p class="previous-card__desc">
              {{ profile.description }}
            </p>
          </div>
        </div>
        <div class="previous-card__vote-section">
          <p class="previous-card__last-updated">
            {{
              state.votingState === "initial"
                ? lastUpdatedText
                : "Thank you for voting!"
            }}
          </p>
          <div class="previous-card__buttons">
            <div class="previous-card__thumbs">
              <button
                class="icon-button"
                aria-label="thumbs up"
                @click="selectVote('thumbsUp')"
                :class="{ selected: state.selectedVote === 'thumbsUp' }"
                :disabled="thumbButtonsDisabled"
              >
                <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
              </button>
              <button
                class="icon-button"
                aria-label="thumbs down"
                @click="selectVote('thumbsDown')"
                :class="{ selected: state.selectedVote === 'thumbsDown' }"
                :disabled="thumbButtonsDisabled"
              >
                <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
              </button>
            </div>
            <div class="previous-card__vote-button">
              <button
                class="vote-button__cta"
                :disabled="!state.isVoteButtonEnabled"
                @click="vote"
              >
                {{
                  state.votingState === "initial" ? "Vote Now" : "Vote Again"
                }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="previous-card__gauge-bar">
        <div
          class="previous-card__gauge-positive"
          :style="{ width: voteStatistics.positivePercentage + '%' }"
        >
          <div class="previous-card__gauge-label">
            <img src="../assets/img/thumbs-up.svg" alt="thumbs up" />
            <span class="previous-card__gauge-text"
              >{{ voteStatistics.positivePercentage }}%</span
            >
          </div>
        </div>
        <div
          class="previous-card__gauge-negative"
          :style="{ width: voteStatistics.negativePercentage + '%' }"
        >
          <div class="previous-card__gauge-label">
            <span class="previous-card__gauge-text"
              >{{ voteStatistics.negativePercentage }}%</span
            >
            <img src="../assets/img/thumbs-down.svg" alt="thumbs down" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, computed, onUnmounted } from "vue";
import { defineProps, defineEmits } from "vue";
import { db } from "../../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import { shortenText } from "../utils/shortenText";
import { formatLastUpdated } from "../utils/formatDate";
import { calculateVotePercentages } from "../utils/calculateVotePercentages";

const props = defineProps(["profile"]);
const emit = defineEmits(["vote-cast"]);
const profile = reactive(props.profile);

// Logic for shortening the description and the title
profile.description = shortenText(profile.description, 60);
profile.name = shortenText(profile.name, 21);

// Logic for the last updated text
const lastUpdatedText = computed(() =>
  formatLastUpdated(profile.lastUpdated.seconds, profile.category)
);

// Logic for the vote buttons
const state = reactive({
  selectedVote: null,
  isVoteButtonEnabled: false,
  votingState: "initial",
});
const selectVote = (voteType) => {
  state.selectedVote = state.selectedVote === voteType ? null : voteType;
  state.isVoteButtonEnabled = state.selectedVote !== null;
};
const thumbButtonsDisabled = computed(() => state.votingState === "voted");
const vote = () => {
  if (state.votingState !== "initial" || !state.selectedVote) {
    resetVoting();
    return;
  }
  const voteType = state.selectedVote === "thumbsUp" ? "positive" : "negative";
  emit("vote-cast", { id: profile.id, voteType });
  updateVotingStateAfterVote();
};
const resetVoting = () => {
  Object.assign(state, {
    selectedVote: null,
    isVoteButtonEnabled: false,
    votingState: "initial",
  });
};
const updateVotingStateAfterVote = () => {
  Object.assign(state, {
    selectedVote: null,
    votingState: "voted",
  });
};

// Computed properties for the gauge bar
const voteStatistics = computed(() =>
  calculateVotePercentages(profile.votes.positive, profile.votes.negative)
);

// Real-time listener for profile votes
const profileDocRef = doc(db, "profiles", profile.id);
const unsubscribe = onSnapshot(profileDocRef, (doc) => {
  const data = doc.data();
  profile.votes.positive = data.votes.positive;
  profile.votes.negative = data.votes.negative;
});
onUnmounted(() => {
  unsubscribe();
});
</script>

<style scoped>
.previous-card {
  position: relative;
  overflow: hidden;
  width: 25rem;
  height: 25rem;
}

.previous-card__picture {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.previous-card__content {
  position: absolute;
  bottom: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    var(--color-black-transparent) 0%,
    var(--color-darker-background) 100%
  );
  color: var(--color-white);
}

.previous-card__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.previous-card__acceptance {
  padding-bottom: 4rem;
}

.previous-card__acceptance .icon-button[aria-label="thumbs up"] {
  background-color: rgba(var(--color-green-positive), 1);
}

.previous-card__acceptance .icon-button[aria-label="thumbs down"] {
  background-color: rgba(var(--color-yellow-negative), 1);
}

.icon-button {
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
}

.icon-button > img {
  max-width: 50%;
}

.icon-button.selected {
  box-shadow: 0 0 0 2px var(--color-white) inset;
}

.icon-button:disabled {
  display: none;
}

.previous-card__title {
  padding: 0rem 3rem 0rem 0.5rem;
}

.previous-card__name {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 400;
}

.previous-card__desc {
  line-height: 1.4rem;
  margin: 0.5rem 0 0.5rem;
  font-size: 1.2rem;
  font-weight: 400;
}

.previous-card__vote-section {
  padding: 1rem 3rem;
}

.previous-card__last-updated {
  text-align: right;
  margin-top: 0;
}

.previous-card__buttons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.previous-card__thumbs {
  display: flex;
  align-items: center;
  width: 8rem;
  justify-content: space-evenly;
}

.previous-card__thumbs > .icon-button {
  cursor: pointer;
}

.previous-card__vote-button {
  width: 9rem;
}

.vote-button__cta {
  position: relative;
  display: block;
  width: 100%;
  padding: 0.8rem 0;
  border: 1px solid var(--color-white);
  background-color: var(--color-smoky-dark-overlay);
  color: var(--color-white);
  font-size: 1.2rem;
  font-weight: 400;
  cursor: pointer;
}

.vote-button__cta:disabled {
  background-color: var(--color-darker-background);
  cursor: not-allowed;
}

.previous-card__gauge-bar {
  display: flex;
  justify-content: space-between;
}

.previous-card__gauge-positive {
  background-color: rgba(var(--color-green-positive), 0.6);
  padding: 0.5rem 1rem;
}

.previous-card__gauge-positive .previous-card__gauge-label {
  display: flex;
  justify-content: flex-start;
}

.previous-card__gauge-negative {
  background-color: rgba(var(--color-yellow-negative), 0.6);
  padding: 0.5rem 1rem;
  text-align: right;
}

.previous-card__gauge-negative .previous-card__gauge-label {
  display: flex;
  justify-content: flex-end;
}

.previous-card__gauge-text {
  color: var(--color-white);
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0 0.5rem;
}

@media all and (min-width: 768px) {
  .previous-card {
    width: 100%;
    height: 48vw;
  }

  /* List view styles */
  .card-container__list .previous-card {
    height: 10.3rem;
  }

  .card-container__list .previous-card__picture {
    width: 15rem;
    height: 100%;
    position: relative;
    -o-object-fit: cover;
    object-fit: cover;
    left: -21px;
  }

  .card-container__list .previous-card__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: linear-gradient(
      90deg,
      var(--color-black-transparent) 8%,
      var(--color-medium-gray) 17.8%,
      var(--color-deep-gray) 50%,
      var(--color-darker-gray-transparent) 71.88%
    );
  }

  .card-container__list .previous-card__content-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .card-container__list .previous-card__top {
    align-items: flex-start;
  }

  .card-container__list .icon-button {
    width: 2.2rem;
    height: 2.2rem;
  }

  .card-container__list .previous-card__title {
    padding: 0rem 0rem 0rem 8.7rem;
  }

  .card-container__list .previous-card__name {
    font-size: 2.1rem;
  }

  .card-container__list .previous-card__desc {
    line-height: 1.3rem;
    margin: 1.2rem 0 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }

  .card-container__list .previous-card__vote-section {
    padding: 0.5rem 1rem;
  }

  .card-container__list .previous-card__last-updated {
    font-size: 0.9rem;
  }

  .card-container__list .previous-card__thumbs {
    width: 7rem;
  }

  .card-container__list .previous-card__vote-button {
    width: 8rem;
  }

  .card-container__list .vote-button__cta {
    padding: 0.6rem 0;
  }

  .previous-card__gauge-text[data-v-12cd3f57] {
    font-size: 1.3rem;
  }
}

@media all and (min-width: 1100px) {
  .previous-card {
    width: 19.4rem;
    height: 19.4rem;
  }

  .previous-card__content {
    max-width: 100%;
  }

  .previous-card__acceptance {
    padding-bottom: 3.2rem;
  }

  .icon-button {
    width: 1.7rem;
    height: 1.7rem;
  }

  .previous-card__name {
    font-size: 2rem;
  }

  .previous-card__desc {
    line-height: 1rem;
    font-size: 0.8rem;
  }

  .previous-card__vote-section {
    padding: 0rem 2rem 0.8rem;
  }

  .previous-card__last-updated {
    font-size: 0.8rem;
  }

  .previous-card__thumbs {
    width: 5rem;
  }

  .previous-card__vote-button {
    width: 6rem;
  }

  .vote-button__cta {
    padding: 0.5rem 0;
    font-size: 0.8rem;
  }

  .previous-card__gauge-positive,
  .previous-card__gauge-negative {
    padding: 0.5rem 0.5rem;
  }

  .previous-card__gauge-text {
    font-size: 1rem;
  }

  /* List view styles */
  .card-container__list .previous-card {
    height: 9.4rem;
    width: 100%;
  }

  .card-container__list .previous-card__picture {
    left: 0px;
  }

  .card-container__list .previous-card__title {
    padding: 0.5rem 0rem 0rem 12rem;
  }

  .card-container__list .icon-button {
    width: 2.5rem;
    height: 2.5rem;
  }

  .card-container__list .previous-card__thumbs {
    width: 6rem;
  }

  .card-container__list .previous-card__vote-button {
    width: 7.5rem;
  }

  .card-container__list .vote-button__cta {
    padding: 0.6rem 0;
    font-size: 1rem;
  }
}
</style>
