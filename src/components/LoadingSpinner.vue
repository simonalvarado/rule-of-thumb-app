<template>
  <div class="loading-spinner" aria-label="Loading spinner">
    <span></span>
  </div>
</template>

<script setup></script>

<style scoped>
.loading-spinner {
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes circle-loading {
  to {
    transform: rotateZ(360deg);
  }
}

.loading-spinner span {
  display: block;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: 2px solid transparent;
  border-top-color: var(--color-darker-gray);
  animation: circle-loading 1200ms ease infinite;
}
</style>
